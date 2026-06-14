const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  gray: "\x1b[90m"
};

exports.ok = (msg) => console.log(colors.green + msg + colors.reset);
exports.err = (msg) => console.log(colors.red + msg + colors.reset);
exports.warn = (msg) => console.log(colors.yellow + msg + colors.reset);
exports.info = (msg) => console.log(colors.blue + msg + colors.reset);
exports.meta = (msg) => console.log(colors.gray + msg + colors.reset);
