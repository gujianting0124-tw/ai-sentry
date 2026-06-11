# AI Sentry Threat Model

## 🎯 目標
確保 AI Agent 的行為在安全、可控、可審計的框架下執行。

## ⚠️ 威脅類型
- **未授權行為**：Agent 嘗試執行超出能力範圍的操作  
- **政策繞過**：規則未被正確套用或被刻意規避  
- **上下文污染**：Session 被惡意或錯誤資訊影響  
- **審計缺失**：行為未被完整記錄，導致無法追溯  

## 🛡 防禦機制
- **PolicyEngine** → allow/deny 決策  
- **Capability Model** → 嚴格定義 Agent 能力  
- **Session Model** → 身份與上下文追蹤  
- **Audit Logger** → 全事件紀錄，確保可追溯性  

## 📂 未來強化
- 能力白名單  
- Policy DSL  
- Runtime Hooks  
- 更完整的審計與治理工具
