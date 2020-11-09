const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		publicPath: '/dist/',
		hot: true,
		open: 'Firefox Developer Edition',
		serveIndex: true
	},
	entry: {
		index: ['./src/js/index.js'],
		add: ['./src/js/add.js']
	},
	output: {
		filename: 'assets/js/[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			chunks: ['add'], // which entry point to use
			filename: 'screens/add.html', // where/what to output
			template: path.join(__dirname, 'src/screens', 'add.html') // source file
		}),
		new HtmlWebpackPlugin({
			chunks: ['index'],
			filename: 'screens/index.html',
			template: path.join(__dirname, 'src/screens', 'index.html')
		}),
		new GenerateSW()
	]
};
