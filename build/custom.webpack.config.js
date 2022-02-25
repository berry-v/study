const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        index: path.join(__dirname, '../src/custom/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // chunks: 'dist/js/index',
            template: './src/custom/index.html',
            filename: path.resolve(__dirname, 'dist/index.html')
        })
    ],
    // devServer: {
    //     port: 8080,
    //     open: true
    // }
}
