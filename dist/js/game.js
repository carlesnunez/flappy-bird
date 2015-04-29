(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(288, 505, Phaser.AUTO, 'flappy-bird-reborn');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":4,"./states/gameover":5,"./states/menu":6,"./states/play":7,"./states/preload":8}],2:[function(require,module,exports){
var Bird = function(game, x, y, frame) {

  'use strict';

  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  // initialize your prefab here

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('flap');
  this.animations.play('flap', 12, true);

  this.game.physics.arcade.enableBody(this);
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {

  // write your prefab's specific update code here
  if(this.angle < 90) {
    this.angle += 2.5;
  }
};


Bird.prototype.flap = function(){
  this.body.velocity.y = -400;
  this.game.add.tween(this).to({angle: -40}, 100).start();

}

module.exports = Bird;

},{}],3:[function(require,module,exports){


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

},{}],4:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],5:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],6:[function(require,module,exports){
'use strict';
function Menu() {
}

Menu.prototype = {
  preload: function () {
  },
  create: function () {

    //add the background sprite
    this.background = this.game.add.sprite(0, 0, 'background');
    this.ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
    this.ground.autoScroll(-200,0);

    //
    this.titleGroup = this.game.add.group();
    this.title = this.game.add.sprite(0, 0, 'title');
    this.titleGroup.add(this.title);
    this.bird = this.game.add.sprite(200, 5, 'bird');
    this.titleGroup.add(this.bird);

    this.bird.animations.add('flap');
    this.bird.animations.play('flap', 12, true);


    this.titleGroup.x = 30;
    this.titleGroup.y = 100;

    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this)
    this.startButton.anchor.setTo(0.5,0.5);


    this.game.add.tween(this.titleGroup).to({y:this.titleGroup.y + 15}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },

  startClick: function() {
    // start button click handler
    // start the 'play' state
    this.game.state.start('play');
  },

  update: function () {
  }
};
module.exports = Menu;

},{}],7:[function(require,module,exports){
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

},{"../prefabs/bird":2,"../prefabs/ground":3}],8:[function(require,module,exports){
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function () {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    this.load.image('background','assets/background.png');
    this.load.image('ground','assets/ground.png');
    this.load.image('title','assets/title.png');
    this.load.image('startButton','assets/start-button.png');

    this.load.spritesheet('bird', 'assets/pajaro.png', 34, 24, 3);
  },
  create: function () {
    this.asset.cropEnabled = false;
  },
  update: function () {
    if (!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function () {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])