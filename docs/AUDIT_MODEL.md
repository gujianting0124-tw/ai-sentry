AI Sentry — Audit Model

AI Sentry uses an append‑only audit system to ensure full traceability, accountability, and post‑incident analysis.  
This document defines audit event types, event structure, logging guarantees, and retention semantics.

---

1. Purpose of the Audit System

The audit system provides:

- traceability of all security‑relevant actions  
- accountability for agent behavior  
- forensic value during incident investigation  
- transparency for debugging and compliance  
- immutable historical records  

Audit logs are a core part of AI Sentry’s security guarantees.

---

2. Audit Event Types

AI Sentry emits the following event types:

1. session_created
A new session is initialized.

2. capability_issued
A capability is granted to a session.

3. capability_used
An agent attempts to use a capability.

4. capability_denied
A capability fails validation.

5. capability_revoked
A capability is manually or automatically revoked.

6. drift_detected
Agent behavior deviates from declared intent.

7. session_terminated
A session ends or is forcibly closed.

---

3. Audit Event Structure

Each audit event contains:

`yaml
event:
  id: <string>
  type: <string>
  timestamp: <timestamp>
  session_id: <string>
  identity: <string>
  details:
    <key>: <value>
`

Field Semantics

- id — unique event identifier  
- type — one of the event types listed above  
- timestamp — when the event occurred  
- session_id — session associated with the event  
- identity — agent identity  
- details — event‑specific metadata  

---

4. Logging Guarantees

AI Sentry provides:

1. Append‑Only
Events cannot be modified or deleted.

2. Ordering Guarantees
Events are logged in the exact order they occur.

3. Completeness
All security‑relevant actions generate events.

4. Integrity
Logs are protected from tampering.

5. Durability
Logs persist across system restarts.

---

5. Storage Model

Audit logs may be stored in:

- local append‑only files  
- immutable object storage  
- external logging systems  
- distributed audit backends  

Storage must guarantee immutability and durability.

---

6. Example Audit Events

Capability Issued

`yaml
event:
  id: "evt-001"
  type: "capability_issued"
  timestamp: 1717431000
  session_id: "sess-42"
  identity: "agent-42"
  details:
    capability_id: "cap-123"
`

Capability Denied

`yaml
event:
  id: "evt-002"
  type: "capability_denied"
  timestamp: 1717431010
  session_id: "sess-42"
  identity: "agent-42"
  details:
    reason: "ttl_expired"
`

---

7. Security Guarantees

The audit system ensures:

- full traceability  
- tamper‑resistant logs  
- deterministic event ordering  
- forensic‑grade historical records  
- transparent runtime behavior  

Audit logs form the backbone of AI Sentry’s accountability model.
