# AI Sentry — MVP Roadmap

## Mission
Build the first **complete and verifiable governance loop**.

---

## Phase 1: Foundation (ESM) — ✅ COMPLETED

**Status**: 2026-06-11 06:36:48 UTC

✅ All code unified to ESM  
✅ No CommonJS/ESM mixing  
✅ Verification: `node examples/openai-agent/index.js` works  

**Commits**:
- d4022048: Full ESM conversion
- 20175dc: Example to ESM
- 5970e05: Enable ESM

---

## Phase 2: Policy Engine Integration — 🚀 IN PROGRESS

**Goal**: First DENY decision works end-to-end

### Step 2.1: Connect engine.js to trace.js
- Modify `trace.js` to call `evaluatePolicy()`
- Remove hardcoded decision logic
- Same output expected

### Step 2.2: Add delete_file → DENY rule
- Update `ai-sentry.policy.yaml`
- New rule: `action: delete_file` → `DENY`
- Example sends `delete_file` request

### Verification
```bash
node examples/openai-agent/index.js
# Output should include:
# ❌ BLOCKED (policy): delete_file
```

**ETA**: 20 minutes

---

## Phase 3: Demo Ready — 📋 PLANNED

**Goal**: Showcase all major features

- End-to-end scenario
- Dashboard
- Documentation

---

## Success Criteria

### MVP Definition

✅ ESM unified  
✅ Policy Engine connected  
✅ First DENY decision working  
✅ Audit logs complete  
✅ Confidence scores present  

### Product Value

AI Sentry is **no longer a spectator** but a **governance enforcer**.

---

## Key Insight

**Habit beats perfection.**

Each phase:
1. Verify (run code, see results)
2. Commit (record progress)
3. Move forward

This rhythm ensures the project stays alive.
