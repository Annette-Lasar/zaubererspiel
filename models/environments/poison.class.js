class PoisonObject extends MovableObject {
  isActive = true;
  constructor(x, y) {
    super();
    this.addToImageCache('poison', LOADED_IMAGES.game_items.poison);
    this.img = this.imageCache['poison_0'];
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
  }

  handleAnimations() {
    this.animate(LOADED_IMAGES.game_items.poison);
  }
}
