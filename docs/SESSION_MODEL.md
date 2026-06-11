AI Sentry — Session Model

AI Sentry sessions define the identity, context, and lifecycle under which capabilities are issued and validated.  
This document describes the session structure, lifecycle, validation rules, and security guarantees.

---

1. Session Structure

A session contains:

`yaml
session:
  id: <string>
  identity: <string>
  created_at: <timestamp>
  last_active: <timestamp>
  intent: <string>
  capabilities:
    - <capability_id>
  context:
    <key>: <value>
`

---

2. Field Semantics

1. id
Unique session identifier.

2. identity
The agent associated with the session.  
All capabilities issued in this session are bound to this identity.

3. created_at
Timestamp when the session was created.

4. last_active
Updated whenever the agent performs an action.

5. intent
The declared purpose of the session.  
Used for drift detection and intent validation.

6. capabilities
List of capability IDs issued to this session.

7. context
Optional metadata:
- environment  
- resource limits  
- safety mode  
- execution context  

---

3. Session Lifecycle

A session progresses through five phases:

1. Create
Identity is established and session intent is declared.

2. Issue
Capabilities are granted based on policy and session intent.

3. Use
Agent performs actions validated by Sentry.

4. Drift Check
Sentry monitors whether actions still align with session intent.

5. Terminate
Session ends or is revoked.

---

4. Validation Rules

AI Sentry enforces:

1. Identity Binding
Session identity must match capability identity.

2. Intent Consistency
Actions must align with session intent.

3. Activity Freshness
Inactive sessions may be auto‑terminated.

4. Capability Validity
All capabilities must pass:
- TTL  
- identity  
- intent  
- constraints  

5. Context Enforcement
Session context must satisfy policy constraints.

---

5. Drift Detection

Drift is detected when:

- actions deviate from declared intent  
- context changes unexpectedly  
- behavior becomes inconsistent with policy  

Drift triggers:
- warnings  
- capability revocation  
- session termination  

---

6. Audit Events

AI Sentry logs:

- session creation  
- capability issuance  
- capability usage  
- drift detection  
- session termination  

Audit logs are append‑only.

---

7. Security Guarantees

Sessions provide:

- identity‑bound execution  
- intent‑aware validation  
- predictable lifecycle  
- strict least privilege  
- safe failure behavior  
- full auditability  

Sessions form the foundation of AI Sentry’s runtime security model.
