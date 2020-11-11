const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const CopyPlugin = require('copy-webpack-plugin');

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
		filename: 'js/[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
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
				test: /\.(png|svg|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					name: 'images/[name].[contenthash].[ext]'
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[contenthash].[ext]'
				}
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
		new CopyPlugin({
			patterns: [
				{ from: 'static', to: 'static' }
			]
		}),
		new WebpackPwaManifest({
			name: 'One Thing to Do',
			short_name: 'One Thing',
			description: 'Remove anxiety from your todo list',
			background_color: '#ffffff',
			theme_color: '#ffffff',
			display: 'standalone',
			crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
			orientation: 'portrait-primary',
			icons: [
				{
					src: path.join(__dirname, 'src/style/icons/', 'android-chrome-192x192.png'),
					destination: 'icons/',
					sizes: [96, 128, 192] // multiple sizes
				},
				{
					src: path.join(__dirname, 'src/style/icons/', 'android-chrome-512x512.png'),
					destination: 'icons/',
					sizes: [256, 384, 512] // multiple sizes
				}
			]
		}),
		new GenerateSW({
			cacheId: 'one-thing-to-do',
			cleanupOutdatedCaches: true,
			sourcemap: true
		})
	]
};
