import _  = require('lodash');
import Board = require('board/board');
import io = require('socket.io-client');

class App {
	socket: any;
	userId: number;

	constructor () {
		this.socket = io('http://localhost:4444');
	}

	run () {
		this.socket.on('userid', (userId) => {
			this.userId = userId;
			this.buildBoard();
		});
	}

	buildBoard () {
		let stage = new createjs.Stage("board");
		let board = new Board.Board(stage, {userid: this.userId});

		board.build();

		let gridClicks = board.clicks;
		gridClicks.subscribe( (gridPoint) => {
			let obj = _.defaults({userId: this.userId}, gridPoint);
			this.socket.emit('gridclick', obj);
		});

		let firedMissles = Rx.Observable.fromEventPattern( (h) => {
			this.socket.on('misslefired',h);
		},undefined, undefined)
		.filter((fireData) => {
			return fireData.userId != userId;
		});

		board.setFiredMissles(firedMissles);
	}
}


let app = new App();
app.run();
