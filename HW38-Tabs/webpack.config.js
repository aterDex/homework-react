const path = require('path');

module.exports = {
    mode: 'development', // "production" | "development" | "none"
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js',
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            debug: true,
                            corejs: 3,
                            useBuiltIns: "usage"
                        }]]
                    }
                }
            }
        ]
    }
};