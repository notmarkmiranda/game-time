function Map(options){
  this.ctx = options.ctx;
  this.width = options.width;
  this.height = options.height;
  this.wallGrid = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
  ];
};

Map.prototype.draw = function(){
  for (var i = 0; i < this.wallGrid.length; i++){
    var row = this.wallGrid[i]
    for (var j = 0; j < row.length; j++){
      if (row[j] === 1){
        var colWidth = this.width / 10;
        var rowHeight = this.height / 10;
        var theX = i * colWidth;
        var theY = j * rowHeight;
        // context.drawImage(tiles[5], theY, theX, 32, 32);

        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(theX, theY, colWidth, rowHeight);
      }
    }
  }

  // this.wallGrid.forEach(function(){
  //   debugger;
  //   row.forEach(function(element, index){
  //     if (element === 1){
  //       debugger;
  //       // draw Black rec of right size
  //     }
  //   })
  // })

  // this.ctx.fillStyle = "#FF0000";
  // this.ctx.fillRect(this.x, this.y, this.width, this.height);
};


module.exports = Map;
