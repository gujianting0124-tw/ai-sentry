# AI Sentry Core Principles

## The Fundamental Contradiction

**AI is excellent at reasoning about state, but is not necessarily aware of true state.**

Engineering trust exists because we have "machine-verifiable facts sources":
- git log
- Test results
- CI status
- Production monitoring
- Audit trails

These are not inferred. They are verified by reproducible execution steps.

---

## The Core Design Principle

**Do not ask AI to describe state. Ask AI to invoke verifiable state sources.**

Instead of:
```
Question: "Is this repo up to date?"
AI Response: "Yes, it appears to be..."
```

Do this:
```
AI generates: git fetch --dry-run && git status
System executes: [actual command result]
AI interprets: [output based on verifiable facts]
```

Now AI's reasoning is built on auditable evidence, not speculation.

---

## The Trust Model Shift

| Dimension | Traditional AI | Verifiable AI System |
|-----------|---|---|
| Narrative style | Good at crafting plausible explanations | Must cite verifiable sources |
| Information gaps | Tendency to fill gaps | Must mark gaps explicitly |
| Output | Final product | Only part of verification process |
| Trust basis | Model reputation | Reproducible verification steps |
| Role | Fact authority | Hypothesis orchestrator |
| Verification | After-the-fact explanation | Built into process |

---

## The Key Question

**When AI participates in decisions, can its testimony be independently verified?**

Without verifiable backing:
- AI's judgment is an unauthorized claim
- It cannot open a shell and run `git status`
- It has no authority over real monitoring data (unless explicitly granted tools)
- Its grasp of world state is indirect, outdated, and potentially hallucinatory

With verifiable backing:
- AI's judgment is a testable hypothesis
- System executes the verification
- Results become auditable evidence
- Trust is earned, not assumed

---

## AI Sentry's Role

AI Sentry implements this principle through:

1. **Session Model**: Who, why, and under what constraints
2. **Capability Model**: Immutable permission atoms
3. **Policy Engine**: Deterministic governance rules
4. **Runtime Kernel**: Interception and verification
5. **Audit System**: Append-only, reproducible trails

None of these ask AI "what do you think should happen?"
Instead, they enforce "prove your decision with verifiable steps."
