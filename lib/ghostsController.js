function GhostsController(options){
  this.ghosts = options.ghosts;
  this.ctx = options.ctx;
}

GhostsController.prototype.drawGhosts = function(){
  for (ghost in this.ghosts) {
    ghost.chasePlayer(player.x, player.y, map);
    // this.duplicateCheck();
    // timer for ghost (increase existince count on each draw loop?)
    ghost.draw();
  }
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
