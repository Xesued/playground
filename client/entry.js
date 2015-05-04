/* global io */
/// <reference path="../typings/rx/rx.all.d.ts" />
/// <reference path="../typings/socket.io-client/socket.io-client.d.ts" />

var _ = require('lodash');
var Rx = require('rx');
var $ = require('jquery');
var Board = require('./board/board');


var socket = io('http://localhost:4444');
var userId;
socket.on('userid', function (userid) {
	console.log('Got user id:' + userid);
	userId = userid;
	buildBoard();
});


function buildBoard () {
	var board = new Board($('#board'), {userid: userId});
	board.build();
	
	
	var gridClicks = board.gridClicks;
	gridClicks.subscribe(function (gridPoint) {
		var obj = _.defaults({userId: userId}, gridPoint);
		socket.emit('gridclick', obj);
	});
	

	// Listen to socket events....
	var firedMissles = Rx.Observable.fromEventPattern(
		function (h){ socket.on('misslefired',h);
	}).filter(function(fireData) {
		return fireData.userId != userId;
	});
	
	board.setFiredMissles(firedMissles);

}