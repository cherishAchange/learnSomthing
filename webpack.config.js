const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
	entry: {
		main: "./src/entry.js"
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loaders: ["babel-loader"],
				exclude: [path.join(__dirname, "node_modules", "js")]
			},{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
				exclude: [path.join(__dirname, "node_modules", "scss")]
			},{
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"],
                exclude: [path.join(__dirname, "node_modules", 'css')]
            }
		]
	},
	plugins: [
		//new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
            title: 'redux',
			template: './src/index.html',
            filename: 'index.html',
            hash: false
		})
	]
}