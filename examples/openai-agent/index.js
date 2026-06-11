import { init, trace } from "../../packages/sdk/src/index.js";

init({ apiKey: "demo-key" });

async function run() {
  await trace({
    sessionId: "sess-1",
    payload: { tool: "search", input: "weather in Tokyo" }
  });

  await trace({
    sessionId: "sess-1",
    payload: { tool: "email", input: "send confidential report" }
  });
}

run();
