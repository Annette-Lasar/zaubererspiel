class Character extends MovableObject {
  world;
  height;
  width;
  speed = 4;
  healthBar;
  poisonBar;
  keyIcon;
  tickIcon;
  energy = 100;
  bottleReady = true;
  poisonCollected = 0;
  keyCollected = false;
  hasPassedDoor = false;
  offset = { top: 40, bottom: 10, left: 5, right: 30 };

  constructor(world) {
    super();
    this.world = world;
    this.addToImageCache('idle', LOADED_IMAGES.character.idle);
    this.addToImageCache('walk', LOADED_IMAGES.character.walk);
    this.addToImageCache('jump', LOADED_IMAGES.character.jump);
    this.addToImageCache('die', LOADED_IMAGES.character.die);
    this.addToImageCache('hurt', LOADED_IMAGES.character.hurt);
    this.img = this.imageCache['idle_0'];
    this.x = 0;
    this.y = 270;
    this.width = 200;
    this.height = 239;
    this.soundWalking = LOADED_SOUNDS.character.walk;
    this.soundWalking.loop = true;
    this.soundWalking.volume = 0.1;
    this.soundJump = LOADED_SOUNDS.character.jump;
    this.soundJump.volume = 0.5;

    this.applyGravity();
  }

  update() {
    if (this.isDeadAlready) return;
    this.handleMovements();
    this.handleAnimations();
    this.healthBar.setPercentage(this.energy);
    this.poisonBar.setPercentage(this.poisonCollected);
  }

  setKeyIcon(keyIcon) {
    this.keyIcon = keyIcon;
  }

  setTickIcon(tickIcon) {
    this.tickIcon = tickIcon;
  }

  drawTickIcon() {
    if (this.keyCollected) {
      this.world.a;
    }
  }

  handleMovements() {
    const isMovingRight =
      this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x + 200;
    const isMovingLeft = this.world.keyboard.LEFT && this.x > -500;

    if (isMovingRight) {
      this.otherDirection = false;
      this.moveRight();
    }

    if (isMovingLeft) {
      this.otherDirection = true;
      this.moveLeft();
    }

    if (this.world.keyboard.JUMP && !this.isAboveGround()) {
      this.jump();
    }

    if ((isMovingRight || isMovingLeft) && noises) {
      this.startWalkingSound();
    } else {
      this.stopWalkingSound();
    }
  }

  handleAnimations() {
    if (this.isDead()) {
      if (!this.isDeadAlready) {
        this.playDeathAnimation(
          LOADED_IMAGES.character.die,
          LOADED_SOUNDS.character.die,
          () => {
            this.stopWalkingSound();
          }
        );
        LOADED_SOUNDS.game.background.pause();
        LOADED_SOUNDS.game.background.currentTime = 0;
        setTimeout(() => {
          this.world.triggerFailure();
        }, 3000);
      } else {
        this.animate(LOADED_IMAGES.character.die);
      }
      return;
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
      this.speedY = 40;
      if (noises) {
        this.soundJump.pause();
        this.soundJump.currentTime = 0;
        this.soundJump.play();
      }
    }
  }

  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  startWalkingSound() {
    if (this.soundWalking.paused) {
      this.soundWalking.currentTime = 0;
      this.soundWalking.play();
    }
  }

  stopWalkingSound() {
    if (!this.soundWalking.paused) {
      this.soundWalking.pause();
      this.soundWalking.currentTime = 0;
    }
  }


}
