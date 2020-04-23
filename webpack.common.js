const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");

module.exports = (env, argv, isProduction) => ({
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: `React Responsive Grid Layout demo (${!isProduction ? "development" : "production"} mode)`,
            favicon: path.resolve(__dirname, "./src/images/favicon.png")
        }),
        new HtmlWebpackPartialsPlugin({
            path: path.resolve(__dirname, "./src/partials/rootElement.html"),
            priority: "high",
            location: "body"
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
});