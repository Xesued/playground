var _ = require('lodash');
var createjs = require('exports?createjs!../lib/easel');

function Board(elem, options) {
  var defaults = {
      width: 500,
      height: 500
  };

  this.options = _.defaults(defaults, options);
  this.elem = elem;
  this.stage = new createjs.Stage("board");

  createjs.Ticker.addEventListener("tick", handleTick);
  var self = this;
  function handleTick(event) {
    self.stage.update();
  };
}

Board.prototype.build = function () {
  drawGrid(this.stage);
};

function drawGrid(canvasStage) {
    var GRID_SIZE = 15,
      currentGrid = 0;

    for(currentGrid = 0; currentGrid < GRID_SIZE; currentGrid++ ){
      drawGridLines(canvasStage, currentGrid);
    }
}

function drawGridLines(canvasStage, lineNumber) {
  var graphics = new createjs.Graphics();
  var startX = lineNumber * 25;
  graphics.beginStroke('red').moveTo(startX, 0).lineTo(startX, 500);
  var myLine = new createjs.Shape(graphics);

  console.log('adding line');
  canvasStage.addChild(myLine);

  var vgraphics = new createjs.Graphics();
  vgraphics.beginStroke('blue').moveTo(0, startX).lineTo(500, startX);
  var vLine = new createjs.Shape(vgraphics);

  console.log('adding v line');
  canvasStage.addChild(vLine);
}

module.exports = Board;
