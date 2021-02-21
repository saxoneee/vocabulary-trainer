var path = require('path'),
	webpack = require('webpack'),
	{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

var _webpackCfg = {
	mode: 'development',
	entry: './src/ts/main.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
	},

	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		},{
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

	resolve: {
        extensions: ['.tsx', '.ts', '.js'],
		alias: {
            vue: 'vue/dist/vue.js'
        },
    },

	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new HtmlWebpackPlugin({
			template: './src/view/index.html'
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: 'styles.css',
				to: './css',
				context: './src/css'
			},{
				from: './node_modules/vue/dist/vue.min.js',
				to: './vue/dist'
			},{
				from: './node_modules/jquery/dist/jquery.min.js',
				to: './jquery/dist'
			},{
				context: './src/data',
				from: '*.json',
				to: './data'
			},{
				context: './src/view',
				from: '*.html',
				to: './view'
			},{
				from: './src/php',
				to: './api'
			}
		]
		})
	]
};


module.exports = _webpackCfg;

