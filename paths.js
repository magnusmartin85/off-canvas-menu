const path = require("path");

const paths = {
  src: {
    root: path.resolve(__dirname, "./src"),
    js: path.resolve(__dirname, "./src/js"),
    templates: path.resolve(__dirname, "./src/templates"),
  },
  dest: {
    root: path.resolve(__dirname, "./public"),
  },
};

module.exports = paths;
