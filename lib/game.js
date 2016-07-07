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
  var movement = 2
  if(rightPressed && this.player.x < this.ctx.canvas.width - this.player.width) {
    checkCollisions(this, "right")
  } else if(leftPressed && this.player.x > 0) {
    checkCollisions(this, "left")
  } else if(upPressed && this.player.y > 0) {
    checkCollisions(this, "up")
    // this.player.y -= 2;
  } else if(downPressed && this.player.y < this.ctx.canvas.height - this.player.height) {
    checkCollisions(this, "down")
    // this.player.y += 2;
  }
}

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function checkCollisions(options, direction){
  if(direction === "right"){
    var right_bottom = [Math.floor((options.player.x + options.player.width)/options.player.width), Math.floor((options.player.y + (options.player.height/2))/options.player.width)]
    if (options.map.wallGrid[right_bottom[1]][right_bottom[0]] === 0){
      options.player.x += 2
    }
  } else if(direction === "left"){
    var left_middle = [Math.floor(options.player.x/options.player.width), Math.floor((options.player.y + (options.player.height/2))/options.player.height)]
    if (options.map.wallGrid[left_middle[1]][left_middle[0]] === 0){
      options.player.x -= 2
    }
  } else if(direction === "up"){
    var top_middle = [Math.floor((options.player.x + (options.player.width/2))/options.player.width), Math.floor(options.player.y/options.player.height)]
    if (options.map.wallGrid[top_middle[1]][top_middle[0]] === 0){
      options.player.y -= 2
    }
  } else if(direction === "down"){
    var bottom_middle = [Math.floor((options.player.x + (options.player.width/2))/options.player.width), Math.floor((options.player.y + options.player.height)/options.player.height)]
    if (options.map.wallGrid[bottom_middle[1]][bottom_middle[0]] === 0){
      options.player.y += 2
    }
  }
}

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
