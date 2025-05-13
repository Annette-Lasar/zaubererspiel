class Key extends MovableObject {
  constructor(x, y) {
    super();
    this.img = LOADED_IMAGES.game_items.key;
    this.x = x;
    this.y = y;
    this.startY = y;
    this.width = 70;
    this.height = 80;
    this.floatAmplitude = 20;
    this.floatSpeed = 2;
    this.floatOffset = 0;
  }

  handleFloating() {
    this.floatOffset += 0.05;
    this.y =
      this.startY +
      Math.sin(this.floatOffset * this.floatSpeed) * this.floatAmplitude;
  }
}
