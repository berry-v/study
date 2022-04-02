const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        index: path.join(__dirname, '../src/vue/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        modules: [
            resolve('src'),
            resolve('node_modules'),
        ],
        extensions: ['.js', '.vue', '.json'],
        alias: {
            // vue$: 'vue/dist/vue.esm.js',
            vue: 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // chunks: 'dist/js/index',
            template: './src/vue/index.html',
            filename: path.resolve(__dirname, 'dist/index.html')
        })
    ],
    devServer: {
        port: 8080,
        open: true
    }
}
