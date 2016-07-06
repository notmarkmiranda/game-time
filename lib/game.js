const Map = require('./map');
const Player = require('./player');

function Game(options){
  this.ctx = options.ctx;
  this.map = new Map({
    ctx: options.ctx,
    width: options.width,
    height: options.height
  });
  this.player = new Player({ctx: this.ctx});
}

Game.prototype.initialSetup = function(){
  this.map.draw();
  this.player.draw();

  // if(rightPressed && this.player.x < this.ctx.width - this.player.width) {
  //     this.player.rotate(1.5);
  // }
  // else if(leftPressed && this.player.x > 0) {
  //     this.player.rotate(-1.5);
  // }
  // else if(upPressed && this.player.y > this.ctx.height - this.player.height) {
  //     this.player.y -= 2;
  // }
  // else if(downPressed && this.player.y > 0) {
  //     this.player.y += 2;
  // }
}

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}

module.exports = Game;
