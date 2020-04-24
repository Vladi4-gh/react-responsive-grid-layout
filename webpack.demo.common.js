const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv, isProduction) => ({
    entry: {
        app: "./src/demo/index.js"
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            template: "./src/demo/index.html",
            hash: isProduction,
            title: `React Responsive Grid Layout demo (${!isProduction ? "development" : "production"} mode)`,
            favicon: path.resolve(__dirname, "./src/demo/images/favicon.png")
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".js", ".jsx"]
                },
                loader: "babel-loader"
            }
        ]
    }
});