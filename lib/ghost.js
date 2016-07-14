const scale = 12;
const lifeSpans = [100, 150, 200, 250, 300, 350, 500];

function Image(){};
const ghostImg = new Image();
ghostImg.src = "images/ghost.png";

function Ghost(options){
  this.x = getRandomPosition(options.map);
  this.y = getRandomPosition(options.map);
  this.lifeSpan = lifeSpans[Math.floor(Math.random() * lifeSpans.length)];
  this.ctx = options.ctx;

  this.opacity = 0.10;
  this.width = options.width || 15;
  this.height = options.height || 15;
  this.image = options.image || ghostImg;
};

Ghost.prototype.chasePlayer = function(playerX, playerY){
  let newIncrements = this.distanceToPlayer(playerX, playerY),
      newX = newIncrements[0] / scale,
      newY = newIncrements[1] / scale;

  this.x < playerX ? (this.x += newX) : (this.x -= newX);
  this.y < playerY ? (this.y += newY) : (this.y -= newY);
}

Ghost.prototype.distanceToPlayer = function(playerX, playerY){
  let distX = Math.abs(this.x - playerX),
      distY = Math.abs(this.y - playerY),
      alpha = Math.atan(distY / distX),
      newX = Math.cos(alpha),
      newY = Math.sin(alpha);

  return [newX, newY];
};

Ghost.prototype.addFade = function(){
  let lastGlobalAlpha = this.ctx.globalAlpha;
  this.ctx.globalAlpha = this.opacity;
  this.draw();
  this.ctx.globalAlpha = lastGlobalAlpha;
};

Ghost.prototype.draw = function(){
  this.ctx.drawImage(
    this.image,
    0,
    0,
    this.width,
    this.height,
    this.x * scale - 2,
    this.y * scale - 2,
    this.width,
    this.height);
};

Ghost.prototype.update = function(player, map){
  this.chasePlayer(player.x, player.y, map);
  this.lifeSpan++;
  this.fadeEffects(player, map);
};

Ghost.prototype.fadeEffects = function(player, map){
  if (this.lifeSpan % (scale * scale) === 0) {
    this.opacity = 0.5;
    this.addFade();

    this.opacity = 0.25;
    this.addFade();

    this.randomRelocate(map);
    this.opacity = 0.05;
  } else {
    this.opacity += 0.05;
    this.addFade();
    this.collisionCheck(player, map);
  };
};

Ghost.prototype.randomRelocate = function(map) {
  this.x = getRandomPosition(map);
  this.y = getRandomPosition(map);
};

Ghost.prototype.collisionCheck = function(player, map){
  let x = Math.floor(this.x),
      y = Math.floor(this.y),
      playerX = Math.floor(player.x),
      playerY = Math.floor(player.y);

  if (x === playerX && y === playerY && player.pillCount > 0) {
    player.pillCount -= 1;
  }
};

Ghost.prototype.blockCheck = function(x, y, map){
  return map.grid[Math.floor(y)][Math.floor(x)];
};

function getRandomPosition(map) {
  return Math.floor(Math.random() * (map.height)) + 1;
};

module.exports = Ghost;
