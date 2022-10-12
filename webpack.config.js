const path = require("path");

module.exports = {
    mode: process.env.mode,
    devtool: "inline-source-map",
    entry: "./src/index.js",
    target: "web",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./js/bundle.min.js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".js"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        open: true,
        port: 3000,
    },
};
