/**
 * Created by Administrator on 2017/5/19 0019.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name].js',                           //出口文件名
        //publicPath: '/assets/',
        path: path.resolve(__dirname, './dist'),         //出口路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',             //使用babel-loader
                    options: {
                        presets: ['env'],
                        plugins: ['transform-object-assign',]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',              //模板
            template: './src/index.html',        //文件名
            minify: {
                removeComments: true,           //去除注释
                collapseWhitespace: true,       //去除空格
        }
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        clientLogLevel: "none",
        compress: true,
        port: 9000
    }
}



















































