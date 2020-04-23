const merge = require("webpack-merge");
const common = require("./webpack.demo.common.js");

module.exports = (env, argv) => (
    merge(
        common(env, argv, true),
        {
            mode: "production",
            devtool: "source-map"
        }
    )
);