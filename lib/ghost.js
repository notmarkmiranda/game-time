const scale = 12;
const lifeSpans = [100, 150, 200, 250, 300, 350, 500];

function Ghost(options){
  this.x = getRandomPosition(options.map);
  this.y = getRandomPosition(options.map);
  this.tangible = options.tangible || true;
  this.lifeSpan = lifeSpans[Math.floor(Math.random() * lifeSpans.length)];
  this.ctx = options.ctx;
}

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

// move to GhostsController?
Ghost.prototype.draw = function(){
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(this.x * scale - 2, this.y * scale - 2, 4, 4);
}

// need to un-tangle map and player into clean game class
Ghost.prototype.update = function(player, map){
  this.chasePlayer(player.x, player.y, map);

  if (Math.floor(this.x) === Math.floor(player.x) && Math.floor(this.y) === Math.floor(player.y)) {
    player.pillCount -= 1;
  }

  // ugly basic fade in / fade out trick at roughly 5-sec intervals
  this.lifeSpan++;
  if (this.lifeSpan % (scale * scale) === 0) { this.tangible = !this.tangible };
  if (this.tangible) { this.draw(); } else { this.randomRelocate(map); };
}

// maybe should be a game method? since both Ghost and Player will need it?
Ghost.prototype.blockCheck = function(x, y, map){
  return map.grid[Math.floor(y)][Math.floor(x)];
}

Ghost.prototype.randomRelocate = function(map) {
  this.x = getRandomPosition(map);
  this.y = getRandomPosition(map);
}

function getRandomPosition(map) {
  return Math.floor(Math.random() * (map.height)) + 1;
}

module.exports = Ghost;
