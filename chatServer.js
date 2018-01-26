var http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');

WebpackDevMiddleware(compiler, {
  noInfo: false, 
  publicPath: webpackConfig.output.publicPath
});

WebpackHotMiddleware(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
});
console.log('00000000000')
console.log('publicPath', webpackConfig.output.publicPath);
console.log('00000000000')
console.log('__dirname', __dirname);
console.log('00000000000')

//lianjie db
function validateLogin(req, res){
  var MongoClient = require('mongodb').MongoClient;
  var DB_CONN_STR = 'mongodb://localhost:27017/login';
   
  var selectData = function(db, callback) {  
      //连接到表 site
      var collection = db.collection('site');
      //插入数据
      var data = {"usename":"taibowen","password": 123456};
      collection.find(data).toArray(function(err, result) {
        if(err)
        {
          console.log('Error:'+ err);
          return;
        }     
        callback(result);
      });
  }
  MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功啦！");
    selectData(db, function(result) {
        console.log(typeof result);
        res.writeHead(200);
        res.end(JSON.stringify({loging: true}));
        db.close();
    });
  });
}

var server = http.createServer(handler);

function handler (req, res) {
    if(req.url === '/'){
      console.log('读取起源')
        fs.readFile(__dirname, '/dist/index.html',
        function (err, data) {
          if (err) {
            res.writeHead(400);
            return res.end('Error loading index.html');
          }
          res.writeHead(200);
          res.end(data);
        });
    }else if(req.url.indexOf('main') >= 0){
        fs.readFile(__dirname + '/dist/' + req.url,
        function (err, data) {
          if (err) {
            res.writeHead(400);
            return res.end('Error loading index.html');
          }
          res.writeHead(200);
          res.end(data);
        });
    }else if(req.url === '/validate'){
      validateLogin(req, res);
    }
}

server.listen(3333);

const io = socketIo.listen(server);

io.sockets.on('connection', function (socket) {
    // new user login
      socket.on('login', function (nickname) {
        if (users.indexOf(nickname) > -1) {
          socket.emit('nickExisted', nickname, users);
        } else {
            // socket.userIndex = users.length;
          socket.nickname = nickname;
          users.push(nickname);
          socket.emit('loginSuccess', nickname, users);
          io.sockets.emit('system', nickname, users, 'login');
        }
      });
    // user leaves
      socket.on('disconnect', function () {
        if (socket.nickname != null) {
            // users.splice(socket.userIndex, 1);
          users.splice(users.indexOf(socket.nickname), 1);
          socket.broadcast.emit('system', socket.nickname, users, 'logout');
        }
      });
    // new message get
      socket.on('postMsg', function (msg, color) {
        console.log('name',msg)
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
      });
    // new image get
      socket.on('img', function (imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color);
      });
    }
);

console.log('聊天室服务开启');