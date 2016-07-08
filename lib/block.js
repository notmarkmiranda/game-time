function Block(options){
  this.x = options.x;
  this.y = options.y;
  this.type = options.type;
}

Block.prototype.changeType = function(){
  this.type = 0;
}

module.exports = Block;
