import * as webpack from "webpack";
import { paths } from "./paths";
import CopyPlugin = require("copy-webpack-plugin");

const config: webpack.Configuration = {
  entry: paths.src.js + "/index.ts",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: paths.src.root + "/index.html",
          to: ""
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
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
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
    path: paths.dest.root
  }
};

export default config;
