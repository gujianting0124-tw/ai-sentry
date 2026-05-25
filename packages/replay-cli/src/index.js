const fs = require("fs");

function replay(id) {
  const file = `sessions/${id}.json`;
  if (!fs.existsSync(file)) return console.log("Session not found");
  const events = JSON.parse(fs.readFileSync(file, "utf-8"));
  console.log(`\n🧠 Replay Session: ${id}\n`);
  for (const e of events) console.log(`[${e.decision}] ${e.tool}`);
}

replay(process.argv[2]);
