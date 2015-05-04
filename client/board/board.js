/// <reference path="../../typings/lodah/lodash.d.ts" />
/// <reference path="../../typings/easeljs/easeljs.d.ts" />

var _ = require('lodash');
var createjs = require('exports?createjs!../lib/easel')
var rx = require('rx');
require('../lib/tween');


function Board(elem, options) {
  var defaults = {
      width: 500,
      height: 500
  };
  var self = this;


  this.options = _.defaults(defaults, options);
  this.elem = elem;
  this.stage = new createjs.Stage("board");
  this.clicks = rx.Observable.fromEventPattern(
    function add(h) {
      self.stage.addEventListener('click', h)
    }
  ).throttleFirst(2000);

  this.gridClicks = this.clicks.map(mouseEventToGrid);
  this.gridClicks.subscribe(function(gridPoint) {
    self.handleClick(gridPoint);
  });

  createjs.Ticker.addEventListener("tick", this.stage);
}

Board.prototype.build = function () {
  drawBoard(this.stage);
  drawGrid(this.stage);
};


Board.prototype.handleClick = function (gridPoint){
  var bang = new createjs.Shape();
  bang.graphics.setStrokeStyle(2).beginStroke('#246').drawCircle(0,0, 1);
  bang.x = gridPoint.x * 25 + 12.5;
  bang.y = gridPoint.y * 25 + 12.5;
  
  this.stage.addChild(bang);
  
  createjs.Tween.get(bang).to({scaleX: 5, scaleY: 5}, 1000);
};

Board.prototype.setFiredMissles = function (stream) {
  var self = this;
  stream.subscribe(function (gridPoint) {
    console.log('Ive been shot at!');
    var bang = new createjs.Shape();
    bang.graphics.setStrokeStyle(2).beginStroke('#f00').drawCircle(0,0, 1);
    bang.x = gridPoint.x * 25 + 12.5;
    bang.y = gridPoint.y * 25 + 12.5;
    
    self.stage.addChild(bang);
    
    createjs.Tween.get(bang).to({scaleX: 5, scaleY: 5}, 1000);
  });
};

function mouseEventToGrid(mouseEvent) {
  var gridPoint = {};
  gridPoint.x = Math.floor(mouseEvent.stageX / 25);
  gridPoint.y = Math.floor(mouseEvent.stageY / 25);
  return gridPoint;
}


function drawBoard(canvasStage) {
  var backgroundRect = new createjs.Shape();
  backgroundRect.graphics.beginFill('#eee').drawRect(0,0, 350, 350);
  canvasStage.addChild(backgroundRect);
}

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
  graphics.beginStroke('777').moveTo(startX, 0).lineTo(startX, 350);
  var myLine = new createjs.Shape(graphics);

  canvasStage.addChild(myLine);

  graphics.moveTo(0, startX).lineTo(350, startX);
  var vLine = new createjs.Shape(graphics);

  canvasStage.addChild(vLine);
}

module.exports = Board;
