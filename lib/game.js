const Map = require('./map');
const Player = require('./player');
const SuperGhost = require('./superGhost');
const Ghost = require('./ghost');

const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext('2d');


const realMap = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,-1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,-1,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,-1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,-1,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,-1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,-1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,-1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,-1,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,-1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const map = new Map({
  ctx: ctx,
  width: realMap[0].length,
  height: realMap.length,
  grid: realMap
})

const player = new Player(ctx);

const superGhost = new SuperGhost({map: map, ctx: ctx});

const ghosts = [
  new Ghost({map: map, ctx: ctx}),
  new Ghost({map: map, ctx: ctx}),
  new Ghost({map: map, ctx: ctx}),
  new Ghost({map: map, ctx: ctx}),
  new Ghost({map: map, ctx: ctx}),
];

var drawMap = function(loop) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  console.log("Points: " + player.pillCount);

  map.drawWalls();

  player.update(map);
  superGhost.update(player, map);
  ghosts.forEach(function(ghost){
    ghost.update(player, map);
  });
  if(superGhost.gameEnd === true){
    clearTimeout(loop);
    gameEnd(player.pillCount);
  }
}

function gameEnd(pillCount){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "20px Comic Sans MS"
  ctx.fillStyle = "#000000"
  ctx.textAlign = "center";

  var hiScore = localStorage.getItem("highScorePM") || 0
  if(hiScore < pillCount){
    localStorage.setItem("highScorePM", pillCount);
    hiScore = pillCount
    ctx.fillText("YOU HAVE THE NEW HI SCORE!", canvas.width / 2, canvas.width / 2 + 90)
  }
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 + 10)
  ctx.fillText("POINTS: " + pillCount, canvas.width / 2, canvas.height / 2 + 35)
  ctx.fillText("HIGH SCORE: " + hiScore, canvas.width / 2, canvas.height / 2 + 60)
  restartButton();
}


var offset = canvas.getBoundingClientRect();
var rectx = {x:20, y:20, w:150, h:40}
var hCenteredx = canvas.width / 2 - rectx.w / 2
var vCenteredx = canvas.height / 2 - rectx.h / 2  - 35

function restartButton(){
  ctx.fillStyle = "#5B0000";
  ctx.fillRect(hCenteredx,vCenteredx,rectx.w,rectx.h)
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText("PLAY AGAIN!", canvas.width / 2, canvas.height / 2 - 25)

  canvas.addEventListener('click', function(e){
    var mousePos = getMousePos(canvas, e);
    if(mousePos.x >= hCentered && mousePos.x <= (hCentered + rect.w) && mousePos.y >= vCentered && mousePos.y <= (vCentered + rect.h)){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // IM NOT SURE HOW TO RESTART THE GAME
      // setTimeout(init(), 1);
    }
  } , false);
}




function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

var bindKeys = function() {
  // custom onkeydown parser <- returns true only for keydown on 37-40
  document.onkeydown = function(e) {
    if (e.keyCode === 38) { player.speed = 1 };
    if (e.keyCode === 40) { player.speed = -1 };
    if (e.keyCode === 37) { player.direction = -1 };
    if (e.keyCode === 39) { player.direction = 1 };
  }

  document.onkeyup = function(e) {
    if (e.keyCode === 38 || e.keyCode === 40) { player.speed = 0 };
    if (e.keyCode === 37 || e.keyCode === 39) { player.direction = 0 };
  }
}

var gameLoop = function() {
  var loop = setTimeout(gameLoop, 1000 / 30);
  drawMap(loop);
}

function Game(){
}

var init = function(){
  bindKeys();
  gameLoop();
}

var offset = canvas.getBoundingClientRect();
var rect = {x:20, y:20, w:100, h:40}
var hCentered = canvas.width / 2 - rect.w / 2
var vCentered = canvas.height / 2 - rect.h / 2 - 35

Game.prototype.startButton = function(){
	ctx.fillStyle = "#5B0000";
	ctx.fillRect(hCentered,vCentered,rect.w,rect.h)
	ctx.font = "20px Comic Sans MS";
	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = "center";
	ctx.fillText("START", canvas.width / 2, canvas.height / 2 - 25)

		canvas.addEventListener('click', function(e) {
			var mousePos = getMousePos(canvas, e);
			if(mousePos.x >= hCentered && mousePos.x <= (hCentered + rect.w) && mousePos.y >= vCentered && mousePos.y <= (vCentered + rect.h)){
	  			setTimeout(init(), 1);
			}
		}, false);
}

function getMousePos(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

module.exports = Game;
