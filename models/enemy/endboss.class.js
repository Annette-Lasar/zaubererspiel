class Endboss extends MovableObject {
  innerOffset = { top: 10, bottom: 100, left: 250, right: 180 };
  outerOffset = { top: 10, bottom: 100, left: 40, right: 50 };
  constructor(id) {
    super(id);
    this.addToImageCache('walk', LOADED_IMAGES.troll.walk);
    this.addToImageCache('hurt', LOADED_IMAGES.troll.hurt);
    this.addToImageCache('dead', LOADED_IMAGES.troll.die);

    this.img = this.imageCache['walk_0'];
    this.deadAnimationPlayed = false;
    this.height = 409;
    this.width = 700;
    this.y = 100;
    this.x = 5700;
    this.speed = 0.5;
    this.deadSound = new Audio('./assets/audio/troll_dead.mp3');
    
    this.energy = 100;
    this.patrolLeftLimit = 13150;
    this.patrolRightLimit = 13500;
    this.initialX = this.x;
    this.initialY = this.y;
  }

  handleAnimations() {
    this.animate(LOADED_IMAGES.troll.walk);
  }

  patrol() {
    if (this.dead) return;
    if (this.x <= this.patrolLeftLimit) {
      this.otherDirection = false;
    } else if (this.x >= this.patrolRightLimit) {
      this.otherDirection = true;
    }
    this.x += this.otherDirection ? -this.speed : this.speed;
  }

  drawInnerFrame() {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'orchid';
    ctx.lineWidth = 2;

    const innerOffsetX = this.x + this.innerOffset.left;
    const innerOffsetY = this.y + this.innerOffset.top;
    const innerOffsetWidth = this.width - this.innerOffset.left - this.innerOffset.right;
    const innerOffsetHeight = this.height - this.innerOffset.top - this.innerOffset.bottom;

    ctx.strokeRect(innerOffsetX, innerOffsetY, innerOffsetWidth, innerOffsetHeight);
  }

    drawOuterFrame() {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'royalblue';
    ctx.lineWidth = 2;

    const outerOffsetX = this.x + this.outerOffset.left;
    const outerOffsetY = this.y + this.outerOffset.top;
    const outerOffsetWidth = this.width - this.outerOffset.left - this.outerOffset.right;
    const outerOffsetHeight = this.height - this.outerOffset.top - this.outerOffset.bottom;

    ctx.strokeRect(outerOffsetX, outerOffsetY, outerOffsetWidth, outerOffsetHeight);
  }
}
