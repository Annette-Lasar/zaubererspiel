class Trap extends Enemy {
  height = 180;
  width = 180;
  isActive = false;

  constructor(x, y) {
    super();
    this.loadImage(LOADED_IMAGES.game_items.trap[0]);
    this.addToImageCache('trap', LOADED_IMAGES.game_items.trap);
    this.x = x;
    this.y = y;
  }

  handleAnimations() {
    this.animate(LOADED_IMAGES.game_items.trap);
  }
}
