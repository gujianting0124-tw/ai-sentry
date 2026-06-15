AI Sentry

AI Agent Reliability OS — Observe, Simulate, Govern, and Replay AI Agent Behavior

AI Sentry 是一個 AI 行為治理系統（AI Behavior Governance System），  
讓 AI 代理變得：

- 可控（Governable）  
- 可審計（Auditable）  
- 可回放（Replayable）  
- 可模擬（Simulatable）  
- 可追蹤（Observable）

AI Sentry 的核心理念：  
> AI 不應該是黑箱。AI 的每一步行為，都應該被記錄、分析、治理與回放。

---

🌐 核心能力（Capabilities）

1. Observe — 行為觀察
- 記錄 AI 每一次 action  
- 產生 session log  
- 生成完整的行為軌跡（trace）

2. Govern — 政策治理
- Policy Engine  
- Threat Intelligence  
- Rule-based decision  
- ALLOW / BLOCK / MODIFY

3. Replay — 行為回放
- 將 session 重新執行  
- 用於 debugging、稽核、模型比較、風險分析

4. Simulate — 行為模擬
- 模擬不同政策下的行為結果  
- 模擬不同模型的行為差異（未來版本）

---

🧱 專案結構（Project Structure）

`
ai-sentry/
├── core/            # Moat Runtime 核心
├── trust/           # Trust Boundary（信任邊界）
├── control/         # AutoController / State Machine
├── engine/          # Policy Engine（政策引擎）
├── replay/          # Replay Engine（重播引擎）
├── sessions/        # Session logs（會話日誌）
├── logs/            # Audit logs（稽核日誌）
├── cli/             # CLI 工具
├── demo/            # Demo scripts
└── examples/        # 使用範例
`

---

🚀 快速開始（Quick Start）

`bash
git clone https://github.com/gujianting0124-tw/ai-sentry
cd ai-sentry
npm install
node demo/basic.js
`

---

🔁 Replay Example（回放示例）

`bash
npm run replay -- sess-1
`

輸出示例：

`
[ALLOW] search
[BLOCK] email
[ALLOW] search
[BLOCK] email
`

代表政策引擎成功記錄並回放行為。

---

📄 文件（Documentation）

- ARCHITECTURE.md — 系統架構  
- CAPABILITIES.md — 能力說明  
- PHILOSOPHY.md — 設計哲學  
- MVP_ROADMAP.md — MVP 路線圖  
- ROADMAP_v0.3.md — v0.3 路線圖  
- PROOF.md — 概念驗證  
- README.md — 專案介紹  

---

🧪 技術堆疊（Tech Stack）

- TypeScript — 58.4%  
- JavaScript — 25.3%  
- Shell — 15.2%  
- Python — 1.1%

---

👤 貢獻者（Contributors）

- gujianting0124-tw

---

📜 授權（License）

MIT License

