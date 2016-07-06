var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");

const Game = require('./game');
var game = new Game({ctx: ctx})

function loop() {
  ctx.clearRect(0, 0, 200, 420);

  game.initialSetup();

  requestAnimationFrame(loop);
}

loop()
