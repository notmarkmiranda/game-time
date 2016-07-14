const scale = 12;

var ghostImg = new Image();
ghostImg.src = "images/ghost.png";

function SuperGhost(options){
  this.x = 10;
  this.y = 5;
  this.ctx = options.ctx;
  this.gameEnd = false;
  this.speed = 0;

  this.opacity = 0.10;
  this.width = options.width || 15;
  this.height = options.height || 15;
  this.image = options.image || ghostImg;
}

SuperGhost.prototype.chasePlayer = function(playerX, playerY, map){
  let newIncrements = this.distanceToPlayer(playerX, playerY);
  let newX = newIncrements[0] / (scale - this.speed);
  let newY = newIncrements[1] / (scale - this.speed);

  this.x < playerX ? (this.x += newX) : (this.x -= newX);
  this.y < playerY ? (this.y += newY) : (this.y -= newY);

  // if (Math.floor(this.x) === Math.floor(playerX) && Math.floor(this.y) === Math.floor(playerY)) {
  //   this.gameEnd = true;
  //   //old game end
  // }
}

SuperGhost.prototype.distanceToPlayer = function(playerX, playerY){
    let distX = Math.abs(this.x - playerX);
    let distY = Math.abs(this.y - playerY);

    let alpha = Math.atan(distY / distX);

    let newX = Math.cos(alpha);
    let newY = Math.sin(alpha);

    return [newX, newY];
}

SuperGhost.prototype.draw = function(){
  this.ctx.drawImage(
    this.image,
    0,
    0,
    this.width,
    this.height,
    this.x * scale - 2,
    this.y * scale - 2,
    this.width * 2,
    this.height * 2);
}

// need to un-tangle map and player into clean game class
SuperGhost.prototype.update = function(player, map){
  this.opacity += 0.05;
  this.speed += 0.005;
  this.chasePlayer(player.x, player.y, map);
  this.draw();
  this.collisionCheck(player.x, player.y);
}

SuperGhost.prototype.collisionCheck = function(playerX, playerY){
  let x = Math.floor(this.x);
  let y = Math.floor(this.y);
  let pX = Math.floor(playerX);
  let pY = Math.floor(playerY);

  if (x === pX && y === pY) {
    this.gameEnd = true;
  }
}

module.exports = SuperGhost;
