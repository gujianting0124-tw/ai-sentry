const fs = require("fs");
const path = require("path");

const sessionName = process.argv[2];
if (!sessionName) {
  console.error("❌ Missing session name. Usage: npm run replay -- <session>");
  process.exit(1);
}

const sessionPath = path.join(__dirname, "../../../sessions", `${sessionName}.json`);

if (!fs.existsSync(sessionPath)) {
  console.error(`❌ Session file not found: ${sessionPath}`);
  process.exit(1);
}

const events = JSON.parse(fs.readFileSync(sessionPath, "utf8"));

console.log(`\n🧠 Replay Session: ${sessionName}\n`);

for (const event of events) {
  const decision = event.decision || "UNKNOWN";
  const tool = event.tool || "UNKNOWN";
  const input = event.input || "(no input)";
  const risk = event.riskScore !== undefined ? event.riskScore.toFixed(2) : "N/A";
  const time = event.timestamp ? new Date(event.timestamp).toISOString() : "N/A";
const green = "\x1b[32m";
const red = "\x1b[31m";
const reset = "\x1b[0m";
const color = decision === "ALLOW" ? green : red;
console.log(`${color}[${decision}]${reset} ${tool}`);
  console.log(`  • input: ${input}`);
  console.log(`  • risk: ${risk}`);
  console.log(`  • time: ${time}\n`);
}
