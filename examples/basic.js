import { SentryKernel } from "../src/index.js";

const kernel = new SentryKernel();

const session = { identity: "demo-user" };

const result = await kernel.run({
  session,
  action: "say_hello",
  input: "Hello Sentry!"
});

console.log("=== AI Sentry Basic Example ===");
console.log(result);
