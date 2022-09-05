const CopyPlugin = require("copy-webpack-plugin");
const paths = require("./paths");

module.exports = {
  entry: paths.src.js + "/index.ts",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: paths.src.root + "/index.html",
          to: "",
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "off-canvas-menu.js",
    path: paths.dest.root,
  },
};
