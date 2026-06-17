// packages/replay-cli/src/index.cjs

const fs = require("fs");
const path = require("path");

function loadSession(id) {
  const file = path.join(process.cwd(), "sessions", `${id}.json`);
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw);
}

function formatRisk(risk) {
  if (typeof risk !== "number") return "n/a";
  const barLength = 20;
  const filled = Math.round(risk * barLength);
  const empty = barLength - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);
  return `${risk.toFixed(2)}  ${bar}`;
}

function replay(id) {
  console.log(`🧠 Replay Session: ${id}`);

  const session = loadSession(id);
  const results = session.results || [];

  let allowCount = 0;
  let blockCount = 0;
  let reviewCount = 0;

  const ruleHits = {};

  for (const item of results) {
    const event = item.event;
    const decision = item.decision;
    const label = decision.decision || "allow";

    if (label === "allow") allowCount++;
    else if (label === "block") blockCount++;
    else reviewCount++;

    if (decision.ruleId) {
      ruleHits[decision.ruleId] = (ruleHits[decision.ruleId] || 0) + 1;
    }

    console.log(`[${label.toUpperCase()}] ${event.action}`);
    console.log(`  • input: ${event.input}`);

    if (typeof event.risk === "number") {
      console.log(`  • risk: ${formatRisk(event.risk)}`);
    }

    console.log(`  • time: ${event.timestamp}`);

    // ⭐ Pipeline Trace
    if (decision.pipeline) {
      console.log(`  • pipeline: ${decision.pipeline}`);
    }

    if (decision.ruleId) {
      console.log(`  • rule: ${decision.ruleId}`);
    }

    if (decision.reason) {
      console.log(`  • reason: ${decision.reason}`);
    }

    console.log("");
  }

  console.log("✅ Replay complete.");
  console.log("Summary:");
  console.log(`  • ALLOW: ${allowCount}`);
  console.log(`  • BLOCK: ${blockCount}`);
  console.log(`  • REVIEW: ${reviewCount}`);

  console.log("\nRule Coverage:");
  const ruleIds = Object.keys(ruleHits);
  if (ruleIds.length === 0) {
    console.log("  (no rules matched)");
  } else {
    for (const ruleId of ruleIds) {
      console.log(`  ${ruleId}: ${ruleHits[ruleId]} hit`);
    }
  }
}

const id = process.argv[2];
if (!id) {
  console.error("Usage: node packages/replay-cli/src/index.cjs <session-id>");
  process.exit(1);
}

replay(id);
