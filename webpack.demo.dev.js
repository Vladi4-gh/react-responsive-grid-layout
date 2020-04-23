const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.demo.common.js");

module.exports = (env, argv) => (
    merge(
        common(env, argv, false),
        {
            mode: "development",
            devtool: "inline-source-map",
            devServer: {
                contentBase: path.resolve(__dirname, "dist"),
                historyApiFallback: true
            }
        }
    )
);