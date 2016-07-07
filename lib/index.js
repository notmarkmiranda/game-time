const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext('2d');

const Game = require('./game');
var game = new Game({
  ctx: ctx,
  width: canvas.width,
  height: canvas.height
})

function loop() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.height, canvas.width);
  game.initialSetup();
  ctx.restore();
  requestAnimationFrame(loop);
}

loop()
