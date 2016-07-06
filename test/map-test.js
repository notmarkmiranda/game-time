const assert = require('chai').assert;

const Map = require('../lib/map');

describe('Map', function() {
  context('with default attributes', function() {
    var map = new Map(this.ctx);
    debugger;
    it('should have outer walls', function() {
      assert.equal(map.wallGrid[0][0], 1);
      assert.equal(map.wallGrid[1][0], 1);
      assert.equal(map.wallGrid[0][1], 1);

      assert.equal(map.wallGrid[1][31], 1);
      assert.equal(map.wallGrid[2][31], 1);
      assert.equal(map.wallGrid[3][31], 1);
      assert.equal(map.wallGrid[3][30], 1);
    });

  });
});
