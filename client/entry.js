var $ = require('jquery');
var Board = require('./board/board');

var board = new Board($('#board'));
board.build();
