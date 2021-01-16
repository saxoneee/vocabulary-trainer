// enrich webpack cfg for development

var path = require('path'),
    webpackBuildCfg = require('./webpack.build.js');

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

webpackBuildCfg.devServer = {
    open: false,
    port: 8000,
    proxy: {
        '/api': 'http://localhost:8008'
    }
};
		
webpackBuildCfg.plugins.push(new PhpServerWebpackPlugin({
    hostname: '127.0.0.1',
    port: '8008',
    base: 'src/php',
    router: 'server.php'
}));

module.exports = webpackBuildCfg;
