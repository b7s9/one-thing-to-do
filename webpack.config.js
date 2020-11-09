const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');

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
			{
				test: /\.(png|svg|jpg|gif|ico|woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader',
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			chunks: ['add'], // which entry point to use
			filename: 'add.html', // where/what to output
			template: path.join(__dirname, 'src/screens', 'add.html') // source file
		}),
		new HtmlWebpackPlugin({
			chunks: ['index'],
			filename: 'index.html',
			template: path.join(__dirname, 'src/screens', 'index.html')
		}),
		new GenerateSW({
			cacheId: 'one-thing-to-do',
			cleanupOutdatedCaches: true,
			sourcemap: true
		})
	]
};
