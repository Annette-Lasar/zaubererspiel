class World {
  canvas;
  keyboard;
  ctx;
  level;
  character;
  camera_x = 0;

  backgrounds = [];
  enemies = [];
  knights = [];
  poisons = [];
  key;
  door;
  snakes = [];
  traps = [];
  endboss;
  crystal;
  // throwableObjects = [];

  characterStatusBar;
  poisonStatusBar;
  endbossHealthBar;
  endGame;
  quitButton;
  tryAgainButton;
  IMAGES_YOU_LOST = LOADED_IMAGES.gameUI.game_over;
  quitButtonImage = LOADED_IMAGES.gameUI.quit_game;
  tryAgainButtonImage = LOADED_IMAGES.gameUI.try_again;

  constructor(canvas, keyboard, level1) {
    this.canvas = canvas;
    this.level = level1;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;
    // this.keyboard.linkButtonsToPressEvents();
    // NICHT löschen! später wieder einkommentieren, wenn die IDs vorhanden sind.

    this.initializeGameObjects();
    this.collisionHandler = new CollisionHandler(this);
  }

  initializeGameObjects() {
    this.character = new Character(this);
    this.characterStatusBar = new StatusBar('health', 20, 20, 150, 40);
    this.poisonStatusBar = new StatusBar('poison', 20, 70, 150, 40);
    this.character.setStatusBars(this.characterStatusBar, this.poisonStatusBar);

    this.backgrounds = this.level.backgrounds || [];
    this.knights = this.level.knights || [];
    this.poisons = this.level.poisons || [];
    this.key = this.level.key;
    this.door = this.level.door;
    this.snakes = this.level.snakes || [];
    this.traps = this.level.traps || [];
    this.crystal = this.level.crystal;
    // this.endboss = this.level.endboss;
    // this.endbossHealthBar = new StatusBar('endboss', 500, 20, 200, 40);
    // this.endboss.setStatusBars(this.endbossHealthBar);

    /*    this.enemies = [
      ...this.knights,
      ...this.snakes,
      ...this.traps,
      this.endboss,
    ]; */

    this.camera_x = this.character.x - 190;
    this.endGame = new EndGame(this);
  }

  update() {
    this.character.handleMovements();
    this.camera_x = -this.character.x + 200;
    this.character.handleAnimations();
    this.character.drawFrame();
    this.poisons.forEach((poison) => poison.handleAnimations());
    this.knights.forEach((knight) => knight.handleAnimations());
    this.key.handleFloating();
    this.snakes.forEach((snake) => snake.handleAnimations());
    this.traps.forEach((trap) => trap.handleAnimations());
  }

  draw() {
    this.clearCanvas();
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgrounds);
    this.addObjectsToMap(this.traps);
    this.addObjectsToMap(this.snakes);
    this.addObjectsToMap(this.knights);
    this.addObjectsToMap(this.poisons);
    this.addToMap(this.key);
    this.addToMap(this.door);
    this.addToMap(this.crystal);
    // this.addToMap(this.endboss);
    this.addToMap(this.character);
    this.character.drawFrame(this.ctx);

    this.ctx.restore();

    this.addToMap(this.character.healthBar);
    this.addToMap(this.character.poisonBar);
    // this.addToMap(this.endbossHealthBar);
  }

  updatePoison() {
    this.poisonsArray.forEach((poison, index) => {
      if (this.collisionHandler.checkCollision(this.character, poison)) {
        this.character.collectPoison(poison, index);
      }
    });
  }

  updateCrystal() {
    if (this.crystal && this.crystal.isActive) {
      if (this.collisionHandler.checkCollision(this.character, this.crystal)) {
        this.crystal.collect();
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addObjectsToMap(objects) {
    if (!Array.isArray(objects)) {
      console.warn('[addObjectsToMap()] kein Array übergeben:', objects);
      return;
    }

    objects.forEach((object, i) => {
      if (!object) {
        console.warn(`[addObjectsToMap()] Objekt an Index ${i} ist undefined`);
      }
      this.addToMap(object);
    });

    if (
      this.backgrounds.length > 0 &&
      this.camera_x >= this.backgrounds[0].width
    ) {
      this.camera_x = 0;
    }
  }

  addToMap(mo) {
    if (!mo) {
      console.warn('[addToMap()] mo ist undefined oder null!');
      console.trace(); // <-- zeigt dir, woher der Aufruf kam!
      return;
    }

    if (mo.otherDirection) this.flipImage(mo);

    if (mo.isActive !== false) {
      try {
        mo.draw(this.ctx);
      } catch (err) {
        console.error(
          `[addToMap()] Fehler beim Zeichnen von ${mo.constructor?.name}:`,
          err
        );
      }
    }

    if (mo.otherDirection) this.flipImageBack(mo);
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  resetCamera() {
    this.camera_x = -this.character.x + 190;
  }

  /*   resetGameWorld() {
    this.camera_x = 0;
    this.characterStatusBar = null;
    this.endbossHealthBar = null;
    this.poisonStatusBar = null;

    this.knights = [];
    this.poisons = [];
    this.key = null;
    this.door = [];
    this.snakes = [];
    this.traps = [];
    this.crystal = null;
    this.endboss = null;

    this.throwableObjects = [];
    this.endGame = null;
  } */

  /*   resetEnemies() {
    this.enemies.forEach((enemy) => {
      if (enemy.resetPosition) {
        enemy.resetPosition();
      }
    });
*/

  // restoreEnemies(enemies) {
  //   this.enemies = enemies.map((data) => {
  //     const enemy = new (window[data.type] || Enemy)();
  //     Object.assign(enemy, data);
  //     return enemy;
  //   });
  // }

  // resetObjects() {
  //   if (!this.objects || !Array.isArray(this.objects)) {
  //     console.warn('Keine Objekte zum Zurücksetzen vorhanden.'); // Debugging-Log
  //     return;
  //   }
  //   this.objects.forEach((obj) => {
  //     if (obj.resetPosition) {
  //       obj.resetPosition();
  //     }
  //   });
  // }

  // restoreObjects(objects) {
  //   this.objects = objects.map((data) => {
  //     const obj = new GameObject();
  //     Object.assign(obj, data);
  //     return obj;
  //   });
  // }
}
