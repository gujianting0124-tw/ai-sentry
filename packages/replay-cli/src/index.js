const fs = require("fs");

function replay(id) {
  const file = `sessions/${id}.json`;
  if (!fs.existsSync(file)) {
    console.log("Session not found:", id);
    return;
  }

  const events = JSON.parse(fs.readFileSync(file, "utf8"));
  console.log(`\n🧠 Replay Session: ${id}\n`);

  for (const e of events) {
    console.log(`[${e.decision}] ${e.action}`);
  }
}

const sessionName = process.argv[2];
if (!sessionName) {
  console.error("❌ Missing session name. Usage: npm run replay -- <session>");
  process.exit(1);
}

replay(sessionName);
