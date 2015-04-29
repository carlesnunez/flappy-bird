var Bird = require('../prefabs/bird');
var Ground = require('../prefabs/ground');
var PipeGroup = require('../prefabs/pipeGroup');
'use strict';
function Play() {
}
Play.prototype = {
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;

    this.background = this.game.add.sprite(0, 0, 'background');
    this.bird = new Bird(this.game, 100, this.game.height / 2);
    this.ground = new Ground(this.game, 0, 400, 335, 112);

    this.game.add.existing(this.ground);
    // create and add a group to hold our pipeGroup prefabs
    this.pipes = this.game.add.group();


    this.game.add.existing(this.bird);

    /* previous setup code */

    // keep the spacebar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // add keyboard controls
    var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.input.onDown.add(this.bird.flap, this.bird);


    // add mouse/touch controls
    this.input.onDown.add(this.bird.flap, this.bird);


    this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
    this.pipeGenerator.timer.start();

  },

  generatePipes: function() {
    var pipeY = this.game.rnd.integerInRange(-100, 100);
    var pipeGroup = this.pipes.getFirstExists(false);
    if(!pipeGroup) {
      pipeGroup = new PipeGroup(this.game, this.pipes);
    }
    pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
  },

  update: function () {
    if (!!this.ready) {
      this.game.state.start('menu');
    }
    if (this.game.physics.arcade.collide(this.bird, this.ground)) {
      //this.game.state.start('gameover');
    }
  },
  clickListener: function () {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
