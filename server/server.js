/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts" />


var _ = require('lodash');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Rx = require('rx');


server.listen(4444);

app.use(express.static(__dirname + '/public'));


var userSockets = {};

io.on('connection', function (socket) {
  var userId = generateId();
  console.log('Someone connected. Generating user ID:' + userId);
  socket.emit('userid', userId);
  userSockets[userId] = socket;
  
  var socketOn = Rx.Observable.fromEventPattern(function (h){ socket.on('gridclick',h);});

  socketOn.subscribe(function(data){
    console.log('Emiting a fired missle!' + data.userId);
    fireMissle(data);
  });
});

var currentId = 0;
function generateId() {
  return currentId++;
};

function fireMissle(data){
  _.forEach(userSockets, function(userSocket, userId) {
    userSocket.emit('misslefired', data);
  });
};