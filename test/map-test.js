const assert = require('chai').assert;

const Map = require('../lib/map');

describe('Map', function() {
  context('with default attributes', function() {
    var map = new Map(this.ctx);

    it('should have outer walls', function() {
      assert.equal(map.wallGrid[0][0], 1);
      assert.equal(map.wallGrid[1][0], 1);
      assert.equal(map.wallGrid[0][1], 1);
    });

  });
});
