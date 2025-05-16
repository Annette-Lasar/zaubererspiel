class Knight extends MovableObject {
  constructor(delay, startX, id) {
    super(id);
    this.addToImageCache('walk', LOADED_IMAGES.knight.walk);
    this.img = this.imageCache['walk_0'];
    this.x = startX;
    this.startX = startX;
    this.speed = 0.01 + Math.random() * 0.05;

    this.width = 520;
    this.height = 290;
    this.y = 190;
    this.offset = { top: 120, bottom: 70, left: 210, right: 210 };
  }

  handleAnimations() {
    this.animate(LOADED_IMAGES.knight.walk);
  }

  remove() {
    this.removeEnemy();
  }
}
