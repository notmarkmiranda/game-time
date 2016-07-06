function Player(options){
  this.x = options.x || 10;
  this.y = options.y || 10;
  this.height = options.height || 10;
  this.width = options.width || 10;
  this.ctx = options.ctx;
};

Player.prototype.rotate = function(change) {
  var transX = this.x + (0.5 * this.width);
  var transY = this.y + (0.5 * this.height);
  this.ctx.translate(transX, transY); // translate to rectangle center
                              // transX = x + 0.5 * width
                              // transY = y + 0.5 * height
  this.ctx.rotate((Math.PI / 180) * change); // rotate
  this.ctx.translate(-transX, -transY); // translate back
};

Player.prototype.draw = function(){
  this.ctx.fillStyle = "#FF0000";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Player;
