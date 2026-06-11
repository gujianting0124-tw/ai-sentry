AI Sentry — Revocation Model

AI Sentry uses a deterministic, global revocation system to ensure that invalid or unsafe capabilities are immediately disabled.  
This document defines revocation modes, lifecycle semantics, propagation rules, and security guarantees.

---

1. Purpose of Revocation

Revocation ensures that:

- expired capabilities cannot be used  
- unsafe or compromised capabilities are immediately disabled  
- drift‑triggered violations are contained  
- sessions cannot exceed their intended authority  
- the system maintains strict least privilege at all times  

Revocation is a core part of AI Sentry’s runtime safety model.

---

2. Revocation Modes

AI Sentry supports three revocation modes:

1. Manual Revocation
Triggered by:
- administrator  
- system policy  
- external security signal  

Used when:
- capability is compromised  
- session behavior becomes suspicious  
- policy changes require immediate enforcement  

2. TTL Expiration
Automatic revocation when:
`
issuedat + ttl < currenttime
`

TTL ensures:
- short‑lived authority  
- predictable expiration  
- minimized attack window  

3. Drift‑Triggered Revocation
Activated when:
- agent behavior deviates from declared intent  
- session context changes unexpectedly  
- constraints are violated  

Drift revocation is immediate and global.

---

3. Revocation Lifecycle

A capability transitions through:

1. Active
Valid and usable.

2. Revoked
Marked invalid and removed from session authority.

3. Audited
Revocation event is logged.

4. Enforced
All future attempts to use the capability are denied.

Revocation is final — capabilities cannot be reactivated.

---

4. Propagation Rules

Revocation propagates across:

1. Session
All capabilities belonging to the session may be revoked.

2. Identity
If identity is compromised, all capabilities for that identity are revoked.

3. System
Policy changes may trigger global revocation waves.

Propagation is deterministic and immediate.

---

5. Validation Behavior After Revocation

Once revoked:

- capability match fails  
- identity check fails  
- TTL check is bypassed  
- intent validation is bypassed  
- constraint evaluation is bypassed  

The system immediately returns a revocation_denied error.

---

6. Audit Events

Revocation generates:

`yaml
event:
  type: "capability_revoked"
  capability_id: <string>
  session_id: <string>
  identity: <string>
  reason: <string>
  timestamp: <timestamp>
`

Reasons include:
- "manual"  
- "ttl_expired"  
- "drift_detected"  
- "policy_update"  

---

7. Security Guarantees

Revocation provides:

- immediate removal of unsafe authority  
- strict least privilege enforcement  
- deterministic system behavior  
- containment of compromised agents  
- full auditability  
- predictable expiration of permissions  

Revocation is the final safety barrier in AI Sentry’s capability‑based security model.
