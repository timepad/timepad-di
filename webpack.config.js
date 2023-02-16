const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'timepad-di.js',
        library: 'timepadDI',
        libraryTarget: 'umd',
    },
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
        ],
    },
};
