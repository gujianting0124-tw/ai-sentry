5. Constraint Satisfaction

All constraints must evaluate to true.

6. Nonce Uniqueness

Nonce must not match any previously used nonce.

4. Security Guarantees

Capabilities provide:

Least privilege

Immutable permissions

Identity‑bound authority

Replay protection

Deterministic validation

Full auditability

5. Example Capability

capability:
  id: "cap-123"
  action: "write:file"
  target: "/logs/output.txt"
  intent: "store results"
  identity: "agent-42"
  issued_at: 1717430000
  ttl: 300
  nonce: "a8f9c1d2"
  constraints:
    max_size: 1024
    environment: "sandbox"

6. Summary

The capability schema ensures:

explicit authority

strict boundaries

predictable behavior

safe failure

strong identity guarantees

This schema forms the foundation of AI Sentry’s security model.


