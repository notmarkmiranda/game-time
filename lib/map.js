const Block = require('./block');
// map through basic grid, create official map with blocks
// blocks hold value depending on value on grid when they're created

function Map(options){
  this.ctx = options.ctx;
  this.width = options.width;
  this.height = options.height;
  this.grid = formatGrid(options.grid);
};

var scale = 12;

Map.prototype.drawWalls = function(){
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var position = this.grid[y][x];

      // draw walls
      if (position.type > 0) {
        this.ctx.fillStyle = "rgb(200,200,200)";
        this.ctx.fillRect(
          x * scale,
          y * scale,
          scale, scale
        );
      }

      // draw pills
      if (position.type < 0) {
        this.ctx.fillStyle = "rgb(100,100,100)";
        this.ctx.fillRect(
          x * scale,
          y * scale,
          (scale / 2),
          (scale / 2)
        );
      }
    }
  }
}

var formatGrid = function(rawGrid){
  var grid = [];
  for (var y = 0; y < rawGrid.length; y++) {
    var row = [];
    for (var x = 0; x < rawGrid[0].length; x++) {
      var position = rawGrid[y][x];
      switch (position) {
        case 0:
          row.push(new Block({x: x, y: y, type: 0})); break;
        case 1:
          row.push(new Block({x: x, y: y, type: 1})); break;
        case -1:
          row.push(new Block({x: x, y: y, type: -1})); break;
        default:
          row.push(new Block({x: x, y: y, type: 0})); break;
      }
    }
    grid.push(row);
  }
  return grid;
};

module.exports = Map;
