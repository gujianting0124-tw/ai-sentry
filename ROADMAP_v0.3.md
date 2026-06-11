# AI Sentry v0.3 Roadmap

## 🎯 目標
建立一個可驗證、可治理、可回放的 AI 行為治理系統，並提供最小可用示範（MVP）。

---

## ✅ 已完成（v0.2 → v0.3）
- Replay Engine 可正常回放 sess-1
- Policy Engine 可正確 ALLOW / BLOCK
- demo/basic.js 可正常執行
- package.json 修復（ESM / CJS 相容）
- README（含徽章）完成
- CAPABILITIES.md（能力地圖）完成
- PROOF.md（第一個證明項目）完成
- Git rebase / 衝突解決完成

---

## 🚀 v0.3 要完成的項目

### 1. Demo v0.2（更完整示範）
- 新增一個 demo：AI 代理執行 3 個行為 → Replay → Policy 決策
- 輸出格式更清楚（含時間戳）

### 2. Policy 測試套件
- 增加 3 個測試案例：
  - search → allow
  - email → block
  - unknown → allow

### 3. Replay Engine 強化
- 增加 replay summary（統計 ALLOW / BLOCK 數量）
- 增加 replay log 輸出到 logs/

### 4. PROOF.md 第二個證明項目
- 「Replay Engine 能輸出 summary」

---

## 📌 v0.3 完成條件
- demo v0.2 可執行
- replay summary 正常
- policy 測試通過
- PROOF.md 更新
- README 更新（加入 v0.3）

---

