function Player(context){
  this.x = 16;
  this.y = 10;
  this.direction = 0;
  this.rotation = 0;
  this.speed = 0;
  this.moveSpeed = 0.18;
  this.rotSpeed = 6;
  this.ctx = context;
}

Player.prototype.move = function(map){
  var moveStep = this.speed * this.moveSpeed;
  this.rotation += this.direction * this.rotSpeed * Math.PI / 180;

  var newX = this.x + Math.cos(this.rotation) * moveStep;
  var newY = this.y + Math.sin(this.rotation) * moveStep;

  if (this.wallCheck(newX, this.y, map) <= 0) { this.x = newX; };
  if (this.wallCheck(this.x, newY, map) <= 0) { this.y = newY; };
}

// pass this in during gameplay loop
var scale = 12;

Player.prototype.draw = function(){
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(this.x * scale - 2, this.y * scale - 2, 4, 4);

  this.ctx.beginPath();
  this.ctx.moveTo(this.x * scale, this.y * scale);
  this.ctx.lineTo(
    (this.x + Math.cos(this.rotation) * 4) * scale,
    (this.y + Math.sin(this.rotation) * 4) * scale
  );
  this.ctx.closePath();
  this.ctx.stroke();
}

// need to un-tangle map and player into clean game class
Player.prototype.update = function(map){
  this.move(map);
  this.draw();
}

Player.prototype.wallCheck = function(x, y, map){
  return map.grid[Math.floor(y)][Math.floor(x)] > 0;
}

module.exports = Player;
