class World {
  canvas;
  keyboard;
  ctx;
  level;
  character;
  camera_x = 0;

  backgrounds = [];
  knights = [];
  poisons = [];
  key;
  door = [];
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
    this.door = this.level.door || [];
    this.snakes = this.level.snakes || [];
    this.traps = this.level.traps || [];
    this.crystal = this.level.crystal;
    this.endboss = this.level.endboss;
    this.endbossHealthBar = new StatusBar('endboss', 500, 20, 200, 40);
    this.endboss.setStatusBars(this.endbossHealthBar);

    this.camera_x = this.character.x - 190;
    this.endGame = new EndGame(this);
  }

  resetGameWorld() {
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
  }

  update() {
    if (this.levelCompleted || this.character.energy <= 0) return;

    /*     if (this.collisionHandler) {
      this.collisionHandler.checkCollisions();
    } */
    if (this.character.isVisible) {
      this.character.update();
      this.character.playAnimation(this.character.IMAGES_IDLE);
    }
    // this.updatePoison();
    if (this.character.isMoving() && musicIsOn) {
      playWalkingSound();
    }
    // this.updateEnemies();
    // if (this.level.endboss) {
    //   this.endbossHealthBar.setPercentage(this.level.endboss.energy);
    // }
    this.updateCrystal();
  }


draw() {
  this.clearCanvas();
  this.ctx.save();
  this.ctx.translate(this.camera_x, 0);

  this.addObjectsToMap(this.backgrounds);
  this.addObjectsToMap(this.traps);
  this.addObjectsToMap(this.snakes);
  this.addObjectsToMap(this.knights);
  this.addToMap(this.key);
  this.addToMap(this.door);
  this.addToMap(this.crystal);
  this.addToMap(this.endboss);
  this.addToMap(this.character);

  this.ctx.restore();

  this.addToMap(this.character.healthBar);
  this.addToMap(this.character.poisonBar);
  this.addToMap(this.endbossHealthBar);

  requestAnimationFrame(() => this.draw());
}



  updateEnemies() {
    this.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss || enemy instanceof Snake) {
        enemy.update(this.character);
      }
    });
  }

  /**
   * Aktualisiert den Zustand des Gifts.
   */
  updatePoison() {
    this.poisonsArray.forEach((poison, index) => {
      if (this.collisionHandler.checkCollision(this.character, poison)) {
        this.character.collectPoison(poison, index);
      }
    });
  }

  /**
   * Aktualisiert den Zustand des Kristalls.
   */
  updateCrystal() {
    if (this.crystal && this.crystal.isActive) {
      if (this.collisionHandler.checkCollision(this.character, this.crystal)) {
        this.crystal.collect();
      }
    }
  }
  /**
   * Fügt einen Charakter zur Welt hinzu.
   * @param {Character} character - Der hinzuzufügende Charakter.
   */
  /* WIRD NICHT GENUTZT! */
  /*   addCharacter(character) {
    this.characters.push(character);
  } */

  /**
   * Fügt einen Feind zur Welt hinzu.
   * @param {Enemy} enemy - Der hinzuzufügende Feind.
   */
  addEnemy(enemy) {
    this.enemies.push(enemy);
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

  /**
   * Setzt alle Feinde auf ihre ursprünglichen Positionen zurück.
   */
  resetEnemies() {
    this.enemies.forEach((enemy) => {
      if (enemy.resetPosition) {
        enemy.resetPosition();
      }
    });
  }

  /**
   * Stellt die Feinde aus dem gespeicherten Zustand wieder her.
   * @param {Array} enemies - Die gespeicherten Feind-Daten.
   */
  restoreEnemies(enemies) {
    this.enemies = enemies.map((data) => {
      const enemy = new (window[data.type] || Enemy)();
      Object.assign(enemy, data);
      return enemy;
    });
  }

  /**
   * Setzt alle Objekte auf ihre ursprünglichen Positionen zurück.
   */
  resetObjects() {
    if (!this.objects || !Array.isArray(this.objects)) {
      console.warn('Keine Objekte zum Zurücksetzen vorhanden.'); // Debugging-Log
      return;
    }
    this.objects.forEach((obj) => {
      if (obj.resetPosition) {
        obj.resetPosition();
      }
    });
  }

  /**
   * Stellt die Objekte aus dem gespeicherten Zustand wieder her.
   * @param {Array} objects - Die gespeicherten Objekt-Daten.
   */
  restoreObjects(objects) {
    this.objects = objects.map((data) => {
      const obj = new GameObject();
      Object.assign(obj, data);
      return obj;
    });
  }
}
