/* class KnightHealthDisplay extends DrawableObject {
  constructor(knight) {
    super();
    this.loadImage(LOADED_IMAGES.game_items.hearts[0]);
    this.addToImageCache('hearts', LOADED_IMAGES.game_items.hearts);
    this.knight = knight;
    this.x = 0;
    this.y = 0;
    this.width = 120;
    this.height = 30;
    this.energy = knight.energy;
  }

  update() {
    if (this.knight) {
      this.energy = this.knight.energy;
    }
  }

  draw(ctx) {
    this.update();
    let heartDistance = 40;
    for (let i = 0; i < 3; i++) {
      let key = (this.energy || 0) > i * 10 ? 'hearts_1' : 'hearts_0';
      let img = this.imageCache[key];
      ctx.drawImage(img, this.x + i * heartDistance, this.y, 30, 30);
    }
  }

  updatePosition(knightX, knightY) {
    this.x = knightX + 145;
    this.y = knightY + 30;
  }
} */
