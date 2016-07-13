const scale = 12;

var ghostImg = new Image();
ghostImg.src = "images/ghost.png";

function SuperGhost(options){
  this.x = 10;
  this.y = 5;
  this.ctx = options.ctx;
  this.gameEnd = false;

  this.opacity = 0.10;
  this.width = options.width || 15;
  this.height = options.height || 15;
  this.image = options.image || ghostImg;
}

SuperGhost.prototype.chasePlayer = function(playerX, playerY, map){
  let newIncrements = this.distanceToPlayer(playerX, playerY);
  let newX = newIncrements[0] / scale;
  let newY = newIncrements[1] / scale;

  this.x < playerX ? (this.x += newX) : (this.x -= newX);
  this.y < playerY ? (this.y += newY) : (this.y -= newY);


  if (Math.floor(this.x) === Math.floor(playerX) && Math.floor(this.y) === Math.floor(playerY)) {
    this.gameEnd = true;
    //old game end
  }
}

SuperGhost.prototype.distanceToPlayer = function(playerX, playerY){
    let distX = Math.abs(this.x - playerX);
    let distY = Math.abs(this.y - playerY);

    let alpha = Math.atan(distY / distX);

    let newX = Math.cos(alpha);
    let newY = Math.sin(alpha);

    return [newX, newY];
}

SuperGhost.prototype.fadeEffect = function(){
  let lastGlobalAlpha = this.ctx.globalAlpha;
  this.ctx.globalAlpha = this.opacity;
  this.draw();
  this.ctx.globalAlpha = lastGlobalAlpha;
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
  this.chasePlayer(player.x, player.y, map);
  this.draw();
}

// maybe should be a game method? since both SuperGhost and Player will need it?
SuperGhost.prototype.blockCheck = function(x, y, map){
  return map.grid[Math.floor(y)][Math.floor(x)];
}

module.exports = SuperGhost;
