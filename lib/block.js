function Block(options){
  this.x = options.x;
  this.y = options.y;
  this.type = options.type || 0;
}

Block.prototype.changeType = function(){
  this.type = 0;
}

module.exports = Block;
