import * as webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import webpackCommon from "./webpack.common";
import { merge } from "webpack-merge";

const config: webpack.Configuration = merge(webpackCommon.config, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
});

export default config;
