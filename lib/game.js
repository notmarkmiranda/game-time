const Player = require('./player');

function Game(options){
  this.ctx = options.ctx;
  this.player = new Player({ctx: this.ctx});
}

Game.prototype.initialSetup = function(){
  this.player.draw();

  if(rightPressed && this.player.x < canvas.width - this.player.width) {
      this.player.rotate(1.5);
  }
  else if(leftPressed && this.player.x > 0) {
      this.player.rotate(-1.5);
  }
  else if(upPressed && this.player.y < canvas.height - this.player.height) {
      this.player.y -= 2;
  }
  else if(downPressed && this.player.y > 0) {
      this.player.y += 2;
  }
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
