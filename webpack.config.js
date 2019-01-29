const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd"
    },
    target: "node",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                query: {
                    declaration: false
                }
            }
        ]
    },
    externals: [nodeExternals({
        whitelist: [/apollo/, /\.s?css$/]
    })]
};
