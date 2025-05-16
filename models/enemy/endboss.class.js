class Endboss extends Enemy {
  offset = { top: 150, bottom: 100, left: 140, right: 150 };
  constructor(id) {
    super(id);
    this.addToImageCache('walk', LOADED_IMAGES.troll.walk);
    this.addToImageCache('attack', LOADED_IMAGES.troll.attack);
    this.addToImageCache('hurt', LOADED_IMAGES.troll.hurt);
    this.addToImageCache('dead', LOADED_IMAGES.troll.dead);

    this.img = this.imageCache['walk_0'];
    this.deadAnimationPlayed = false;
    this.height = 450;
    this.width = 360;
    this.y = 50;
    this.x = 5200;
    this.speed = 0.5;
    this.deadSound = new Audio('./assets/audio/troll_dead.mp3');
    
    // this.otherDirection = true;
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

  drawFrame() {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'orchid';
    ctx.lineWidth = 2;

    const offsetX = this.x + this.offset.left;
    const offsetY = this.y + this.offset.top;
    const offsetWidth = this.width - this.offset.left - this.offset.right;
    const offsetHeight = this.height - this.offset.top - this.offset.bottom;

    ctx.strokeRect(offsetX, offsetY, offsetWidth, offsetHeight);
  }
}
