const assert = require('chai').assert;

const Player = require('../lib/player');

describe('Player', function(){
  context('with default attributes', function(){
     let player = new Player({
       ctx: this.ctx
     });


   it('should have default attributes', function(){
     assert.equal(player.x, 16)
     assert.equal(player.y, 10)
     assert.equal(player.direction, 0)
     assert.equal(player.rotation, 0)
     assert.equal(player.speed, 0)
     assert.equal(player.moveSpeed, 0.18)
     assert.equal(player.rotSpeed, 6)
     assert.equal(player.pillCount, 0)
   });

  });
});
