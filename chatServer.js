var http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');

var server = http.createServer(handler);

function handler (req, res) {
    if(req.url === '/'){
        fs.readFile(__dirname + '/dist/index.html',
        function (err, data) {
          if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
          }
          res.writeHead(200);
          res.end(data);
        });
    }else if(req.url.indexOf('main') >= 0){
        fs.readFile(__dirname + '/dist/' + req.url,
        function (err, data) {
          if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
          }
          res.writeHead(200);
          res.end(data);
        });
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