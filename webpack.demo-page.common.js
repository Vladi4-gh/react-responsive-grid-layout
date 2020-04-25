const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv, isProduction) => ({
    entry: "./src/demoPage/index.js",
    output: {
        filename: `demo-page${isProduction ? ".min" : ""}.js`,
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            template: "./src/demoPage/index.html",
            hash: isProduction,
            title: `React Responsive Grid Layout (${!isProduction ? "development" : "production"} mode)`,
            favicon: path.resolve(__dirname, "./src/demoPage/images/favicon.png")
        }),
        new MiniCssExtractPlugin({
            filename: `demo-page${isProduction ? ".min" : ""}.css`,
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProduction
                        }
                    },
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