/**
 * Class representing a Snake enemy.
 * @extends Enemy
 */
class Snake extends Enemy {
  /**
   * Creates an instance of Snake.
   * @param {number} [startX=400] - The starting x position of the snake.
   * @param {number} [moveRange=100] - The range within which the snake can move.
   * @param {number} [id] - The ID of the snake.
   */
  constructor(startX = 400, moveRange = 100, id) {
    super(id);
    this.addToImageCache('walk', LOADED_IMAGES.snake.walk);
    // this.addToImageCache('attack', LOADED_IMAGES.snake.attack);
    // this.addToImageCache('hurt', LOADED_IMAGES.snake.hurt);
    // this.addToImageCache('dead', LOADED_IMAGES.snake.dead);
    this.img = this.imageCache['walk_0'];
    this.x = startX;
    this.startX = startX;
    this.moveRange = moveRange;
    this.width = 250;
    this.height = 150;
    this.y = 320;
    this.energy = 10;
    this.dead = false;
    this.attackDamage = 10;
    this.attackRange = 50;
    this.speed = 0.5;
    this.otherDirection = true;
    this.initialX = startX;
    this.initialY = this.y;
    this.offset = { top: 60, bottom: 60, left: 50, right: 50 };
    this.intervalIDs = [];
  }

  handleAnimations() {
    this.animate(LOADED_IMAGES.snake.walk);
  }

  patrol() {
    // code
  }
}
