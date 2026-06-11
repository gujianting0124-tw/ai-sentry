import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SESSION_DIR = path.join(process.cwd(), "sessions");

function persistEvent(event) {
  if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true });
  }
  const file = path.join(SESSION_DIR, `${event.sessionId}.json`);
  let events = [];
  if (fs.existsSync(file)) {
    events = JSON.parse(fs.readFileSync(file, "utf-8"));
  }
  events.push(event);
  fs.writeFileSync(file, JSON.stringify(events, null, 2));
}

export async function trace({ sessionId, payload }) {
  const started = Date.now();
  const riskScore = Math.random();

  let decision = "ALLOW";
  if (payload.tool === "email") decision = "BLOCK";
  else if (riskScore > 0.8) decision = "WARN";

  const event = {
    sessionId,
    tool: payload.tool,
    input: payload.input,
    latency: Date.now() - started,
    riskScore,
    timestamp: Date.now(),
    decision,
  };

  persistEvent(event);

  if (decision === "BLOCK") {
    console.log(`❌ BLOCKED: ${payload.tool}`);
  } else {
    console.log(`✔ traced tool=${payload.tool} decision=${decision}`);
  }

  return event;
}
