var Bird = function(game, x, y, frame) {

  'use strict';

  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  // initialize your prefab here

  this.anchor.setTo(0.5, 0.5);

  this.flapSound = this.game.add.audio('flap');
  this.animations.add('flap');
  this.animations.play('flap', 12, true);

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.alive = false;

  this.flap = function() {
    if(!this.body){
      this.body = new Phaser.Physics.Arcade.Body(this)
    }
    this.flapSound.play();
    this.body.velocity.y = -350;
    game.add.tween(this).to({angle: -40}, 100).start();
  };
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {

  // write your prefab's specific update code here
  if(this.angle < 90 && this.alive) {
    this.angle += 2.5;
  }
};



module.exports = Bird;
