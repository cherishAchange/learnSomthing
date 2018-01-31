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
		colors: false
	}
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(port, 'localhost', function(data){
	console.log('data', data);
});

server.use('/', function(req, res, next){
  console.log('dizhi', req.url);
  if(req.url.indexOf('/api') === 0){
    let path = req.url.slice(4, req.url.length);
    fs.readFile(`./src/data/${path}.json`, function(err, data){
      if(err){
        res.writeHead(404, {"Content-Type": "application/json"});
      }else{
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(data));
      }
      res.end();
    })
  }
});
server.listen(port);

console.log('服务启动在8008端口');