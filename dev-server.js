const path = require('path');
const http = require('http');
const fs = require('fs');
const config = require('./webpack.config.js');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const port = 8008;
const options = {
	contentBase: './dist',
	hot: true,
	host: 'localhost',
	quiet: true,
	stats: {
		colors: true
	}
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(port, 'localhost', function(data){
	console.log('data', data);
});

server.use('/', function(req, res, next){
	console.log(req.url);
	fs.readFile('./source/response.json', function(err, data){
		if(err){
			res.writeHead(404, {"Content-Type": "text/javascript"});
		}else{
			res.writeHead(200, {"Content-Type": "text/javascript"});
			res.write(JSON.stringify(data));
		}
		res.end();
	})
});
server.listen(port);

console.log('服务启动在8008端口');