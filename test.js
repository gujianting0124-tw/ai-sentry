import { SentryKernel } from "./src/index.js";

const kernel = new SentryKernel();

const result = await kernel.run({
  session: { identity: "u" },
  action: "test",
  input: "hi"
});

console.log(result);
