// import _ from 'lodash';
// import {Board} from './board/board.ts';
// import {io} from 'socket.io-client';
var App = (function () {
    function App() {
        this.socket = io('http://localhost:4444');
    }
    App.prototype.run = function () {
        var _this = this;
        socket.on('userid', function (userid) {
            _this.userId = userId;
            _this.buildBoard();
        });
    };
    App.prototype.buildBoard = function () {
        var stage, board, gridClicks, firedMissles;
        stage = new createjs.Stage("board");
        board = new Board(stage, { userid: userId });
        board.build();
        gridClicks = board.clicks;
        gridClicks.subscribe(function (gridPoint) {
            var obj = _.defaults({ userId: userId }, gridPoint);
            socket.emit('gridclick', obj);
        });
        firedMissles = Rx.Observable.fromEventPattern(function (h) {
            socket.on('misslefired', h);
        })
            .filter(function (fireData) {
            return fireData.userId != userId;
        });
        board.setFiredMissles(firedMissles);
    };
    return App;
})();
var app = new App();
app.run();
//# sourceMappingURL=entry.js.map