class Trap extends MovableObject {
  offset = { top: 55, bottom: 50, left: 30, right: 30 };

  constructor(x) {
    super();
    this.addToImageCache('trap', LOADED_IMAGES.game_items.trap);
    this.img = this.imageCache['trap_0'];
    this.x = x;
    this.y = 380;
    this.height = 180;
    this.width = 180;
  }

  handleAnimations() {
    this.animate(LOADED_IMAGES.game_items.trap);
  }


    drawFrame() {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 2;

    const offsetX = this.x + this.offset.left;
    const offsetY = this.y + this.offset.top;
    const offsetWidth = this.width - this.offset.left - this.offset.right;
    const offsetHeight = this.height - this.offset.top - this.offset.bottom;

    ctx.strokeRect(offsetX, offsetY, offsetWidth, offsetHeight);
  }
}
