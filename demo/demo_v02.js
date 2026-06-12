import fs from "fs";

function decide(event) {
  if (event.action === "email") return "BLOCK";
  return "ALLOW";
}

const session = [
  { action: "search", query: "weather" },
  { action: "email", to: "test@example.com" },
  { action: "search", query: "news" }
];

for (const e of session) {
  e.decision = decide(e);
}

fs.writeFileSync("sessions/demo-v02.json", JSON.stringify(session, null, 2));

console.log("Demo v0.2 session created: sessions/demo-v02.json");
