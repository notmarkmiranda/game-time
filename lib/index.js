const Game = require('./game');
const game = new Game;

const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext('2d');

var hiScore = localStorage.getItem('hi')


game.startButton();
