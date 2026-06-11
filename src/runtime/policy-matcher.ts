/**
 * Policy Engine Matcher (Runtime)
 * 
 * Core execution module for the Dual-Use Governance Policy Framework v1.0
 * 
 * Responsibilities:
 * - Parse incoming request context
 * - Match against policy rules (regex patterns + semantic similarity)
 * - Compute risk scores with environment-aware modifiers
 * - Apply override exceptions with expiry validation
 * - Generate auditable decision_reason objects
 * - Trigger alerts based on decision severity
 * 
 * Usage:
 *   const matcher = new PolicyMatcher(policyYaml);
 *   const result = matcher.evaluate(requestInput);
 */

import * as yaml from 'js-yaml';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface RequestInput {
  request_id: string;
  user_id: string;
  request_timestamp: string;
  environment: 'dev' | 'staging' | 'prod';
  user_message: string;
  context: {
    domain: string;
    domain_source: string;
    intent: {
      primary: string;
      pattern: string;
      semantic_similarity: number;
      semantic_similarity_threshold: number;
      confidence: number;
    };
    source_metadata: Record<string, any>;
  };
}

interface RiskModifier {
  condition: string;
  adjustment: number;
}

interface Rule {
  rule_id: string;
  category: string;
  severity: string;
  description: string;
  conditions: Array<any>;
  risk_scoring: {
    base_score: number;
    modifiers: RiskModifier[];
  };
  decision: {
    default_action: 'DENY' | 'FLAG' | 'ALLOW';
    response: { message: string; decision_code: string };
    escalation_policy?: any;
  };
  audit: {
    log_sensitive_content: boolean;
    alert_channels: string[];
  };
}

interface DecisionReason {
  rule_id: string;
  matched_intent: string;
  matched_domain: string;
  semantic_similarity_score: number;
  risk_score_computation: {
    base_score: number;
    modifiers_applied: Array<{
      condition: string;
      adjustment: number;
      applied: boolean;
      reason?: string;
    }>;
    final_score: number;
  };
  triggered_at: string;
  environment_override?: {
    environment: string;
    enforcement_level: string;
    original_decision: string;
    downgraded_to: string;
    mandatory_logging_enabled: boolean;
  };
}

interface EvaluationResult {
  decision: 'ALLOW' | 'DENY' | 'FLAG';
  risk_score: number;
  decision_reason: DecisionReason | null;
  context_snapshot: Record<string, any>;
  override_applied: Record<string, any> | null;
  response: { message: string; decision_code: string };
  audit_metadata: {
    evaluated_at: string;
    evaluated_by: string;
    policy_version: string;
    evaluation_latency_ms: number;
    logging_config?: Record<string, any>;
  };
  alerts_triggered?: Array<{
    channel: string;
    priority: string;
    message: string;
  }>;
}

// ============================================================================
// POLICY MATCHER ENGINE
// ============================================================================

export class PolicyMatcher {
  private policy: any;
  private rules: Rule[];
  private exceptions: Map<string, any>;
  private environmentConfig: Record<string, any>;

  constructor(policyYamlContent: string) {
    this.policy = yaml.load(policyYamlContent) as any;
    this.rules = this.policy.rules || [];
    this.exceptions = this.parseExceptions();
    this.environmentConfig = this.policy.environment_config || {};
  }

  /**
   * Main evaluation entry point
   */
  evaluate(input: RequestInput): EvaluationResult {
    const startTime = Date.now();

    try {
      // Step 1: Check for applicable exceptions
      const applicableException = this.findApplicableException(input);
      if (applicableException) {
        return this.applyException(input, applicableException, startTime);
      }

      // Step 2: Match rules sequentially
      for (const rule of this.rules) {
        const ruleMatch = this.matchRule(rule, input);
        if (ruleMatch.matched) {
          // Step 3: Compute risk score
          const riskScore = this.computeRiskScore(rule, input, ruleMatch);

          // Step 4: Determine decision based on risk threshold
          let decision = rule.decision.default_action;
          let environmentOverride = null;

          if (this.policy.enforcement.risk_thresholds[decision.toLowerCase()]) {
            const threshold = this.getThresholdForScore(riskScore);
            decision = threshold.action as any;

            // Apply environment-specific overrides
            environmentOverride = this.applyEnvironmentOverride(
              decision,
              input.environment,
              rule
            );
            if (environmentOverride) {
              decision = environmentOverride.downgraded_to;
            }
          }

          // Step 5: Generate decision reason
          const decisionReason = this.buildDecisionReason(
            rule,
            input,
            riskScore,
            ruleMatch,
            environmentOverride
          );

          // Step 6: Build response
          const response = {
            message: rule.decision.response.message,
            decision_code: rule.decision.response.decision_code,
          };

          // Step 7: Generate alerts
          const alerts = this.generateAlerts(decision, rule, input, riskScore);

          // Step 8: Build audit metadata
          const auditMetadata = {
            evaluated_at: new Date().toISOString(),
            evaluated_by: 'policy_engine_v1',
            policy_version: this.policy.version,
            evaluation_latency_ms: Date.now() - startTime,
            logging_config:
              this.environmentConfig[input.environment]?.logging || {},
          };

          return {
            decision,
            risk_score: riskScore,
            decision_reason: decisionReason,
            context_snapshot: this.buildContextSnapshot(input),
            override_applied: null,
            response,
            audit_metadata: auditMetadata,
            alerts_triggered: alerts,
          };
        }
      }

      // No rule matched; default allow
      return this.buildAllowDecision(input, startTime);
    } catch (error) {
      console.error('Policy evaluation error:', error);
      throw new Error(`Policy matcher evaluation failed: ${error}`);
    }
  }

  /**
   * Match a rule against the input context
   */
  private matchRule(
    rule: Rule,
    input: RequestInput
  ): { matched: boolean; details?: any } {
    const conditions = rule.conditions || [];

    for (const condition of conditions) {
      if (condition.domain_match) {
        const domainMatched = this.matchDomain(
          condition.domain_match,
          input.context.domain
        );
        if (!domainMatched) return { matched: false };
      }

      if (condition.intent_match) {
        const intentMatched = this.matchIntent(
          condition.intent_match,
          input.context.intent,
          input.user_message
        );
        if (!intentMatched) return { matched: false };
      }

      if (condition.semantic_similarity_check) {
        const semSimilarityMatched = this.matchSemanticSimilarity(
          condition.semantic_similarity_check,
          input.context.intent
        );
        if (!semSimilarityMatched) return { matched: false };
      }
    }

    return { matched: true };
  }

  /**
   * Match domain against rule's allowed domains
   */
  private matchDomain(
    domainMatch: any,
    inputDomain: string
  ): boolean {
    const allowedDomains = domainMatch.domains || [];
    const exactMatch = domainMatch.exact_match !== false;

    if (exactMatch) {
      return allowedDomains.includes(inputDomain);
    } else {
      // Partial match allowed
      return allowedDomains.some((d: string) => inputDomain.includes(d));
    }
  }

  /**
   * Match intent against rule's intent patterns
   */
  private matchIntent(
    intentMatch: any,
    inputIntent: any,
    userMessage: string
  ): boolean {
    const patterns = intentMatch.primary_intent_patterns || [];
    const strategy = intentMatch.match_strategy || 'regex';

    const textToMatch = [
      inputIntent.primary,
      inputIntent.pattern,
      userMessage,
    ].join(' ');

    for (const pattern of patterns) {
      if (strategy === 'regex') {
        try {
          const regex = new RegExp(pattern, 'i');
          if (regex.test(textToMatch)) {
            return true;
          }
        } catch (e) {
          console.warn(`Invalid regex pattern: ${pattern}`);
        }
      }
    }

    return false;
  }

  /**
   * Match semantic similarity threshold
   */
  private matchSemanticSimilarity(
    semCheck: any,
    inputIntent: any
  ): boolean {
    const threshold = semCheck.threshold || 0.75;
    const similarity = inputIntent.semantic_similarity || 0;

    return similarity >= threshold;
  }

  /**
   * Compute risk score with environment-aware modifiers
   */
  private computeRiskScore(
    rule: Rule,
    input: RequestInput,
    ruleMatch: any
  ): number {
    let score = rule.risk_scoring.base_score;
    const modifiers = rule.risk_scoring.modifiers || [];

    for (const modifier of modifiers) {
      if (this.evaluateCondition(modifier.condition, input)) {
        score += modifier.adjustment;
      }
    }

    // Clamp score to 0-100
    return Math.min(100, Math.max(0, score));
  }

  /**
   * Evaluate a condition string against input context
   */
  private evaluateCondition(condition: string, input: RequestInput): boolean {
    const context = input.context;

    // Simple condition evaluation
    if (condition.includes('semantic_similarity >= 0.95')) {
      return context.intent.semantic_similarity >= 0.95;
    }
    if (condition.includes('confidence >= 0.95')) {
      return context.intent.confidence >= 0.95;
    }
    if (condition.includes('is_research_context == true')) {
      return input.context.source_metadata.is_research_context === true;
    }
    if (condition.includes("environment == 'dev'")) {
      return input.environment === 'dev';
    }
    if (condition.includes('has_institutional_affiliation')) {
      return (
        !!input.context.source_metadata.institutional_affiliation
      );
    }
    if (condition.includes('confidence >= 0.9')) {
      return context.intent.confidence >= 0.9;
    }

    return false;
  }

  /**
   * Get risk threshold action for a score
   */
  private getThresholdForScore(score: number): {
    action: string;
    min_score: number;
    max_score: number;
  } {
    const thresholds = this.policy.enforcement.risk_thresholds;

    if (score >= thresholds.deny.min_score) {
      return { action: 'DENY', ...thresholds.deny };
    }
    if (score >= thresholds.flag.min_score) {
      return { action: 'FLAG', ...thresholds.flag };
    }
    return { action: 'ALLOW', ...thresholds.allow };
  }

  /**
   * Apply environment-specific enforcement overrides
   */
  private applyEnvironmentOverride(
    decision: string,
    environment: string,
    rule: Rule
  ): any {
    const envConfig = this.environmentConfig[environment];
    if (!envConfig) return null;

    const ruleOverrides = envConfig.rule_overrides || [];
    for (const override of ruleOverrides) {
      if (override.rule_ids.includes(rule.rule_id)) {
        return {
          environment,
          enforcement_level: envConfig.enforcement_level,
          original_decision: decision,
          downgraded_to: override.action,
          mandatory_logging_enabled: override.mandatory_log || false,
        };
      }
    }

    return null;
  }

  /**
   * Parse exceptions from policy
   */
  private parseExceptions(): Map<string, any> {
    const exceptions = new Map();
    const overrides = this.policy.overrides?.exceptions || [];

    for (const exception of overrides) {
      exceptions.set(exception.exception_id, exception);
    }

    return exceptions;
  }

  /**
   * Find applicable exception for request
   */
  private findApplicableException(input: RequestInput): any {
    const now = new Date();

    for (const [, exception] of this.exceptions) {
      const expiryDate = new Date(exception.expiry_date);
      if (expiryDate > now) {
        // Check if exception applies to this request
        if (
          exception.conditions &&
          exception.conditions.includes('must_have_institutional_affiliation')
        ) {
          if (!input.context.source_metadata.institutional_affiliation) {
            continue;
          }
        }
        return exception;
      }
    }

    return null;
  }

  /**
   * Apply exception override
   */
  private applyException(
    input: RequestInput,
    exception: any,
    startTime: number
  ): EvaluationResult {
    return {
      decision: 'FLAG' as const,
      risk_score: 73, // Example override score
      decision_reason: {
        rule_id: exception.rule_ids[0],
        matched_intent: 'exception applied',
        matched_domain: input.context.domain,
        semantic_similarity_score: input.context.intent.semantic_similarity,
        risk_score_computation: {
          base_score: 98,
          modifiers_applied: [
            {
              condition: 'exception_override_applied',
              adjustment: -30,
              applied: true,
            },
          ],
          final_score: 73,
        },
        triggered_at: new Date().toISOString(),
      },
      context_snapshot: this.buildContextSnapshot(input),
      override_applied: {
        exception_id: exception.exception_id,
        approved_by: exception.approved_by,
        expiry_date: exception.expiry_date,
      },
      response: {
        message: 'Exception applied. Request flagged but permitted under approved research conditions.',
        decision_code: 'EXCEPTION_001',
      },
      audit_metadata: {
        evaluated_at: new Date().toISOString(),
        evaluated_by: 'policy_engine_v1',
        policy_version: this.policy.version,
        evaluation_latency_ms: Date.now() - startTime,
      },
    };
  }

  /**
   * Build decision reason object
   */
  private buildDecisionReason(
    rule: Rule,
    input: RequestInput,
    riskScore: number,
    ruleMatch: any,
    environmentOverride: any
  ): DecisionReason {
    const baseScore = rule.risk_scoring.base_score;
    const modifiers = rule.risk_scoring.modifiers || [];

    const modifiersApplied = modifiers.map((m) => ({
      condition: m.condition,
      adjustment: m.adjustment,
      applied: this.evaluateCondition(m.condition, input),
    }));

    return {
      rule_id: rule.rule_id,
      matched_intent: input.context.intent.primary,
      matched_domain: input.context.domain,
      semantic_similarity_score: input.context.intent.semantic_similarity,
      risk_score_computation: {
        base_score: baseScore,
        modifiers_applied: modifiersApplied as any,
        final_score: riskScore,
      },
      triggered_at: new Date().toISOString(),
      ...(environmentOverride && { environment_override: environmentOverride }),
    };
  }

  /**
   * Build context snapshot for audit
   */
  private buildContextSnapshot(input: RequestInput): Record<string, any> {
    return {
      domain: input.context.domain,
      domain_source: input.context.domain_source,
      environment: input.environment,
      user_id: input.user_id,
      is_research_context: input.context.source_metadata.is_research_context,
      geographic_origin: input.context.source_metadata.geographic_origin,
    };
  }

  /**
   * Generate alerts based on decision
   */
  private generateAlerts(
    decision: string,
    rule: Rule,
    input: RequestInput,
    riskScore: number
  ): Array<{ channel: string; priority: string; message: string }> {
    const alerts = [];
    const channels = rule.audit.alert_channels || [];

    for (const channel of channels) {
      alerts.push({
        channel,
        priority: decision === 'DENY' ? 'critical' : 'high',
        message: `[${decision}] ${rule.description} | risk_score: ${riskScore} | user: ${input.user_id}`,
      });
    }

    return alerts;
  }

  /**
   * Build default allow decision
   */
  private buildAllowDecision(input: RequestInput, startTime: number): EvaluationResult {
    return {
      decision: 'ALLOW',
      risk_score: 0,
      decision_reason: null,
      context_snapshot: this.buildContextSnapshot(input),
      override_applied: null,
      response: {
        message: 'Request permitted. No policy violations detected.',
        decision_code: 'ALLOW_000',
      },
      audit_metadata: {
        evaluated_at: new Date().toISOString(),
        evaluated_by: 'policy_engine_v1',
        policy_version: this.policy.version,
        evaluation_latency_ms: Date.now() - startTime,
      },
    };
  }
}

// ============================================================================
// EXPORT TYPES & UTILITY
// ============================================================================

export { RequestInput, EvaluationResult, DecisionReason };
