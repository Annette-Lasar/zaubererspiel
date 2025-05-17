class Character extends MovableObject {
  world;
  height;
  width;
  speed = 4;
  invulnerable = false;
  healthBar;
  poisonBar;
  keyIcon;
  tickIcon;
  energy = 100;
  poisonCollected = 0;
  keyCollected = true;
  hasPassedDoor = false;
  deadAnimationPlayed = false;
  hasKey = false;
  animationIntervals = [];
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
    this.applyGravity();
    // this.healthBar.setPercentage(0)
    // this.poisonBar.setPercentage(0);
  }

  setKeyIcon(keyIcon) {
    this.keyIcon = keyIcon;
  }

  setTickIcon(tickIcon) {
    this.tickIcon = tickIcon;
  }

  drawTickIcon() {
    if (this.keyCollected) {
      this.world.a
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
      console.log('Ich werde ausgeführt.');
      this.animate(LOADED_IMAGES.character.jump);
    } else if (this.isMoving()) {
      this.animate(LOADED_IMAGES.character.walk);
      // console.log('x-wert character: ', this.x);
    } else {
      this.animate(LOADED_IMAGES.character.idle);
    }
  }

  jump() {
    if (!this.isAboveGround()) {
      this.speedY = 38;
      playJumpSound();
    }
  }

  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  drawFrame(ctx) {
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
