var path = require('path'),
	{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin');

var _webpackCfg = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
	},

	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: './src/index.html',
				to: './'
			},{
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

