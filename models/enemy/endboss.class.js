/* class Endboss extends Enemy {
  constructor(id) {
    super(id);
    this.loadImage(LOADED_IMAGES.troll.walk[0]);

    this.addToImageCache('walk', LOADED_IMAGES.troll.walk);
    this.addToImageCache('attack', LOADED_IMAGES.troll.attack);
    this.addToImageCache('hurt', LOADED_IMAGES.troll.hurt);
    this.addToImageCache('dead', LOADED_IMAGES.troll.dead);

    this.deadAnimationPlayed = false;
    this.height = 450;
    this.width = 360;
    this.y = 50;
    this.x = 13250;
    this.attackRange = 200;
    this.attackDamage = 20;
    this.speed = 0.5;
    this.deadSound = new Audio('./assets/audio/troll_dead.mp3');
    this.offset = { top: 50, bottom: 20, left: 20, right: 20 };
    this.otherDirection = true;
    this.energy = 100;
    this.patrolLeftLimit = 13150;
    this.patrolRightLimit = 13500;
    this.initialX = this.x;
    this.initialY = this.y;

    this.animate();
  }

  setWorld(world) {
    this.world = world;
  }

  attack(character) {
    if (this.dead || this.isAttacking) return;
    this.isAttacking = true;
    this.playAnimation(LOADED_IMAGES.troll.attack, 100);
    setTimeout(() => {
      if (this.isInAttackRange(character)) {
        character.takeDamage(this.attackDamage);
        this.takeDamage(character.attackDamage);
      }
    }, 300);
    setTimeout(() => {
      this.isAttacking = false;
    }, 1000);
  }


  takeDamage(damage) {
    if (this.dead) return;
    this.energy -= damage;
    this.energy = Math.max(0, this.energy);
    if (this.energy > 0) {
      this.playAnimation(LOADED_IMAGES.troll.hurt);
    } else {
      this.playAnimation(LOADED_IMAGES.troll.hurt);
      setTimeout(() => {
        this.die();
      }, LOADED_IMAGES.troll.hurt.length * 250);
    }
  }

  die() {
    if (this.dead) return;
    this.dead = true;
    this.playAnimation(LOADED_IMAGES.troll.dead, 200);
    if (this.world && this.world.soundOn) {
      this.deadSound.play();
    }
    setTimeout(() => {
      this.spawnCrystal();
      this.removeEnemy();
    }, LOADED_IMAGES.troll.dead.length * 200);
  }

  spawnCrystal() {
    if (!this.world || !this.world.level) return;
    const crystal = new Crystal(
      this.x + this.width / 2 - 40,
      this.y + this.height / 2 - 40
    );
    this.world.level.objects.push(crystal);
    this.world.crystal = crystal;
  }

  patrol() {
    if (this.dead) return;
    if (this.x <= this.patrolLeftLimit) {
      this.otherDirection = false;
    } else if (this.x >= this.patrolRightLimit) {
      this.otherDirection = true;
    }
    this.x += this.otherDirection ? -this.speed : this.speed;
  }

  update(character) {
    if (this.dead) return;
    if (this.isInAttackRange(character)) {
      this.attack(character);
    } else {
      this.patrol();
    }
  }

  draw(ctx) {
    ctx.save();
    this.drawImage(ctx);
    ctx.restore();
  }


  drawImage(ctx) {
    if (this.img && this.img.complete) {
      if (this.otherDirection) {
        ctx.translate(this.x + this.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(
        this.img,
        this.otherDirection ? 0 : this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  animate() {
    let i = 0;
    setInterval(() => {
      if (this.dead && !this.deadAnimationPlayed) {
        this.playDeathAnimation();
      } else if (this.isAttacking) {
        this.playAnimation(LOADED_IMAGES.troll.attack, 100);
      } else if (this.isHurt()) {
        this.playAnimation(LOADED_IMAGES.troll.hurt, 250);
      } else {
        this.playAnimation(LOADED_IMAGES.troll.walk, 150);
      }
      i++;
      if (this.x >= 13250 && this.x <= 13500) {
        this.hadFirstContact = true;
      }
    }, 100);
  }

  isInAttackRange(character) {
    return Math.abs(this.x - character.x) < this.attackRange;
  }

  resetPosition() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.dead = false;
    this.isVisible = true;
  }
} */

class Endboss extends Enemy {
  constructor(id) {
    super(id);
    this.addToImageCache('walk', LOADED_IMAGES.troll.walk);
    this.addToImageCache('attack', LOADED_IMAGES.troll.attack);
    this.addToImageCache('hurt', LOADED_IMAGES.troll.hurt);
    this.addToImageCache('dead', LOADED_IMAGES.troll.dead);

    this.img = this.imageCache['walk_0'];
    this.deadAnimationPlayed = false;
    this.height = 450;
    this.width = 360;
    this.y = 50;
    this.x = 13250;
    this.attackRange = 200;
    this.attackDamage = 20;
    this.speed = 0.5;
    this.deadSound = new Audio('./assets/audio/troll_dead.mp3');
    this.offset = { top: 50, bottom: 20, left: 20, right: 20 };
    this.otherDirection = true;
    this.energy = 100;
    this.patrolLeftLimit = 13150;
    this.patrolRightLimit = 13500;
    this.initialX = this.x;
    this.initialY = this.y;

    this.startBehaviorLoop();
  }

  setWorld(world) {
    this.world = world;
  }

  attack(character) {
    if (this.dead || this.isAttacking) return;
    this.isAttacking = true;
    this.playAnimation(LOADED_IMAGES.troll.attack, 100);
    setTimeout(() => {
      if (this.isInAttackRange(character)) {
        character.takeDamage(this.attackDamage);
        this.takeDamage(character.attackDamage);
      }
    }, 300);
    setTimeout(() => {
      this.isAttacking = false;
    }, 1000);
  }

  /*   takeDamage(damage) {
    if (this.dead) return;
    this.energy -= damage;
    this.energy = Math.max(0, this.energy);
    if (this.energy > 0) {
      this.playAnimation(LOADED_IMAGES.troll.hurt);
    } else {
      this.playAnimation(LOADED_IMAGES.troll.hurt);
      setTimeout(() => {
        this.die();
      }, LOADED_IMAGES.troll.hurt.length * 250);
    }
  } */

  die() {
    if (this.dead) return;
    this.dead = true;
    this.playAnimation(LOADED_IMAGES.troll.dead, 200);
    if (this.world && this.world.soundOn) {
      this.deadSound.play();
    }
    setTimeout(() => {
      // this.spawnCrystal();
      this.removeEnemy();
    }, LOADED_IMAGES.troll.dead.length * 200);
  }

  /*   spawnCrystal() {
    if (!this.world || !this.world.level) return;
    const crystal = new Crystal(
      this.x + this.width / 2 - 40,
      this.y + this.height / 2 - 40
    );
    this.world.level.objects.push(crystal);
    this.world.crystal = crystal;
  } */

  patrol() {
    if (this.dead) return;
    if (this.x <= this.patrolLeftLimit) {
      this.otherDirection = false;
    } else if (this.x >= this.patrolRightLimit) {
      this.otherDirection = true;
    }
    this.x += this.otherDirection ? -this.speed : this.speed;
  }

  update(character) {
    if (this.dead) return;
    if (this.isInAttackRange(character)) {
      this.attack(character);
    } else {
      this.patrol();
    }
  }

  startBehaviorLoop() {
    let i = 0;
    setInterval(() => {
      if (this.dead && !this.deadAnimationPlayed) {
        this.playDeathAnimation();
      } else if (this.isAttacking) {
        this.animate(LOADED_IMAGES.troll.attack, 'attack');
      } else if (this.isHurt()) {
        this.animate(LOADED_IMAGES.troll.hurt, 'hurt');
      } else {
        this.animate(LOADED_IMAGES.troll.walk, 'walk');
      }

      if (this.x >= 13250 && this.x <= 13500) {
        this.hadFirstContact = true;
      }

      i++;
    }, 100);
  }

  isInAttackRange(character) {
    return Math.abs(this.x - character.x) < this.attackRange;
  }

  resetPosition() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.dead = false;
    this.isVisible = true;
  }
}
