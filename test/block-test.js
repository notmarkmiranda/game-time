const assert = require('chai').assert;

const Block = require('../lib/block');

describe('Block', function() {
  context('with default attributes', function() {
    let block = new Block({
      x: 0,
      y: 0
    });

    it('should be type 0', function() {
      assert.equal(block.type, 0);
    });
  });

  context('can accept type 1', function() {
    let wallBlock = new Block({ x: 0, y: 0, type: 1 });

    it('wallBlock is type 1', function() {
      assert.equal(wallBlock.type, 1);
    });

    it('can be changed to type 0', function() {
      assert.equal(wallBlock.type, 1);
      wallBlock.changeType();
      assert.equal(wallBlock.type, 0);
    });
  });

  context('can accept type -1', function() {
    let pillBlock = new Block({ x: 0, y: 1, type: -1 });

    it('pillBlock is type -1', function() {
      assert.equal(pillBlock.type, -1);
    });

    it('can be changed to type 0', function() {
      assert.equal(pillBlock.type, -1);
      pillBlock.changeType();
      assert.equal(pillBlock.type, 0);
    });
  });
});
