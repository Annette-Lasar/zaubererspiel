/* let isAfterDoor = false;
let hasPassedDoor = false;

class Character extends MovableObject {
  world;
  height = 290;
  width = 520;
  speed = 4;
  invulnerable = false;
  healthBar;
  poisonBar;
  poisonCollected = 0;
  deadAnimationPlayed = false;
  hasKey = false;
  isVisible = true;
  animationIntervals = [];
  offset = { top: 60, bottom: 10, left: 215, right: 200 };

  constructor(world) {
    super();
    this.world = world;
    this.loadImage(LOADED_IMAGES.character.idle[0]);
    this.addToImageCache('idle', LOADED_IMAGES.character.idle);
    this.addToImageCache('walk', LOADED_IMAGES.character.walk);
    this.addToImageCache('jump', LOADED_IMAGES.character.jump);
    this.addToImageCache('die', LOADED_IMAGES.character.die);
    this.addToImageCache('hurt', LOADED_IMAGES.character.hurt);
    this.initCharacter();
    this.canMoveLeftFlag = true;
  }

  initCharacter() {
    this.applyGravity();
    this.energy = 100;
    this.x = 300;
    this.y = 150;
    // this.healthBar.setPercentage(0)
    // this.poisonBar.setPercentage(0);
    this.world.camera_x = -this.x - 190;
    this.canMoveLeftFlag = true;
    this.img = this.imageCache['idle_0'];
    this.drawFrame();
    this.animate();
    this.handleMovement();
  }

  update() {
    if (!this.isVisible || this.energy <= 0) return;
    if (this.energy <= 0 && !this.deadAnimationPlayed) {
      this.die();
    }
    this.handleMovement();
    this.updateCamera();
  }

  handleMovement() {
    const isMovingRight =
      this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x + 200;
    const isMovingLeft =
      this.world.keyboard.LEFT && this.x > 0 && this.canMoveLeft();
    if (isMovingRight) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (isMovingLeft) {
      this.otherDirection = true;
      this.moveLeft();
    }
    if (isMovingRight || isMovingLeft) {
      playWalkingSound();
    } else {
      stopWalkingSound();
    }
    if (this.world.keyboard.JUMP && !this.isAboveGround()) {
      this.jump();
    }
  }

  jump() {
    if (!this.isAboveGround()) {
      this.speedY = 33;
      playJumpSound();
    }
  }

  updateCamera() {
    this.world.camera_x = -this.x - 190;
  }

  takeDamage(damage) {
    if (this.energy > 0 && !this.invulnerable) {
      this.energy -= damage;
      this.lastHit = Date.now();
      this.world.characterStatusBar.setPercentage(this.energy);
      this.playAnimation(LOADED_IMAGES.character.hurt);
      if (this.energy <= 0) {
        this.die();
      } else {
        this.invulnerable = true;
        setTimeout(() => (this.invulnerable = false), 1000);
      }
    }
  }

  die() {
    if (!this.deadAnimationPlayed) {
      this.saveLastPosition();
      this.deadAnimationPlayed = true;
      this.isVisible = true;
      this.playDeathAnimation(() => {
        // this.isVisible = false;
        this.freezeAtDeathPose();
        this.world.endGame.showYouLostScreen();
      });
    }
  }

  playDeathAnimation(callback) {
    let deathIndex = 0;
    const deathImages = LOADED_IMAGES.character.die;

    if (!deathImages || deathImages.length === 0) {
      if (callback) callback();
      return;
    }

    const deathInverval = setInterval(() => {
      if (deathIndex < deathImages.length) {
        this.img = this.imageCache[deathImages[deathIndex]];
        deathIndex++;
      } else {
        clearInterval(deathInverval);
        if (callback) callback();
      }
    }, 150);
  }

  freezeAtDeathPose() {
    const deathImages = LOADED_IMAGES.character.die;
    if (deathImages && deathImages.length > 0) {
      const lastDeathFrameKey = deathImages[deathImages.length - 1];
      this.img = this.imageCache[lastDeathFrameKey];
    }
  }

  animate() {
    this.stopAllAnimations();
    let interval = setInterval(() => {
      if (this.isDead() && !this.deadAnimationPlayed) {
        this.die();
      } else if (this.isHurt() && this.energy >= 1) {
        this.playAnimation(LOADED_IMAGES.character.hurt);
      } else if (this.isAboveGround()) {
        this.playAnimation(LOADED_IMAGES.character.jump);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(LOADED_IMAGES.character.walk);
      } else if (this.energy >= 1) {
        this.playAnimation(LOADED_IMAGES.character.idle);
      }
    }, 100);
    this.animationIntervals.push(interval);
  }

  stopAllAnimations() {
    this.animationIntervals.forEach(clearInterval);
    this.animationIntervals = [];
  }

  reset() {
    this.speed = 4;
    this.stopAllAnimations();
    Object.assign(this, {
      y: 150,
      isVisible: true,
      energy: 100,
      deadAnimationPlayed: false,
      invulnerable: false,
      currentImage: 0,
      speedY: 0,
      acceleration: 2.5,
    });
    this.poisonCollected = 5;
    this.poisonStatusBar.setPercentage(this.poisonCollected * 20);
    this.playAnimation(LOADED_IMAGES.character.idle);
    this.animate();
    this.stopGravity();
    this.applyGravity();
  }

  resetEnemies() {
    this.world.enemies.forEach((enemy) => enemy.resetPosition?.());
  }

  enterDoor(door) {
    if (hasPassedDoor) return;
    this.isVisible = false;
    this.x = door.x;
    this.y = door.y;
    setTimeout(() => {
      this.isVisible = false;
      setTimeout(() => {
        this.x = 6471;
        this.y = 150;
        this.world.camera_x = -this.x - 190;
        this.isVisible = true;
        isAfterDoor = true;
        hasPassedDoor = true;
        this.world.snakes = this.world.level.snakes || [];
        setTimeout(() => {
          isAfterDoor = false;
        }, 2000);
        playNewSound();
      }, 200);
    }, 2000);
  }

  canMoveLeft() {
    if (hasPassedDoor && this.x < 6471) return false;
    return this.canMoveLeftFlag && !isAfterDoor;
  }

  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  collectPoison(poison, index) {
    if (poison && poison.isActive) {
      poison.deactivate();
      this.poisonCollected += 1;
      this.poisonStatusBar.setPercentage(this.poisonCollected * 20);
      this.world.poisonsArray.splice(index, 1);
      playCollectPoisonBottleSound();
    }
  }

  collectKey(key) {
    if (key && key.isActive) {
      key.deactivate();
      this.hasKey = true;
    }
  }

  hit(enemy) {
    const distance = Math.abs(this.x - enemy.x);
    if (!this.invulnerable && distance < 100) {
      this.takeDamage(5);
      this.world.characterStatusBar.setPercentage(this.energy);
      this.playAnimation(LOADED_IMAGES.character.hurt);
    }
  }

  throwPoisonBottle() {
    if (this.poisonCollected === 0) {
      return;
    }
    this.poisonCollected--;
    this.poisonStatusBar.setPercentage(this.poisonCollected * 20);
    const offsetX = this.otherDirection ? -220 : 220;
    const poisonBottle = new ThrowableObject(this.x + offsetX, this.y + 50);
    poisonBottle.otherDirection = this.otherDirection;
    this.world.throwableObjects.push(poisonBottle);
  }

  resetPosition(position) {
    const resetPos = {
      x: (position?.x || this.lastPosition?.x || 90) - 100,
      y: position?.y || this.lastPosition?.y || 150,
    };
    this.x = resetPos.x < 0 ? 0 : resetPos.x;
    this.y = resetPos.y;
    this.energy = 100;
    this.isVisible = true;
    this.deadAnimationPlayed = false;
    this.invulnerable = false;
    this.playAnimation(LOADED_IMAGES.character.idle);
    this.stopGravity();
    this.applyGravity();
  }

  saveLastPosition() {
    this.lastPosition = { x: this.x, y: this.y };
  }

  drawFrame() {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    const offsetX = this.x + this.offset.left;
    const offsetY = this.y + this.offset.top;
    const offsetWidth = this.width - this.offset.left - this.offset.right;
    const offsetHeight = this.height - this.offset.top - this.offset.bottom;

    ctx.strokeRect(offsetX, offsetY, offsetWidth, offsetHeight);
  }
}
 */

class Character extends MovableObject {
  world;
  height = 290;
  width = 520;
  speed = 4;
  invulnerable = false;
  healthBar;
  poisonBar;
  poisonCollected = 0;
  isAfterDoor;
  hasPassedDoor;
  deadAnimationPlayed = false;
  hasKey = false;
  isVisible = true;
  animationIntervals = [];
  offset = { top: 60, bottom: 10, left: 215, right: 200 };

  constructor(world) {
    super();
    this.world = world;
    this.addToImageCache('idle', LOADED_IMAGES.character.idle);
    this.addToImageCache('walk', LOADED_IMAGES.character.walk);
    this.addToImageCache('jump', LOADED_IMAGES.character.jump);
    this.addToImageCache('die', LOADED_IMAGES.character.die);
    this.addToImageCache('hurt', LOADED_IMAGES.character.hurt);
    this.img = this.imageCache['idle_0'];
    this.initCharacter();
    this.canMoveLeftFlag = true;
  }

  initCharacter() {
    this.applyGravity();
    this.energy = 100;
    this.x = 0;
    // this.x = 4400;
    this.y = 150;
    this.hasPassedDoor = false;
    this.isAfterDoor = false;
    // this.healthBar.setPercentage(0)
    // this.poisonBar.setPercentage(0);
    this.world.camera_x = -this.x - 190;
    this.canMoveLeftFlag = true;
    
    // this.animate(LOADED_IMAGES.character.idle, 'idle');
  }

  /*   update() {
    if (!this.isVisible || this.energy <= 0) return;
    if (this.energy <= 0 && !this.deadAnimationPlayed) {
      this.die();
    }
    this.animate(LOADED_IMAGES.character.idle, 'idle');
    this.handleMovements();
    this.updateCamera();
  } */

  handleMovements() {
    const isMovingRight =
      this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x + 200;
    const isMovingLeft =
      this.world.keyboard.LEFT && this.x > -500 && this.canMoveLeft();
    if (isMovingRight) {
      this.otherDirection = false;
      this.moveRight();
    }
    if (isMovingLeft) {
      this.otherDirection = true;
      this.moveLeft();
    }
    if (isMovingRight || isMovingLeft) {
      this.animate(LOADED_IMAGES.character.walk, 'walk');
      playWalkingSound();
    } else {
      this.animate(LOADED_IMAGES.character.idle, 'idle');
      stopWalkingSound();
    }
    if (this.world.keyboard.JUMP && !this.isAboveGround()) {
      this.jump();
    }
  }

  handleAnimations() {
    if (this.isDead()) {
      this.animate(LOADED_IMAGES.character.die);
    } else if (this.isHurt()) {
      this.animate(LOADED_IMAGES.character.hurt);
    } else if (this.isAboveGround()) {
      this.animate(LOADED_IMAGES.character.jump);
    } else if (this.isMoving()) {
      this.animate(LOADED_IMAGES.character.walk);
    } else {
      this.animate(LOADED_IMAGES.character.idle);
    }
  }

  jump() {
    if (!this.isAboveGround()) {
      this.speedY = 33;
      playJumpSound();
    }
  }

  updateCamera() {
    this.world.camera_x = -this.x - 190;
  }

  /*   takeDamage(damage) {
    if (this.energy > 0 && !this.invulnerable) {
      this.energy -= damage;
      this.lastHit = Date.now();
      this.world.characterStatusBar.setPercentage(this.energy);
      this.playAnimation(LOADED_IMAGES.character.hurt);
      if (this.energy <= 0) {
        this.die();
      } else {
        this.invulnerable = true;
        setTimeout(() => (this.invulnerable = false), 1000);
      }
    }
  } */

  /*   die() {
    if (!this.deadAnimationPlayed) {
      this.saveLastPosition();
      this.deadAnimationPlayed = true;
      this.isVisible = true;
      this.playDeathAnimation(() => {
        // this.isVisible = false;
        this.freezeAtDeathPose();
        this.world.endGame.showYouLostScreen();
      });
    }
  } */

  /*   playDeathAnimation(callback) {
    let deathIndex = 0;
    const deathImages = LOADED_IMAGES.character.die;

    if (!deathImages || deathImages.length === 0) {
      if (callback) callback();
      return;
    }

    const deathInverval = setInterval(() => {
      if (deathIndex < deathImages.length) {
        this.img = this.imageCache[deathImages[deathIndex]];
        deathIndex++;
      } else {
        clearInterval(deathInverval);
        if (callback) callback();
      }
    }, 150);
  } */

  /*   freezeAtDeathPose() {
    const deathImages = LOADED_IMAGES.character.die;
    if (deathImages && deathImages.length > 0) {
      const lastDeathFrameKey = deathImages[deathImages.length - 1];
      this.img = this.imageCache[lastDeathFrameKey];
    }
  } */

  stopAllAnimations() {
    this.animationIntervals.forEach(clearInterval);
    this.animationIntervals = [];
  }

  reset() {
    this.speed = 4;
    this.stopAllAnimations();
    Object.assign(this, {
      y: 150,
      isVisible: true,
      energy: 100,
      deadAnimationPlayed: false,
      invulnerable: false,
      currentImage: 0,
      speedY: 0,
      acceleration: 2.5,
    });
    this.poisonCollected = 5;
    this.poisonStatusBar.setPercentage(this.poisonCollected * 20);
    this.animate(LOADED_IMAGES.character.idle, 'idle');
    this.stopGravity();
    this.applyGravity();
  }

  enterDoor(door) {
    if (this.hasPassedDoor) return;
    this.isVisible = false;
    this.x = door.x;
    this.y = door.y;
    setTimeout(() => {
      this.isVisible = false;
      setTimeout(() => {
        this.x = 6471;
        this.y = 150;
        this.world.camera_x = -this.x - 190;
        this.isVisible = true;
        this.isAfterDoor = true;
        this.hasPassedDoor = true;
        this.world.snakes = this.world.level.snakes || [];
        setTimeout(() => {
          this.isAfterDoor = false;
        }, 2000);
        playNewSound();
      }, 200);
    }, 2000);
  }

  canMoveLeft() {
    if (this.hasPassedDoor && this.x < 6471) return false;
    return this.canMoveLeftFlag && !this.isAfterDoor;
  }

  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  collectPoison(poison, index) {
    if (poison && poison.isActive) {
      poison.deactivate();
      this.poisonCollected += 1;
      this.poisonStatusBar.setPercentage(this.poisonCollected * 20);
      this.world.poisonsArray.splice(index, 1);
      playCollectPoisonBottleSound();
    }
  }

  collectKey(key) {
    if (key && key.isActive) {
      key.deactivate();
      this.hasKey = true;
    }
  }

  /*   hit(enemy) {
    const distance = Math.abs(this.x - enemy.x);
    if (!this.invulnerable && distance < 100) {
      this.takeDamage(5);
      this.world.characterStatusBar.setPercentage(this.energy);
      this.playAnimation(LOADED_IMAGES.character.hurt);
    }
  } */

  throwPoisonBottle() {
    if (this.poisonCollected === 0) {
      return;
    }
    this.poisonCollected--;
    this.poisonStatusBar.setPercentage(this.poisonCollected * 20);
    const offsetX = this.otherDirection ? -220 : 220;
    const poisonBottle = new ThrowableObject(this.x + offsetX, this.y + 50);
    poisonBottle.otherDirection = this.otherDirection;
    this.world.throwableObjects.push(poisonBottle);
  }

  resetPosition(position) {
    const resetPos = {
      x: (position?.x || this.lastPosition?.x || 90) - 100,
      y: position?.y || this.lastPosition?.y || 150,
    };
    this.x = resetPos.x < 0 ? 0 : resetPos.x;
    this.y = resetPos.y;
    this.energy = 100;
    this.isVisible = true;
    this.deadAnimationPlayed = false;
    this.invulnerable = false;
    // this.playAnimation(LOADED_IMAGES.character.idle);
    this.stopGravity();
    this.applyGravity();
  }

  saveLastPosition() {
    this.lastPosition = { x: this.x, y: this.y };
  }

  drawFrame() {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    const offsetX = this.x + this.offset.left;
    const offsetY = this.y + this.offset.top;
    const offsetWidth = this.width - this.offset.left - this.offset.right;
    const offsetHeight = this.height - this.offset.top - this.offset.bottom;

    ctx.strokeRect(offsetX, offsetY, offsetWidth, offsetHeight);
  }
}
