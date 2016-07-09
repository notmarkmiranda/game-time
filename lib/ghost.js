function Ghost(options){
  this.x = options.x;
  this.y = options.y;
  this.ctx = options.ctx;
}

const scale = 12;

Ghost.prototype.chasePlayer = function(playerX, playerY, map){
  let newIncrements = this.distanceToPlayer(playerX, playerY);
  let newX = newIncrements[0] / scale;
  let newY = newIncrements[1] / scale;

  this.x < playerX ? (this.x += newX) : (this.x -= newX);
  this.y < playerY ? (this.y += newY) : (this.y -= newY);
}

Ghost.prototype.distanceToPlayer = function(playerX, playerY){
    let distX = Math.abs(this.x - playerX);
    let distY = Math.abs(this.y - playerY);

    let alpha = Math.atan(distY / distX);

    let newX = Math.cos(alpha);
    let newY = Math.sin(alpha);

    return [newX, newY];
}

Ghost.prototype.draw = function(){
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(this.x * scale - 2, this.y * scale - 2, 4, 4);
}

// need to un-tangle map and player into clean game class
Ghost.prototype.update = function(player, map){
  this.chasePlayer(player.x, player.y, map);
  this.draw();
}

Ghost.prototype.blockCheck = function(x, y, map){
  return map.grid[Math.floor(y)][Math.floor(x)];
}

module.exports = Ghost;
