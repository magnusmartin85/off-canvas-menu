import * as webpack from "webpack";
import { paths } from "./paths";
import CopyPlugin = require("copy-webpack-plugin");

const config: webpack.Configuration = {
  entry: `${paths.src.scripts}/index.ts`,
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: `${paths.src.root}/index.html`,
          to: paths.dest.root
        }
      ]
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "off-canvas-menu.css"
        },
        use: ["sass-loader"]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "off-canvas-menu.js",
    path: paths.dest.root,
    clean: true
  }
};

export default { config };
