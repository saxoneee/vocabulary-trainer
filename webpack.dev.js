var path = require('path'),
	{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin');

class PhpServerWebpackPlugin {
	phpServerCfg;
	
	constructor(cfg) {
		this.phpServerCfg = cfg;
	}

	apply(compiler) {
		// Specify the event hook to attach to
		compiler.hooks.emit.tapAsync('PhpServerWebpackPlugin',(compilation, callback) => {
			const phpServer = require('php-server');
			
			(async () => {
				const server = await phpServer(this.phpServerCfg);
				console.log(`PHP server running at ${server.url}`)
			})();
		
			callback();
		});
	}
}

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
	},

	devServer: {
		open: false,
		contentBase: [
			path.join(__dirname, 'src'),
			path.join(__dirname, 'node_modules'),
		],
		port: 8000,
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
			}
		]
		}),
		new PhpServerWebpackPlugin({
			hostname: '127.0.0.1',
			port: '8008',
			base: 'src/php',
			router: 'server.php'
		})
	]
};
