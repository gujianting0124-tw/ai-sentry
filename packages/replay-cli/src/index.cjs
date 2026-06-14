const fs = require("fs");
const color = require("../../../log-color");

const name = process.argv[2];
const file = `sessions/${name}.json`;

if (!fs.existsSync(file)) {
  color.err(`❌ Session not found: ${name}`);
  process.exit(1);
}

const session = JSON.parse(fs.readFileSync(file, "utf8"));

color.info(`🧠 Replay Session: ${name}`);

const events = Array.isArray(session) ? session : (session.events || []);

for (const e of events) {
  const tag = e.decision === "allow" ? color.ok : color.err;
  tag(`[${e.decision.toUpperCase()}] ${e.tool}`);
  console.log(`  • input: ${e.input}`);
  console.log(`  • risk: ${e.riskScore}`);
  console.log(`  • time: ${e.timestamp}`);
  console.log("");
}

color.ok("✅ Replay complete.");
