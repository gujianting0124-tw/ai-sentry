# AI Sentry — System Architecture

## Five Major Subsystems

AI Sentry is a modular AI governance system composed of five interconnected subsystems:

```
┌─────────────────────────────────────────────────────────────┐
│                     AI Agent Request                         │
└──────────────┬──────────────────────────────────────────────┘
               │
       ┌───────▼────────┐
       │  ① Session ID  │  ← "Who are you, why act"
       └───────┬────────┘
               │
       ┌───────▼──────────┐
       │ ② Capability    │  ← "What can you do"
       │   Verification  │
       └───────┬──────────┘
               │
       ┌───────▼──────────┐
       │ ③ Policy Engine │  ← "Do rules allow this"
       │   Evaluation    │
       └───────┬──────────┘
               │
       ┌───────▼──────────┐
       │ ④ Runtime Kernel│  ← "Execute or block"
       │   Execution     │
       └───────┬──────────┘
               │
       ┌───────▼──────────┐
       │ ⑤ Audit System  │  ← "Record decision"
       │   Immutable Log │
       └───────┬──────────┘
               │
       ┌───────▼────────┐
       │  Decision      │
       │ (ALLOW/DENY)   │
       └────────────────┘
```

---

## ① Session Model — Identity and Intent

### Responsibility
Define AI agent identity, intent, and execution environment.

### Core Concept
```javascript
{
  session_id: "sess-1",
  agent_identity: "ci-cd-agent",
  intent: "deploy-service",
  context: {
    user_id: "eng-team",
    repository: "production",
    environment: "staging"
  },
  trace_id: "trace-xyz",
  created_at: "2026-06-11T06:00:00Z",
  ttl: 3600
}
```

---

## ② Capability Model — Immutable Permission Atoms

### Responsibility
Define what operations AI agents can perform, with constraints.

### Core Concept
```javascript
{
  capability_id: "cap-delete-staging",
  holder: "ci-cd-agent",
  action: "delete_environment",
  scope: "staging",
  filters: {
    branch: ["develop", "test"],
    time_window: "00:00-06:00"
  },
  ttl: 86400,
  signature: "sha256:..."
}
```

### Characteristics
- **Immutable**: Cannot be modified after issuance
- **Time-limited**: TTL ensures periodic re-review
- **Granular**: Specific conditions, not blanket permissions

---

## ③ Policy Engine — Governance Rules

### Responsibility
Evaluate whether requests comply with organizational policies.

### Core Concept
```yaml
policy:
  id: "example-policy"
  rules:
    - id: "allow-read-metrics"
      intent: "analytics"
      action: "read_metrics"
      decision: "ALLOW"
    
    - id: "deny-delete-production"
      action: "delete_*"
      scope: "production"
      decision: "DENY"
  
  default: "DENY"
```

### Characteristics
- **Deterministic**: Same input → Same output
- **Human-readable**: YAML format
- **Versioned**: Track policy history

---

## ④ Runtime Kernel — Execution and Interception

### Responsibility
Execute decisions: allow actions or block them.

### Flow
1. Extract session
2. Lookup capability
3. Verify capability signature
4. Check TTL
5. Call policy engine
6. Execute or block
7. Record in audit

---

## ⑤ Audit System — Immutable Forensic Log

### Responsibility
Record all decisions for auditing, replay, and verification.

### Entry Structure
```json
{
  "timestamp": "2026-06-11T06:30:00Z",
  "session_id": "sess-1",
  "action": "delete_file",
  "decision": "DENY",
  "policy_rule": "deny-delete-production",
  "signature": "sha256:..."
}
```

### Characteristics
- **Append-only**: New entries only
- **Complete**: Full decision path recorded
- **Signable**: Cryptographic proof of integrity
- **Replayable**: Can re-evaluate past decisions

---

## Integration Points

### Scenario 1: Allowed Action
```
Agent: "Read metrics"
  ✓ Session valid
  ✓ Capability matches
  ✓ Policy allows
  → Execute
  → Record: ALLOW
```

### Scenario 2: Denied Action
```
Agent: "Delete production config"
  ✓ Session valid
  ✗ Policy denies
  → Block
  → Record: DENY
  → Alert: security team
```

---

## MVP Implementation Status

✅ Session Model (basic)  
✅ Capability Model (implicit in SDK)  
🚀 Policy Engine (connecting now)  
🚀 Runtime Kernel (execution logic)  
✅ Audit System (event-store.js)

Next: Connect Policy Engine to trace()
