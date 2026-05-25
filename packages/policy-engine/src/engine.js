import fs from 'fs';
import yaml from 'yaml';

export type PolicyDecision = 'ALLOW' | 'WARN' | 'BLOCK';

export function evaluatePolicy(
  tool: string,
  riskScore: number
): PolicyDecision {
  const policyFile = fs.readFileSync('ai-sentry.policy.yaml', 'utf-8');
  const policy = yaml.parse(policyFile);
  for (const rule of policy.rules) {
    if (rule.when?.['event.payload.tool'] === tool) {
      return rule.then.action;
    }
    if (riskScore > 0.8 && rule.then.action === 'WARN') {
      return 'WARN';
    }
  }
  return 'ALLOW';
}
