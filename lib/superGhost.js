const scale = 12;

const ghostImg = new Image();
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
};

SuperGhost.prototype.chasePlayer = function(playerX, playerY){
  let newIncrements = this.distanceToPlayer(playerX, playerY),
      newX = newIncrements[0] / (scale - this.speed),
      newY = newIncrements[1] / (scale - this.speed);

  this.x < playerX ? (this.x += newX) : (this.x -= newX);
  this.y < playerY ? (this.y += newY) : (this.y -= newY);
};

SuperGhost.prototype.distanceToPlayer = function(playerX, playerY){
    let distX = Math.abs(this.x - playerX),
        distY = Math.abs(this.y - playerY),
        alpha = Math.atan(distY / distX),
        newX = Math.cos(alpha),
        newY = Math.sin(alpha);

    return [newX, newY];
};

SuperGhost.prototype.draw = function(){
  this.ctx.drawImage(
    this.image,
    0,
    0,
    this.width,
    this.height,
    this.x * scale - 2,
    this.y * scale - 2,
    // increases size compared to normal ghost
    this.width * 1.5,
    this.height * 1.5);
};

SuperGhost.prototype.update = function(player, map){
  this.opacity += 0.05;
  this.speed += 0.005;
  this.chasePlayer(player.x, player.y, map);
  this.draw();
  this.collisionCheck(player.x, player.y);
};

SuperGhost.prototype.collisionCheck = function(playerX, playerY){
  let x = Math.floor(this.x),
      y = Math.floor(this.y),
      pX = Math.floor(playerX),
      pY = Math.floor(playerY);

  if (matchingPositions(x, y, pX, pY)) { this.gameEnd = true; };
};

function matchingPositions(x1, y1, x2, y2){
  if (x1 === x2 && y1 === y2) { return true; };
};

module.exports = SuperGhost;
