class PoisonObject extends MovableObject {
  offset = { top: 0, bottom: 0, left: 10, right: 10 };
  constructor(x) {
    super();
    this.addToImageCache('poison', LOADED_IMAGES.game_items.poison);
    this.img = this.imageCache['poison_0'];
    this.x = x;
    this.y = Math.floor(Math.random() * 220);
    this.startY = this.y;
    this.width = 70;
    this.height = 70;
  }

  update() {
    this.handleAnimations();
    this.handleFloating();
  }

  handleAnimations() {
    this.animate(LOADED_IMAGES.game_items.poison);
  }
}
