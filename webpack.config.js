const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPligin = require('clean-webpack-plugin');
module.exports = {
	entry: {
		main: "./src/entry.js"
	},
	output: {
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/',
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
		//new CleanWebpackPligin(['dist']),
		//new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: 'redux',
			template: './src/index.html',
			filename: 'index.html',
			hash: true
		})
	]
}