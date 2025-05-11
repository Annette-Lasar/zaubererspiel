/* 
class Knight extends Enemy {

  constructor(delay, startX, moveRange, id) {
    super(id);
    this.loadImage(LOADED_IMAGES.knight.walk[0]);
    this.addToImageCache('walk', LOADED_IMAGES.knight.walk);

    this.x = startX;
    this.startX = startX;
    this.moveRange = moveRange;
    this.energy = 30;
    this.speed = 0.01 + Math.random() * 0.05;
    this.attackDamage = 20;
    this.attackRange = 50;
    this.width = 520;
    this.height = 290;
    this.y = 190;
    this.offset = { top: 120, bottom: 70, left: 210, right: 210 };
    this.healthDisplay = new KnightHealthDisplay(this);
    this.statusBar = new StatusBar();
    this.statusBar.x = this.x + this.width / 2 - this.statusBar.width / 2;
    this.statusBar.y = this.y - 20;

    this.lastHit = 0;
    this.intervalIDs = [];
    setTimeout(() => {
      this.isMoving = true;
      this.animate();
    }, delay);
  }


  animate() {
    this.setCustomInterval(() => {
      if (this.dead) return;
      if (this.isAttacking) {
        this.playAnimation(LOADED_IMAGES.knight.attack);
      } else {
        this.playAnimation(LOADED_IMAGES.knight.walk);
      }
    }, 100);
  }


  getAttackBox(knightBox) {
    return {
      x: this.otherDirection
        ? knightBox.x - this.attackRange
        : knightBox.x + knightBox.width,
      y: knightBox.y,
      width: this.attackRange,
      height: knightBox.height,
    };
  }


  isInAttackRange(attackBox, characterBox) {
    if (!characterBox) {
      return false;
    }
    return (
      attackBox.x < characterBox.x + characterBox.width &&
      attackBox.x + attackBox.width > characterBox.x &&
      attackBox.y < characterBox.y + characterBox.height &&
      attackBox.y + attackBox.height > characterBox.y
    );
  }


  attack(character) {
    if (this.dead || this.isAttacking) return;
    this.isAttacking = true;
    this.playAnimation(LOADED_IMAGES.knight.attack);
    setTimeout(() => {
      this.isAttacking = false;
      if (
        character &&
        this.isInAttackRange(
          this.getAttackBox(this.getCollisionBox()),
          character.getCollisionBox()
        )
      ) {
        character.takeDamage(this.attackDamage);
      }
    }, 800);
  }


  update(character) {
    if (!character) {
      return;
    }
    super.update(character);
    this.healthDisplay.updatePosition(this.x, this.y);
    this.healthDisplay.energy = this.energy;
  }

  draw(ctx) {
    super.draw(ctx);
    this.healthDisplay.updatePosition(this.x, this.y);
    this.healthDisplay.draw(ctx);
  }


  hit(damage) {
    this.takeDamage(damage);
    if (this.isDead()) {
      this.playDeathAnimation();
      this.removeEnemy();
    } else if (this.isHurt()) {
      this.playHurtAnimation();
    }
  }


  takeDamage(amount) {
    if (this.dead) return;
    const now = Date.now();
    playEnemyHitSound();
    if (now - this.lastHit > 1000) {
      this.energy = Math.max(0, this.energy - amount);
      this.lastHit = now;
      if (this.energy <= 0) {
        this.die();
      } else {
        this.playHurtAnimation();
      }
    }
  }


  playHurtAnimation() {
    this.stopAllIntervals();
    let hurtIndex = 0;
    const hurtInterval = setInterval(() => {
      if (hurtIndex < LOADED_IMAGES.knight.hurt.length) {
        this.img = this.imageCache[`hurt_${hurtIndex}`];
        hurtIndex++;
      } else {
        clearInterval(hurtInterval);
        this.startNormalAnimation();
      }
    }, 150);
    this.intervalIDs.push(hurtInterval);
  }

  startNormalAnimation() {
    if (!this.dead) {
      this.animate();
    }
  }


  die() {
    if (this.dead) return;
    this.dead = true;
    this.isMoving = false;
    this.clearAllIntervals();
    this.playDeathAnimation();
    setTimeout(
      () => this.remove(),
      LOADED_IMAGES.knight.dead.length * 300 + 500
    );
  }


  playDeathAnimation() {
    if (this.deathAnimationPlayed) return;
    this.deathAnimationPlayed = true;
    this.clearAllIntervals();
    this.currentImage = 0;
    this.img = this.imageCache['dead_0'];
    this.animateDeath();
  }

  clearAllIntervals() {
    this.intervalIDs.forEach(clearInterval);
    this.intervalIDs = [];
  }


  animateDeath() {
    let deathIndex = 0;
    const deathInterval = setInterval(() => {
      if (deathIndex < LOADED_IMAGES.knight.dead.length) {
        this.img = this.imageCache[`dead_${deathIndex}`];
        deathIndex++;
      } else {
        clearInterval(deathInterval);
        setTimeout(() => {
          this.isRemoved = true;
        }, 1000);
      }
    }, 400);
  }


  remove() {
    this.removeEnemy();
  }
} */

class Knight extends Enemy {
  constructor(delay, startX, id) {
    super(id);
    this.addToImageCache('walk', LOADED_IMAGES.knight.walk);
    this.img = LOADED_IMAGES.knight.walk[0];
    this.x = startX;
    this.startX = startX;
    this.speed = 0.01 + Math.random() * 0.05;
    
    this.width = 520;
    this.height = 290;
    this.y = 190;
    this.offset = { top: 120, bottom: 70, left: 210, right: 210 };

    this.intervalIDs = [];
    setTimeout(() => {
      this.isMoving = true;
      this.animate();
    }, delay);
  }

  animate() {
    this.setCustomInterval(() => {
      this.playAnimation(LOADED_IMAGES.knight.walk);
    }, 200);
  }

  clearAllIntervals() {
    this.intervalIDs.forEach(clearInterval);
    this.intervalIDs = [];
  }

  remove() {
    this.removeEnemy();
  }

}
