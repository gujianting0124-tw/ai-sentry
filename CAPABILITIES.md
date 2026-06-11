# AI Sentry — 能力地圖（Capabilities Map）

## I. Observation Layer — 行為觀察層
- 行為事件記錄（sessions/）
- 行為上下文捕捉
- 行為序列化（JSON logs）
- 行為分類（search / email / tool / action）
- 行為時間軸（timeline）

## II. Replay Layer — 行為回放層
- Session 回放引擎（replay/）
- 行為逐步重播
- Policy 匹配（ALLOW / BLOCK）
- 回放輸出（可審計）

## III. Policy Engine — 行為治理層
- Policy Matcher（engine/）
- 多規則匹配
- 行為分類治理
- ALLOW / BLOCK 決策
- Policy Evolver（policy-evolver.js）

## IV. Trust Boundary — 信任邊界層
- 能力白名單 / 黑名單
- 行為邊界（trust/）
- 代理能力限制
- 安全邊界（Moat）

## V. Moat Runtime — 核心執行層
- 行為攔截器（core/）
- 執行流程控制
- 行為封裝（sandbox）
- 安全執行環境（moat/）

## VI. AutoController — 自動控制層
- 自動控制器（auto-controller.js）
- 狀態機（control/）
- 行為切換
- 行為序列管理

## VII. CLI / Integration Layer — 整合層
- Replay CLI（packages/replay-cli/）
- Demo CLI（demo/）
- Examples（examples/）
- Node.js 模組化（type: module）

## VIII. Documentation Layer — 文件層
- ARCHITECTURE.md
- MVP_ROADMAP.md
- PHILOSOPHY.md
- README.md
- PROOF.md

---
## Summary
AI Sentry 目前具備：
- 可觀察
- 可回放
- 可治理
- 可限制
- 可控
- 可引導
- 可整合
- 可維護
