class Key extends MovableObject {
  offset = { top: 10, bottom: 10, left: 10, right: 10 };
  constructor(x = null, y = 130) {
    super();
    this.img = LOADED_IMAGES.game_items.key;
    this.x = x !== null ? x : 200 + Math.floor(Math.random() * 5000);
    this.y = y;
    this.startY = this.y;
    this.width = 70;
    this.height = 70;
    this.floatAmplitude = 20;
    this.floatSpeed = 2;
    this.floatOffset = 0;

    this.pingSound = LOADED_SOUNDS.key.collected;
    this.pingSound.volume = 0.5;
  }
}
