const webpack = require("webpack");
const path = require("path");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpackUglifyJsPlugin = require("webpack-uglify-js-plugin");

module.exports = {
    entry: [
        path.join(__dirname, "src/index.js"),
    ],
    mode: "development",
    plugins: [
        new webpack.DefinePlugin({
            "DEBUG": false,
            "GIT_REVISION": JSON.stringify(new GitRevisionPlugin().commithash()),
        }),
        new CleanWebpackPlugin([
            path.join(__dirname, "dist"),
        ]),
        new HtmlWebpackPlugin({
            title: "Webpack boilerplate",
            template: path.join(__dirname, "templates/index.ejs"),
        }),
        new CopyWebpackPlugin([
            {from: "assets", to: "assets"},
            {from: "css", to: "css"},
            {from: "data", to: "data"},
        ]),
        new webpackUglifyJsPlugin({
            cacheFolder: path.resolve(__dirname, "public/cached_uglify/"),
            debug: false,
            minimize: true,
            sourceMap: false,
            output: {
                comments: false,
            },
            compressor: {
                warnings: false,
                drop_console: true,
            },
        }),
    ],
    devServer: {
        contentBase: [path.join(__dirname, "dist")],
        compress: true,
        port: 9000,
        inline: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: true,
            ignored: /node_modules/,
        },
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "boilerplate.min.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ],
            },
            {test: /assets(\/|\\)/, loader: "file-loader?name=assets/[hash].[ext]"},
            {
                test: /\.(csv|tsv)$/,
                use: [
                    "csv-loader",
                ],
            },
            {
                test: /\.xml$/,
                use: [
                    "xml-loader",
                ],
            },
        ],
    },
};
