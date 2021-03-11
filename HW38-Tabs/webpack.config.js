const path = require('path');

module.exports = {
    mode: 'development', // "production" | "development" | "none"
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js',
    },
};