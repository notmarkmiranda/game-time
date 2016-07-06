var canvas = document.getElementById("main-canvas");
var context = canvas.getContext("2d");

const PI = Math.PI

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

var playerHeight = 10;
var playerWidth = 10;
var playerX = (canvas.width-playerWidth)/2;
var playerY = (canvas.height-playerHeight)/2;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var Player = function(x, y, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
}

Player.prototype.rotate = function(change) {
    var transX = player.x + (0.5 * playerWidth);
    var transY = player.y + (0.5 * playerHeight);
    context.translate(transX, transY); // translate to rectangle center
                                // transX = x + 0.5 * width
                                // transY = y + 0.5 * height
    context.rotate((PI / 180) * change); // rotate
    context.translate(-transX, -transY); // translate back
 };

var player = new Player(x, y, PI);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}

function drawPlayer() {
    context.beginPath();
    context.rect(player.x, player.y, playerWidth, playerHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();

    if(rightPressed && player.x < canvas.width-playerWidth) {
        player.rotate(1.5);
    }
    else if(leftPressed && player.x > 0) {
        player.rotate(-1.5);
    }
    else if(upPressed && player.y < canvas.height-playerHeight) {
        player.y -= 2;
    }
    else if(downPressed && player.y > 0) {
        player.y += 2;
    }
}

setInterval(draw, 10);
