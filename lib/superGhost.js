const scale = 12;

function SuperGhost(options){
  this.x = 10;
  this.y = 5;
  this.ctx = options.ctx;
}

SuperGhost.prototype.chasePlayer = function(playerX, playerY, map){
  let newIncrements = this.distanceToPlayer(playerX, playerY);
  let newX = newIncrements[0] / scale;
  let newY = newIncrements[1] / scale;

  this.x < playerX ? (this.x += newX) : (this.x -= newX);
  this.y < playerY ? (this.y += newY) : (this.y -= newY);

  if (Math.floor(this.x) === Math.floor(playerX) && Math.floor(this.y) === Math.floor(playerY)) {
    console.log("You Lose!");
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

// move to SuperGhostsController?
SuperGhost.prototype.draw = function(){
  this.ctx.fillStyle = "blue";
  this.ctx.fillRect(this.x * scale - 2, this.y * scale - 2, 4, 4);
}

// need to un-tangle map and player into clean game class
SuperGhost.prototype.update = function(player, map){
  this.chasePlayer(player.x, player.y, map);
  this.draw();
}

// maybe should be a game method? since both SuperGhost and Player will need it?
SuperGhost.prototype.blockCheck = function(x, y, map){
  return map.grid[Math.floor(y)][Math.floor(x)];
}

module.exports = SuperGhost;
