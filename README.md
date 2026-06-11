<p align="center">
  <img src="logo.svg" width="180" />
</p>

<h1 align="center">AI Sentry</h1>
<p align="center"><b>AI Agent Reliability OS — Trace · Replay · Predict · Govern</b></p>

<p align="center">
AI Sentry 是一套 <b>AI 行為作業系統（AI Behavior OS）</b>，用來讓任何 AI Agent 的行為變得可觀測、可預測、可治理、可審計。
</p>

---

🧠 What is AI Sentry?

AI Sentry 不是 SDK、不是監控工具、不是 CI 工具。  
它是一個 AI Agent 行為治理核心（Behavior Governance Kernel），提供：

- 🔍 Trace — 觀測 AI Agent 的每一步行為  
- 🧪 Replay — 重播與模擬行為，找出根因  
- 🔮 Predict — 預測變更可能造成的行為偏移  
- 🛡️ Intercept — 攔截不安全或不符合政策的行為  
- 📜 Audit — 產生完整、不可變的審計紀錄  
- ⚖️ Govern — 以政策與能力模型治理 AI Agent  

AI Sentry 的目標是：  
讓 AI Agent 的行為變得可控、可預測、可審計、可治理。

---

🏛️ System Architecture

AI Sentry 的架構由五大核心組成：

1. Session Model — 身份、上下文、意圖  
2. Capability Model — 權限、TTL、約束、不可變能力  
3. Policy Engine — 驗證、約束、意圖一致性  
4. Runtime Kernel — 行為攔截、重播、預測、漂移偵測  
5. Audit System — 不可變審計事件

詳細架構請見：  
👉 docs/ARCHITECTURE.md

---

🔐 Security Model

AI Sentry 採用 Capability-Based Security：

- 每個行為都需要一個 capability  
- capability 是不可變、可審計、可撤銷  
- 所有 capability 都是 identity-bound  
- 所有行為都經過 deterministic validation pipeline  
- 所有違規行為都會觸發 drift detection 或 revocation  

詳細安全模型請見：  
👉 docs/POLICY_MODEL.md  
👉 docs/CAPABILITY_SCHEMA.md  
👉 docs/REVOCATION_MODEL.md

---

🧩 Core Documents

AI Sentry 的完整規格文件：

- ARCHITECTURE.md — 系統架構  
- THREAT_MODEL.md — 威脅模型  
- DESIGN_PRINCIPLES.md — 設計原則  
- POLICY_MODEL.md — 政策模型  
- RUNTIME_MODEL.md — 執行模型  
- CAPABILITY_SCHEMA.md — 能力結構  
- SESSION_MODEL.md — Session 模型  
- AUDIT_MODEL.md — 審計模型  
- REVOCATION_MODEL.md — 撤銷模型  

這些文件構成 AI Sentry 的完整安全框架。

---

🚀 Quick Start

`bash
npm install ai-sentry
`

建立一個最小的 Sentry：

`js
import { Sentry } from "ai-sentry";

const sentry = new Sentry({
  policy: "./ai-sentry.policy.yaml"
});
`

驗證一個行為：

`js
await sentry.validate({
  action: "write:file",
  target: "/tmp/output.txt",
  identity: "agent-42"
});
`

---

🧪 Examples

範例程式碼位於：

`
examples/
  ├── 01-basic-policy.js
  ├── 02-capability-lifecycle.js
  ├── 03-drift-detection.js
  ├── 04-revocation-demo.js
`

---

🛣️ Roadmap

- [ ] Policy DSL v2  
- [ ] Multi-agent global memory  
- [ ] Temporal Replay Engine v2  
- [ ] Web sandbox runtime  
- [ ] Visualizer UI  
- [ ] Cloud audit backend  

---

📜 License

MIT License.

---

🙌 Contributing

歡迎 PR、Issue、提案、討論。  
AI Sentry 是一個開放的 AI 安全框架，期待你的參與。<p align="center">
  <img src="logo.svg" width="180" />
</p>

<h1 align="center">AI Sentry</h1>
<p align="center">AI Agent Reliability OS — Trace · Replay · Policy Engine</p>
🧠 AI Sentry — AI Agent Reliability OS

> **觀測、模擬、解釋、預測、攔截、治理 AI Agent 行為的作業系統**

AI Sentry 不是 SDK、不是監控工具、不是 CI 工具。  
它是一套 **AI 行為作業系統（AI Behavior OS）**，能讓你：

- 🔍 觀測 AI Agent 的每一步行為
- 🧪 模擬未來可能的行為
- 📖 解釋失敗的根本原因
- 🔮 預測變更帶來的影響
- 🛡️ 在執行前攔截危險行為
- 📜 用 Policy DSL 定義治理規則
- ⏪ 完整重播任何 session
- 🕸️ 建立因果圖譜

---

## 🎯 一句話說明白

> **Datadog + Sentry + Kubernetes Control Plane，但是給 AI Agent 用的。**

---

## 📦 功能總覽

```

SDK → Event Store → Graph Engine → Simulation Engine
→ Policy DSL → Execution Compiler → Control Plane
→ Replay UI → Dashboard

```

| 層級 | 功能 | 說明 |
|------|------|------|
| 觀測層 | SDK + Replay + Explanation | 自動追蹤、重播、解釋 AI 行為 |
| 模擬層 | Sandbox + CI/CD | 預演變更、自動生成對抗測試 |
| 安全層 | WASM Kernel + Decision Engine | 沙箱隔離、ALLOW/WARN/BLOCK 判決 |
| 分散式層 | Event Bus + Worker Fleet | 事件驅動、水平擴展 |
| 治理層 | Policy DSL + Control Plane | 自訂規則、pause/resume/block |
| 因果層 | Graph Engine + Global Memory | 因果圖譜、跨 session 記憶 |
| 編譯層 | Execution Compiler + Stability | 把規則編譯成可執行的安全計畫 |

---

## 🚀 Quickstart

```bash
npm install ai-sentry
```

```ts
import { init, trace } from 'ai-sentry';

init({ apiKey: process.env.AI_SENTRY_KEY });

await trace({
  sessionId: 'sess-1',
  payload: {
    tool: 'search',
    input: 'weather in Tokyo',
  },
});
```

---

📜 Policy DSL（YAML）

```yaml
version: "1.0"

rules:
  - id: block-email
    priority: 100
    when:
      event.payload.tool: "email"
    then:
      action: "BLOCK"

  - id: quarantine-high-risk
    priority: 80
    when:
      event.payload.riskScore > 0.8
    then:
      action: "QUARANTINE"
```

---

🧪 CI/CD 整合

```yaml
# .github/workflows/ai-sentry.yml
name: AI Sentry Simulation
on: [pull_request]
steps:
  - run: npx ai-sentry ci run
```

每次 PR 自動模擬 AI 行為變化，Block / Warn / Approve。

---

🏗 架構

```
EVENT STORE (真理來源)
     ↓
GRAPH RECONSTRUCTOR (因果圖譜)
     ↓
SIMULATION ENGINE (模擬預測)
     ↓
EXECUTION COMPILER (編譯安全計畫)
     ↓
CONTROL PLANE (執行控制)
     ↓
REPLAY UI / DASHBOARD
```

---

💰 商業模式

方案 價格 適用
Free $0/月 個人開發者
Pro $49/月 小型團隊
Team $199/月 中型公司
Enterprise 客製 銀行、醫療、合規需求

---

🗺 Roadmap

· SDK v1 + Decision Engine
· Event Sourcing + Replay
· Policy DSL + Control Plane
· Graph Engine + Causal Analysis
· Simulation Engine + CI/CD
· Execution Compiler + Stability
· Dashboard v3 + Live Replay
· Product Hunt 上線
· Multi-Agent Global Memory

---

📄 License

MIT License

---

🔗 連結

· GitHub: https://github.com/gujianting0124-tw/ai-sentry
