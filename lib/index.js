var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");

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
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();

    if(rightPressed && playerX < canvas.width-playerWidth) {
        playerX += 5;
    }
    else if(leftPressed && playerX > 0) {
        playerX -= 5;
    }
    else if(upPressed && playerY < canvas.height-playerHeight) {
        playerY -= 5;
    }
    else if(downPressed && playerY > 0) {
        playerY += 5;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);
