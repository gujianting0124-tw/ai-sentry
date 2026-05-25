module.exports = {
  ...require("./trace"),
  ...require("./types"),
  init(config) {
    console.log("🧠 AI Sentry initialized");
  }
};
