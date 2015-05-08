/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** ./client/entry.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

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

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map