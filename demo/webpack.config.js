/* 
* @Author: RainCloud
* @Date:   2018-01-17 11:43:35
* @Last Modified by:   RainCloud
* @Last Modified time: 2018-01-17 17:30:24
*/
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require('path');

module.exports = {
        entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
        output: {
            path: __dirname + "/dist",
            filename: "bundle.js"
            //filename: "bundle-[hash].js"    怎么在模板引用hash的js？
        },
        devtool: 'none',
        //devtool: 'eval-source-map',
        devServer: {
            contentBase: "./public", //本地服务器所加载的页面所在的目录
            historyApiFallback: true, //不跳转
            inline: true, //实时刷新
            hot: true
        },
        module: {
            rules: [
            	{
                    test: /(\.jsx|\.js)$/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                        	{
                            	loader: "css-loader",
                            	options: {
                                	modules: true,
                                	localIdentName: '[name]__[local]--[hash:base64:5]'
                            	}
                        	}, 
                        	{
                            	loader: "postcss-loader",
					            options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
					                plugins: (loader) => [
					                    require('autoprefixer')(), //CSS浏览器兼容
					                ]
					            }
                        	}
                        ],
                    })
                }
            
        	]
    },
    plugins: [
        //new webpack.BannerPlugin(),
        new HtmlWebpackPlugin({template: './public/index.html'}),
        //new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new CleanWebpackPlugin('build/*.*', {
		      root: __dirname,
		      verbose: true,
		      dry: false
		}),
        new ExtractTextPlugin("style.css")
    ]
};

