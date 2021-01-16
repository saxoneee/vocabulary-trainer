var path = require('path'),
	webpack = require('webpack'),
	{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

var _webpackCfg = {
	mode: 'development',
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
	},

	module: {
		rules: [{
			test: /\.css$/i,
			use: ["style-loader", "css-loader"],
		},{
			test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/i,
			use: ['file-loader']
		},{
			test: require.resolve('jquery'),
			use: [{
				loader: 'expose-loader',
				options: {
					exposes: ['$', 'jQuery']
				}
			}]
		}
	]},

	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new HtmlWebpackPlugin({
			template: './src/html/index.html'
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: './src/js/main.js',
				to: './js'
			},{
				from: './src/js/base/ns.js',
				to: './js/base'
			},{
				from: './src/js/utils/ajax.js',
				to: './js/utils'
			},{
				from: './src/js/utils/number.js',
				to: './js/utils'
			},{
				from: './src/css/styles.css',
				to: './css'
			},{
				from: './node_modules/vue/dist/vue.min.js',
				to: './vue/dist'
			},{
				from: './node_modules/jquery/dist/jquery.min.js',
				to: './jquery/dist'
			},{
				from: './src/data/data.json',
				to: './data'
			},{
				from: './src/php',
				to: './api'
			}
		]
		})
	]
};


module.exports = _webpackCfg;

