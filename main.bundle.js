/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Game = __webpack_require__(1);
	var game = new Game();

	var canvas = document.getElementById("main-canvas");
	var ctx = canvas.getContext('2d');

	var hiScore = localStorage.getItem('hi');

	game.startButton();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(2);
	var Player = __webpack_require__(4);
	var SuperGhost = __webpack_require__(5);
	var Ghost = __webpack_require__(6);

	var canvas = document.getElementById("main-canvas");
	var ctx = canvas.getContext('2d');

	var realMap = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1], [1, 0, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, -1, 1], [1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1], [1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1], [1, 0, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, -1, 1, 1, 0, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, -1, 1], [1, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1, 1, 1, 0, -1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, 1], [1, 0, -1, -1, -1, -1, -1, 1, 0, -1, -1, -1, 1, 0, -1, 1, 1, 0, -1, 1, 0, -1, -1, -1, 1, 0, -1, -1, -1, -1, -1, 1], [1, 0, -1, 1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, -1, 0, 0, 0, -1, 1, 0, -1, -1, -1, 1, 0, -1, -1, 1, 0, -1, 1], [1, 0, -1, 1, 0, -1, -1, 1, 0, -1, -1, -1, 0, 0, -1, 0, 0, 0, -1, 0, 0, -1, -1, -1, 1, 0, -1, -1, 1, 0, -1, 1], [1, 0, -1, 1, 1, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, 1, 1, 0, -1, 1], [1, 0, -1, 0, 0, 0, -1, -1, -1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, -1, -1, -1, -1, -1, 0, 0, 0, -1, 1], [1, 0, -1, -1, -1, -1, -1, -1, 1, 0, -1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 1, 0, -1, -1, -1, -1, -1, -1, 1], [1, 0, -1, -1, -1, -1, -1, -1, 1, 0, -1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 1, 0, -1, -1, -1, -1, -1, -1, 1], [1, 0, -1, 1, 1, 1, 1, 1, 1, 0, -1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 1, 1, 1, 1, 1, 1, 0, -1, 1], [1, 0, -1, 1, 1, 1, 1, 1, 1, 0, -1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 1, 1, 1, 1, 1, 1, 0, -1, 1], [1, 0, -1, 0, 0, 1, 0, 0, 1, 0, -1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 1, 0, 0, 1, 0, 0, 0, -1, 1], [1, 0, -1, -1, -1, 0, 0, -1, 1, 0, -1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 1, 0, -1, 0, 0, -1, -1, -1, 1], [1, 0, -1, -1, -1, -1, -1, -1, 0, 0, -1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1, 1], [1, 0, -1, -1, -1, 1, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 1, 0, -1, -1, -1, 1], [1, 0, -1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 0, -1, 1], [1, 0, -1, 0, 0, 0, 1, 0, 0, 0, -1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, -1, 1], [1, 0, -1, -1, -1, -1, 1, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 1, 0, -1, -1, -1, -1, 1], [1, 0, -1, 1, 0, -1, 1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 0, -1, 1, 0, -1, 1], [1, 0, -1, 1, 0, -1, 1, 1, 1, 1, 0, -1, 1, 1, 1, 1, 1, 1, 1, 1, 0, -1, 1, 1, 1, 1, 0, -1, 1, 0, -1, 1], [1, 0, -1, 1, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 1, 0, -1, 1], [1, 0, -1, 1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 0, -1, 1], [1, 0, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, -1, 1], [1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1], [1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
	var map = new Map({
	  ctx: ctx,
	  width: realMap[0].length,
	  height: realMap.length,
	  grid: realMap
	});

	var player = new Player(ctx);

	var superGhost = new SuperGhost({ map: map, ctx: ctx });

	var ghosts = [new Ghost({ map: map, ctx: ctx }), new Ghost({ map: map, ctx: ctx }), new Ghost({ map: map, ctx: ctx }), new Ghost({ map: map, ctx: ctx }), new Ghost({ map: map, ctx: ctx })];

	var drawMap = function drawMap(loop) {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  map.drawWalls();

	  player.update(map);
	  superGhost.update(player, map);
	  ghosts.forEach(function (ghost) {
	    ghost.update(player, map);
	  });
	  currentDiv.innerHTML = "<div id='current'>Current Score: " + player.pillCount + "</div>";
	  if (superGhost.gameEnd === true) {
	    clearTimeout(loop);
	    gameEnd(player.pillCount);
	  }
	};

	var hiScore = localStorage.getItem("highScorePM") || 0;
	var scoresDiv = document.getElementById('scores');
	scoresDiv.innerHTML = scoresDiv.innerHTML + "<div id='current'>Current Score: 0</div>" + "Hi Score: " + hiScore;
	var currentDiv = document.getElementById('current');

	function gameEnd(pillCount) {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  ctx.font = "20px Comic Sans MS";
	  ctx.fillStyle = "#000000";
	  ctx.textAlign = "center";
	  if (hiScore < pillCount) {
	    localStorage.setItem("highScorePM", pillCount);
	    hiScore = pillCount;
	    ctx.fillText("YOU HAVE THE NEW HI SCORE!", canvas.width / 2, canvas.width / 2 + 90);
	  }
	  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 + 10);
	  ctx.fillText("POINTS: " + pillCount, canvas.width / 2, canvas.height / 2 + 35);
	  ctx.fillText("HIGH SCORE: " + hiScore, canvas.width / 2, canvas.height / 2 + 60);
	  restartButton();
	}

	var rectx = { x: 20, y: 20, w: 150, h: 40 };
	var hCenteredx = canvas.width / 2 - rectx.w / 2;
	var vCenteredx = canvas.height / 2 - rectx.h / 2 - 35;

	function restartButton() {
	  ctx.fillStyle = "#5B0000";
	  ctx.fillRect(hCenteredx, vCenteredx, rectx.w, rectx.h);
	  ctx.font = "20px Comic Sans MS";
	  ctx.fillStyle = "#FFFFFF";
	  ctx.textAlign = "center";
	  ctx.fillText("PLAY AGAIN!", canvas.width / 2, canvas.height / 2 - 25);

	  canvas.addEventListener('click', function (e) {
	    var mousePos = getMousePos(canvas, e);
	    if (mousePos.x >= hCentered && mousePos.x <= hCentered + rect.w && mousePos.y >= vCentered && mousePos.y <= vCentered + rect.h) {
	      // ctx.clearRect(0, 0, canvas.width, canvas.height);
	      // IM NOT SURE HOW TO RESTART THE GAME
	      console.log('yup');
	      // setTimeout(init(), 1);
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

	var bindKeys = function bindKeys() {
	  // custom onkeydown parser <- returns true only for keydown on 37-40
	  document.onkeydown = function (e) {
	    if (e.keyCode === 38) {
	      player.speed = 1;
	    }
	    if (e.keyCode === 40) {
	      player.speed = -1;
	    }
	    if (e.keyCode === 37) {
	      player.direction = -1;
	    }
	    if (e.keyCode === 39) {
	      player.direction = 1;
	    }
	  };

	  document.onkeyup = function (e) {
	    if (e.keyCode === 38 || e.keyCode === 40) {
	      player.speed = 0;
	    };
	    if (e.keyCode === 37 || e.keyCode === 39) {
	      player.direction = 0;
	    };
	  };
	};

	var gameLoop = function gameLoop() {
	  var loop = setTimeout(gameLoop, 1000 / 30);
	  drawMap(loop);
	};

	function Game() {}

	function init() {
	  bindKeys();
	  gameLoop();
	}

	function start() {
	  setInterval(init(), 1);
	}

	var rect = { x: 20, y: 20, w: 100, h: 40 };
	var hCentered = canvas.width / 2 - rect.w / 2;
	var vCentered = canvas.height / 2 - rect.h / 2 - 35;

	Game.prototype.startButton = function () {
	  ctx.fillStyle = "#5B0000";
	  ctx.fillRect(hCentered, vCentered, rect.w, rect.h);
	  ctx.font = "20px Comic Sans MS";
	  ctx.fillStyle = "#FFFFFF";
	  ctx.textAlign = "center";
	  ctx.fillText("START", canvas.width / 2, canvas.height / 2 - 25);

	  canvas.addEventListener('click', function (e) {
	    var mousePos = getMousePos(canvas, e);
	    if (mousePos.x >= hCentered && mousePos.x <= hCentered + rect.w && mousePos.y >= vCentered && mousePos.y <= vCentered + rect.h) {
	      start();
	    }
	  }, false);
	};

	function getMousePos(canvas, e) {
	  var rect = canvas.getBoundingClientRect();
	  return {
	    x: e.clientX - rect.left,
	    y: e.clientY - rect.top
	  };
	}

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Block = __webpack_require__(3);

	function Map(options) {
	  this.ctx = options.ctx;
	  this.width = options.width;
	  this.height = options.height;
	  this.grid = formatGrid(options.grid);
	};

	Map.prototype.drawWalls = function () {
	  var scale = 12;

	  for (var y = 0; y < this.height; y++) {
	    for (var x = 0; x < this.width; x++) {
	      var position = this.grid[y][x];

	      // draw walls
	      if (position.type > 0) {
	        this.ctx.fillStyle = "rgb(200,200,200)";
	        this.ctx.fillRect(x * scale, y * scale, scale, scale);
	      }

	      // draw pills
	      if (position.type < 0) {
	        this.ctx.fillStyle = "rgb(100,100,100)";
	        this.ctx.fillRect(x * scale, y * scale, scale / 2, scale / 2);
	      }
	    }
	  }
	};

	var formatGrid = function formatGrid(rawGrid) {
	  var grid = [];
	  for (var y = 0; y < rawGrid.length; y++) {
	    var row = [];
	    for (var x = 0; x < rawGrid[0].length; x++) {
	      var position = rawGrid[y][x];
	      switch (position) {
	        case 0:
	          row.push(new Block({ x: x, y: y }));break;
	        case 1:
	          row.push(new Block({ x: x, y: y, type: 1 }));break;
	        case -1:
	          row.push(new Block({ x: x, y: y, type: -1 }));break;
	        default:
	          row.push(new Block({ x: x, y: y }));break;
	      }
	    }
	    grid.push(row);
	  }
	  return grid;
	};

	module.exports = Map;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function Block(options) {
	  this.x = options.x;
	  this.y = options.y;
	  this.type = options.type || 0;
	}

	Block.prototype.changeType = function () {
	  this.type = 0;
	};

	module.exports = Block;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function Player(context) {
	  this.x = 16;
	  this.y = 10;
	  this.direction = 0;
	  this.rotation = 0;
	  this.speed = 0;
	  this.moveSpeed = 0.18;
	  this.rotSpeed = 6;
	  this.pillCount = 0;
	  this.ctx = context;
	}

	Player.prototype.move = function (map) {
	  var moveStep = this.speed * this.moveSpeed;
	  this.rotation += this.direction * this.rotSpeed * Math.PI / 180;

	  var newX = this.x + Math.cos(this.rotation) * moveStep;
	  var newY = this.y + Math.sin(this.rotation) * moveStep;

	  if (this.blockCheck(newX, this.y, map).type <= 0) {
	    this.x = newX;
	  };
	  if (this.blockCheck(this.x, newY, map).type <= 0) {
	    this.y = newY;
	  };
	};

	// pass this in during gameplay loop
	var scale = 12;

	Player.prototype.draw = function () {
	  this.ctx.fillStyle = "black";
	  this.ctx.fillRect(this.x * scale - 2, this.y * scale - 2, 4, 4);

	  this.ctx.beginPath();
	  this.ctx.moveTo(this.x * scale, this.y * scale);
	  this.ctx.lineTo((this.x + Math.cos(this.rotation) * 4) * scale, (this.y + Math.sin(this.rotation) * 4) * scale);
	  this.ctx.closePath();
	  this.ctx.stroke();
	};

	// need to un-tangle map and player into clean game class
	Player.prototype.update = function (map) {
	  this.move(map);

	  // if (this.blockCheck(this.x, this.y, map) < 0) { console.log('pill!'); };
	  if (this.blockCheck(this.x, this.y, map).type < 0) {
	    this.blockCheck(this.x, this.y, map).changeType();
	    this.pillCount += 2;
	  };

	  this.draw();
	};

	Player.prototype.blockCheck = function (x, y, map) {
	  return map.grid[Math.floor(y)][Math.floor(x)];
	};

	module.exports = Player;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var scale = 12;

	var ghostImg = new Image();
	ghostImg.src = "images/ghost.png";

	function SuperGhost(options) {
	  this.x = 10;
	  this.y = 5;
	  this.ctx = options.ctx;
	  this.gameEnd = false;
	  this.speed = 0;

	  this.opacity = 0.10;
	  this.width = options.width || 15;
	  this.height = options.height || 15;
	  this.image = options.image || ghostImg;
	};

	SuperGhost.prototype.chasePlayer = function (playerX, playerY) {
	  var newIncrements = this.distanceToPlayer(playerX, playerY),
	      newX = newIncrements[0] / (scale - this.speed),
	      newY = newIncrements[1] / (scale - this.speed);

	  this.x < playerX ? this.x += newX : this.x -= newX;
	  this.y < playerY ? this.y += newY : this.y -= newY;
	};

	SuperGhost.prototype.distanceToPlayer = function (playerX, playerY) {
	  var distX = Math.abs(this.x - playerX),
	      distY = Math.abs(this.y - playerY),
	      alpha = Math.atan(distY / distX),
	      newX = Math.cos(alpha),
	      newY = Math.sin(alpha);

	  return [newX, newY];
	};

	SuperGhost.prototype.draw = function () {
	  this.ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x * scale - 2, this.y * scale - 2, this.width * 1.5, this.height * 1.5);
	};

	SuperGhost.prototype.update = function (player, map) {
	  this.opacity += 0.05;
	  this.speed += 0.005;
	  this.chasePlayer(player.x, player.y, map);
	  this.draw();
	  this.collisionCheck(player.x, player.y);
	};

	SuperGhost.prototype.collisionCheck = function (playerX, playerY) {
	  var x = Math.floor(this.x),
	      y = Math.floor(this.y),
	      pX = Math.floor(playerX),
	      pY = Math.floor(playerY);

	  if (matchingPositions(x, y, pX, pY)) {
	    this.gameEnd = true;
	  };
	};

	function matchingPositions(x1, y1, x2, y2) {
	  if (x1 === x2 && y1 === y2) {
	    return true;
	  };
	};

	module.exports = SuperGhost;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var scale = 12;
	var lifeSpans = [100, 150, 200, 250, 300, 350, 500];

	// function Image(){};
	var ghostImg = new Image();
	ghostImg.src = "images/ghost.png";

	function Ghost(options) {
	  this.x = getRandomPosition(options.map);
	  this.y = getRandomPosition(options.map);
	  this.lifeSpan = lifeSpans[Math.floor(Math.random() * lifeSpans.length)];
	  this.ctx = options.ctx;

	  this.opacity = 0.10;
	  this.width = options.width || 15;
	  this.height = options.height || 15;
	  this.image = options.image || ghostImg;
	};

	Ghost.prototype.chasePlayer = function (playerX, playerY) {
	  var newIncrements = this.distanceToPlayer(playerX, playerY),
	      newX = newIncrements[0] / scale,
	      newY = newIncrements[1] / scale;

	  this.x < playerX ? this.x += newX : this.x -= newX;
	  this.y < playerY ? this.y += newY : this.y -= newY;
	};

	Ghost.prototype.distanceToPlayer = function (playerX, playerY) {
	  var distX = Math.abs(this.x - playerX),
	      distY = Math.abs(this.y - playerY),
	      alpha = Math.atan(distY / distX),
	      newX = Math.cos(alpha),
	      newY = Math.sin(alpha);

	  return [newX, newY];
	};

	Ghost.prototype.addFade = function () {
	  var lastGlobalAlpha = this.ctx.globalAlpha;
	  this.ctx.globalAlpha = this.opacity;
	  this.draw();
	  this.ctx.globalAlpha = lastGlobalAlpha;
	};

	Ghost.prototype.draw = function () {
	  this.ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x * scale - 2, this.y * scale - 2, this.width, this.height);
	};

	Ghost.prototype.update = function (player, map) {
	  this.chasePlayer(player.x, player.y, map);
	  this.lifeSpan++;
	  this.fadeEffects(player, map);
	};

	Ghost.prototype.fadeEffects = function (player, map) {
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

	Ghost.prototype.randomRelocate = function (map) {
	  this.x = getRandomPosition(map);
	  this.y = getRandomPosition(map);
	};

	Ghost.prototype.collisionCheck = function (player, map) {
	  var x = Math.floor(this.x),
	      y = Math.floor(this.y),
	      playerX = Math.floor(player.x),
	      playerY = Math.floor(player.y);

	  if (x === playerX && y === playerY && player.pillCount > 0) {
	    player.pillCount -= 1;
	  }
	};

	Ghost.prototype.blockCheck = function (x, y, map) {
	  return map.grid[Math.floor(y)][Math.floor(x)];
	};

	function getRandomPosition(map) {
	  return Math.floor(Math.random() * map.height) + 1;
	};

	module.exports = Ghost;

/***/ }
/******/ ]);