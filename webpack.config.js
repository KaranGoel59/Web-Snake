const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname,'src','index.js'),
    resolve: {
        alias: {
            config: path.resolve(__dirname,'src','config'),
            prefabs: path.resolve(__dirname,'src','prefabs'),
            scenes: path.resolve(__dirname,'src','scenes'),
            scripts: path.resolve(__dirname,'src','scripts') 
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                        {
                            loader: "html-loader",
                            options: {minimize: true}
                        }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules',
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname,'src','html','index.html'),
            filename: path.resolve(__dirname,'dist','index.html')
        }),
        new CopyWebpackPlugin([
            {from: path.resolve(__dirname, 'src','assets')}
        ]),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}