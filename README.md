🏛️ 1. System Architecture（全展開）

AI Sentry is a modular Behavior OS composed of five cooperating subsystems.  
Each subsystem is independently testable, replaceable, and observable.

1.1 Session Model — Identity, Intent, Context

Defines who the agent is, why it is acting, and under what constraints.

包含：

- Identity — user / agent / system  
- Intent — declared purpose (e.g., “generate-report”)  
- Context — environment, metadata, memory  
- State — ephemeral runtime state  
- Trace ID — unique session lineage  

Session Model 是所有行為治理的根基。

---

1.2 Capability Model — Immutable Permission Tokens

AI Sentry 採用 Capability-Based Security。

每個 capability 包含：

- action — 可執行的行為  
- scope — 限制範圍  
- constraints — filters / limits  
- ttl — 有效期限  
- binding — identity-bound  
- immutable — 發行後不可修改  

Capabilities 是 AI Sentry 的「權限原子」。

---

1.3 Policy Engine — Rules, Alignment, Enforcement

Policy Engine 是 AI Sentry 的「法律層」。

它負責：

- allow / deny 規則  
- intent alignment  
- contextual validation  
- risk scoring  
- fallback routing  
- escalation path  

Policies 以 Policy-as-Code 撰寫，可版本化、可審計。

---

1.4 Runtime Kernel — Interception, Replay, Drift Detection

Runtime Kernel 是 AI Sentry 的核心。

它提供：

- Interception — 攔截不安全行為  
- Replay — 重播過去 session  
- Simulation — 模擬假設情境  
- Drift Detection — 偵測行為偏移  
- Prediction — 預測未來行為  

Kernel 是讓 AI Sentry 成為「行為作業系統」的關鍵。

---

1.5 Audit System — Immutable, Forensic Logs

每個事件都會被記錄成不可變的 audit entry：

- timestamp  
- identity  
- capability  
- policy result  
- input / output  
- risk score  
- kernel decision  

Audit System 支援：

- forensics  
- debugging  
- compliance  
- reproducibility  

---

🔐 2. Security Model（全展開）

AI Sentry 的安全模型基於三大原則：

2.1 Capability-Based Security
- 最小權限  
- 不可變  
- 可審計  
- 可撤銷  

2.2 Intent-Bound Execution
每個行為都必須與 session intent 一致。

2.3 Deterministic Governance
相同輸入 → 相同決策 → 相同審計結果。

---

📜 3. Policy Model（全展開）

Policies are declarative, deterministic, and version-controlled.

3.1 Policy Structure
`yaml
policy:
  id: "example-policy"
  allow:
    - action: "generate"
      when:
        intent: "generate-report"
  deny:
    - action: "delete"
`

3.2 Policy Evaluation Flow
1. Load session  
2. Load capabilities  
3. Evaluate allow rules  
4. Evaluate deny rules  
5. Compute risk score  
6. Kernel decision  

---

⚙️ 4. Runtime Kernel（全展開）

4.1 Execution Pipeline
1. Receive action request  
2. Validate session  
3. Validate capability  
4. Evaluate policy  
5. Risk scoring  
6. Interception or execution  
7. Audit logging  

4.2 Replay Engine
- Deterministic  
- Time-travel debugging  
- Forensic reconstruction  

---

🧾 5. Audit Model（全展開）

5.1 Audit Entry Schema
`json
{
  "timestamp": "...",
  "session": "...",
  "identity": "...",
  "action": "...",
  "capability": "...",
  "policy": {
    "allow": true,
    "deny": false,
    "risk": 0.12
  },
  "kernel_decision": "allow",
  "input": "...",
  "output": "..."
}
`

5.2 Audit Guarantees
- Append-only  
- Tamper-proof  
- Cryptographically signed（可選）  
- Replay-compatible  
