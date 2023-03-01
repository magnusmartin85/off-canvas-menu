const path = require("node:path");

const paths = {
  src: {
    root: path.resolve(__dirname, "./src"),
    scripts: path.resolve(__dirname, "./src/scripts")
  },
  dest: {
    root: path.resolve(__dirname, "./dist")
  }
};

export { paths };
