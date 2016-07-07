function Player(options){
  this.x = options.x || 10;
  this.y = options.y || 10;
  this.angle = options.angle || 0;

  this.direction = options.direction || 0;

  this.height = options.height || 10;
  this.width = options.width || 10;

  this.ctx = options.ctx;
};

Player.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, (this.width / 2), 0, Math.PI*2);
  this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
  this.ctx.rotate(this.angle * Math.PI / 180);
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
};

module.exports = Player;
