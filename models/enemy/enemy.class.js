/* class Enemy extends MovableObject {
  static nextId = 1;

  constructor(id) {
    super();
    this.deadAnimationPlayed = false;
    this.id = id || Enemy.nextId++;
    this.energy = 100;
    this.dead = false;
    this.isAttacking = false;
    this.deathAnimationPlayed = false;
    this.isRemoved = false;
    this.speed = 1;
    this.attackRange = 150;
    this.attackDamage = 10;
    this.otherDirection = false;
    this.intervalIDs = [];
  }

  setWorld(world) {
    this.world = world;
    if (!world.enemies.includes(this)) {
      world.enemies.push(this);
    }
  }

  patrol() {
    if (this.dead) return;
    this.x += this.otherDirection ? -this.speed : this.speed;
  }

  update(character) {
    if (this.isDead()) return;
    if (this.isInAttackRange(character)) {
      this.attack(character);
    } else {
      this.patrol();
    }
  }

  isInAttackRange(character) {
    const distance = Math.abs(this.x - character.x);
    return distance < this.attackRange;
  }

  attack(character) {
    if (this.dead || this.isAttacking) return;
    this.isAttacking = true;
    this.playAnimation(this.IMAGES_ATTACKING);
    setTimeout(() => {
      const characterBox = character.getCollisionBox();
      const thisBox = this.getCollisionBox();
      const isStillInRange =
        thisBox.x < characterBox.x + characterBox.width &&
        thisBox.x + thisBox.width > characterBox.x &&
        thisBox.y < characterBox.y + characterBox.height &&
        thisBox.y + thisBox.height > characterBox.y;
      if (isStillInRange) {
        character.takeDamage(this.attackDamage);
      }
      setTimeout(() => {
        this.isAttacking = false;
      }, 500);
    }, 400);
  }

  removeEnemy() {
    if (!this.world || !this.world.enemies) return;
    const index = this.world.enemies.indexOf(this);
    if (index > -1) {
      this.world.enemies.splice(index, 1);
    }
  }

  isDead() {
    return this.energy <= 0;
  }

  isColliding(mo) {
    if (!(mo instanceof DrawableObject)) return false;
    const colliding =
      this.x + this.width > mo.x &&
      this.x < mo.x + mo.width &&
      this.y + this.height > mo.y &&
      this.y < mo.y + mo.height;
  }

  setCustomInterval(fn, interval) {
    const id = setInterval(fn, interval);
    this.intervalIDs.push(id);
  }

  stopAllIntervals() {
    this.intervalIDs.forEach((id) => clearInterval(id));
    this.intervalIDs = [];
  }

  startMovement() {
    this.setCustomInterval(() => {
      if (!this.isDead()) {
        this.x += this.otherDirection ? -this.speed : this.speed;
      }
    }, 50);
  }

  startAnimation() {
    this.setCustomInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACKING);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  restart() {
    this.stopAllIntervals();
    this.x = this.initialX;
    this.y = this.initialY;
    this.energy = 100;
    this.startMovement();
    this.startAnimation();
  }
} */

class Enemy extends MovableObject {
  static nextId = 1;

  constructor(id) {
    super();
    this.deadAnimationPlayed = false;
    this.id = id || Enemy.nextId++;
    this.energy = 100;
    this.dead = false;
    this.isAttacking = false;
    this.deathAnimationPlayed = false;
    this.isRemoved = false;
    this.speed = 1;
    this.attackRange = 150;
    this.attackDamage = 10;
    this.otherDirection = false;
    this.intervalIDs = [];
  }

  /*   patrol() {
    if (this.dead) return;
    this.x += this.otherDirection ? -this.speed : this.speed;
  } */

  /*   update(character) {
    if (this.isDead()) return;
    if (this.isInAttackRange(character)) {
      this.attack(character);
    } else {
      this.patrol();
    }
  } */

  /*   isInAttackRange(character) {
    const distance = Math.abs(this.x - character.x);
    return distance < this.attackRange;
  } */

  /*   attack(character) {
    if (this.dead || this.isAttacking) return;
    this.isAttacking = true;
    this.playAnimation(this.IMAGES_ATTACKING);
    setTimeout(() => {
      const characterBox = character.getCollisionBox();
      const thisBox = this.getCollisionBox();
      const isStillInRange =
        thisBox.x < characterBox.x + characterBox.width &&
        thisBox.x + thisBox.width > characterBox.x &&
        thisBox.y < characterBox.y + characterBox.height &&
        thisBox.y + thisBox.height > characterBox.y;
      if (isStillInRange) {
        character.takeDamage(this.attackDamage);
      }
      setTimeout(() => {
        this.isAttacking = false;
      }, 500);
    }, 400);
  } */

  /*   removeEnemy() {
    if (!this.world || !this.world.enemies) return;
    const index = this.world.enemies.indexOf(this);
    if (index > -1) {
      this.world.enemies.splice(index, 1);
    }
  } */

  /*   setCustomInterval(fn, interval) {
    const id = setInterval(fn, interval);
    this.intervalIDs.push(id);
  } */

  /*  stopAllIntervals() {
    this.intervalIDs.forEach((id) => clearInterval(id));
    this.intervalIDs = [];
  } */
}
