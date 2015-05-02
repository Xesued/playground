/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts" />


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Rx = require('rx');


server.listen(4444);

app.use(express.static(__dirname + '/public'));
// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

io.on('connection', function (socket) {
  var socketOn = Rx.Observable.fromEventPattern(function (h){ socket.on('my other event',h);});

  var subscription = socketOn.subscribe(function(data){
    console.log('New method');
    console.log(data);
  });
});
