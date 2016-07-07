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

  var dx = Math.cos(this.player.angle);
  var dy = Math.sin(this.player.angle);

  if(rightPressed && this.player.x < this.ctx.canvas.width - this.player.width) {
    if(this.player.angle === 359){
      this.player.angle = 0;
    } else {
      this.player.angle += 1;
    }
  };

  if(leftPressed && this.player.x > 0) {
    if(this.player.angle === 0){
      this.player.angle = 359;
    } else {
      this.player.angle -= 1;
    }
  };

  if(upPressed && this.player.y > 0) {
    this.player.x += dx;
    this.player.y += dy;
  };

  if(downPressed && this.player.y < this.ctx.canvas.height - this.player.height) {
    this.player.x -= dx;
    this.player.y -= dy;
  };
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
