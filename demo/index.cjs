const fs = require("fs");
const path = require("path");

const rules = require("../policy/rules");
const { applyPolicy } = require("../policy/engine");

const events = [
  {
    sessionId: "demo-1",
    tool: "search",
    input: "weather in Tokyo",
    riskScore: 0.78,
    timestamp: Date.now()
  },
  {
    sessionId: "demo-1",
    tool: "email",
    input: "send confidential report",
    riskScore: 0.26,
    timestamp: Date.now()
  }
];

for (const e of events) {
  const result = applyPolicy(e, rules);
  e.decision = result.decision;
  e.reason = result.reason;
}

const outPath = path.join(__dirname, "../sessions/demo-1.json");
fs.writeFileSync(outPath, JSON.stringify(events, null, 2));

console.log("✅ Demo session generated: sessions/demo-1.json");
console.log("👉 Now run: npm run replay -- demo-1");
