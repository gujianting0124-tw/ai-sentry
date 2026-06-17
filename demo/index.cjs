// demo/index.cjs

const fs = require("fs");
const path = require("path");
const { applyPolicy } = require("../policy/engine.js");

function makeEvent(action, input) {
  return {
    timestamp: Date.now(),
    session: { identity: "demo-user" },
    action,
    input,
    risk: Math.random() // demo 用
  };
}

function runDemo() {
  const events = [
    makeEvent("search", "weather in Tokyo"),
    makeEvent("email", "send confidential report")
  ];

  const results = events.map((e) => {
    const decision = applyPolicy(e);
    return { event: e, decision };
  });

  const sessionId = "demo-1";
  const outDir = path.join(__dirname, "..", "sessions");
  const outPath = path.join(outDir, `${sessionId}.json`);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outPath, JSON.stringify({ id: sessionId, results }, null, 2));

  console.log(`✅ Demo session generated: sessions/${sessionId}.json`);
  console.log(`👉 Now run: npm run replay -- ${sessionId}`);
}

runDemo();
