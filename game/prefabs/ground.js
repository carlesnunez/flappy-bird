

var Ground = function(game, x, y, width, height) {
  Phaser.Sprite.call(this, game, x, y, 'ground');
  // start scrolling our ground
  //this.autoScroll(-200,0);

  // enable physics on the ground sprite
  // this is needed for collision detection
  this.game.physics.arcade.enableBody(this);
  this.body.immovable = true;

  // we don't want the ground's body
  // to be affected by gravity
  this.body.allowGravity = false;
};

Ground.prototype = Object.create(Phaser.Sprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function () {

  // write your prefab's specific update code here

};

module.exports = Ground;
