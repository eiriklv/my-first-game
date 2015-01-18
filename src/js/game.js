'use strict';

var raf = require('raf');

var gameWidth = 512;
var gameHeight = 480;
var score = 0;

// create canvas context
var createCanvas = require('./helpers/create-canvas');

// entities
var level = require('./entities/level');
var hero = require('./entities/hero');
var monsterFail = require('./entities/monster-fail');
var monsterSuccess = require('./entities/monster-success');

// logic and controls
var keysDown = require('./helpers/keys-down');
var collides = require('./logic/collides');

// helpers
var drawScore = require('./helpers/draw-score');
var drawFps = require('./helpers/draw-fps');
var fpsMeasure = require('./helpers/fps-measure');

// sounds
var successSound = new Audio('/audio/success.mp3');
var failSound = new Audio('/audio/fail.mp3');

// Reset the game when the player catches a monster
var reset = function() {
  hero.x = gameWidth / 2;
  hero.y = gameHeight / 2;

  // Throw the success monster somewhere on the screen randomly
  monsterSuccess.x = monsterSuccess.width + (Math.random() * (gameWidth - (monsterSuccess.width * 2)));
  monsterSuccess.y = monsterSuccess.height + (Math.random() * (gameHeight - (monsterSuccess.height * 2)));

  // Throw the fail monster somewhere on the screen randomly
  monsterFail.x = monsterFail.width + (Math.random() * (gameWidth - (monsterFail.width * 2)));
  monsterFail.y = monsterFail.height + (Math.random() * (gameHeight - (monsterFail.height * 2)));
};

var moveHero = function(modifier) {
  if (38 in keysDown) { // Player holding up
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) { // Player holding down
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) { // Player holding left
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) { // Player holding right
    hero.x += hero.speed * modifier;
  }
}

var handleCollisions = function() {
  if (collides(hero, monsterFail)) {
    failSound.play();
    score = score - 10;
    reset();
  }

  if (collides(hero, monsterSuccess)) {
    successSound.play();
    ++score;
    reset();
  }
}

// Update game objects
var update = function(modifier) {
  moveHero(modifier);
  handleCollisions();
};

// Draw everything
var render = function(ctx) {
  level.draw(ctx);
  hero.draw(ctx);
  monsterFail.draw(ctx);
  monsterSuccess.draw(ctx);
  drawScore(ctx, score);
  drawFps(ctx, fpsMeasure.getAverage());
};

var game = (function() {
  // create canvas
  var ctx = createCanvas(gameWidth, gameHeight);

  // game loop deltas
  var now = Date.now();
  var then = Date.now();
  var delta = now - then;

  // render loop deltas
  var fps = 30;
  var renderInterval = 1000 / fps;
  var renderDelta = now - then;
  var lastRender = now;

  // game loop
  var loop = function(ctx) {
    // request the next animation frame in advance
    raf(loop.bind(null, ctx));

    // update game logic
    now = Date.now();
    delta = now - then;
    update(delta / 1000);
    then = now;

    // render (if applicable)
    var temp = lastRender;
    renderDelta = now - lastRender;

    if (renderDelta >= renderInterval) {
      render(ctx);
      lastRender = now - (renderDelta % renderInterval);
      fpsMeasure.update(lastRender - temp);
    }
  }

  // start the game
  var run = function() {
    reset();
    loop(ctx);
  }

  return {
    run: run
  };
}());

game.run();
