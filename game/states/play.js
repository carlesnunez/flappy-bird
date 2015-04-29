var Bird = require('../prefabs/bird');
var Ground = require('../prefabs/ground');
'use strict';
function Play() {
}
Play.prototype = {
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;

    this.background = this.game.add.sprite(0,0, 'background');
    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.ground = new Ground(this.game, 0, 400, 335, 112);

    this.game.add.existing(this.ground);
    this.game.add.existing(this.bird);

    /* previous setup code */

    // keep the spacebar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // add keyboard controls
    var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.input.onDown.add(this.bird.flap, this.bird);


    // add mouse/touch controls
    this.input.onDown.add(this.bird.flap, this.bird);


  },
  update: function () {
    if (!!this.ready) {
      this.game.state.start('menu');
    }
    if(this.game.physics.arcade.collide(this.bird, this.ground)){
      //this.game.state.start('gameover');
    }
  },
  clickListener: function () {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
