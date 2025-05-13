class Crystal extends MovableObject {
  constructor(x, y) {
    super();
    this.img = LOADED_IMAGES.game_items.crystal;
    // this.x = 13660;
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
  }
}
