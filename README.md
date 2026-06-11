<<<<<<< HEAD
## Project Structure

- **core/** — Moat Runtime 核心  
- **trust/** — Trust Boundary  
- **control/** — AutoController / State Machine  
- **engine/** — Policy Engine  
- **replay/** — Replay Engine  
- **demo/** — Demo scripts  
- **examples/** — 使用範例  
- **sessions/** — Session logs  
- **logs/** — Audit logs  
- **cli/** — CLI (WIP)  
- **ARCHITECTURE.md**  
- **MVP_ROADMAP.md**  
- **README.md**  
- **test.js**
=======
# AI Sentry
AI 行為治理系統：讓 AI 變得可控、可審計、可回放。

![Architecture](./architecture.svg)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16-green)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/npm-11.16.0-blue)](https://www.npmjs.com/)
[![License](https://img.shields.io/badge/license-MIT-yellow)](./LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![GitHub issues](https://img.shields.io/github/issues/gujianting0124-tw/ai-sentry)](https://github.com/gujianting0124-tw/ai-sentry/issues)
[![GitHub stars](https://img.shields.io/github/stars/gujianting0124-tw/ai-sentry)](https://github.com/gujianting0124-tw/ai-sentry/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/gujianting0124-tw/ai-sentry)](https://github.com/gujianting0124-tw/ai-sentry/network)
[![Last Commit](https://img.shields.io/github/last-commit/gujianting0124-tw/ai-sentry)](https://github.com/gujianting0124-tw/ai-sentry/commits/main)

---

## Quick Start

```bash
git clone https://github.com/gujianting0124-tw/ai-sentry
cd ai-sentry
npm install
node demo/basic.js
Project Structure
core/ — Moat Runtime 核心

trust/ — Trust Boundary

control/ — AutoController / State Machine

engine/ — Policy Engine

replay/ — Replay Engine

demo/ — Demo scripts

examples/ — 使用範例

sessions/ — Session logs

logs/ — Audit logs

cli/ — CLI (WIP)

Replay Example
執行回放測試：

bash
npm run replay -- sess-1
輸出範例：

程式碼
🧠 Replay Session: sess-1

[ALLOW] search  
[BLOCK] email  
[ALLOW] search  
[BLOCK] email  
License
本專案採用 MIT License，詳見 LICENSE 檔案。
>>>>>>> 54e883c (docs: add badges and start-ready README)
