class DrawableObject {
  constructor(x = 0, y = 0, width = 100, height = 100) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img;
    this.imageCache = {};
    this.currentImage = 0;
    this.offset = { top: 0, bottom: 0, left: 0, right: 0 };
  }

  setStatusBars(healthBar, poisonBar = null) {
    this.healthBar = healthBar;
    this.poisonBar = poisonBar;
  }

  loadImage(imageObject) {
    if (imageObject instanceof HTMLImageElement) {
      this.img = imageObject;
    } else {
      console.error(
        'loadImage expects an HTMLImageElement but got:',
        imageObject
      );
    }
  }

  addToImageCache(prefix, imagesArray) {
    if (!Array.isArray(imagesArray)) return;
    imagesArray.forEach((img, index) => {
      if (img instanceof HTMLImageElement) {
        this.imageCache[`${prefix}_${index}`] = img;
      } else {
        console.warn(
          `Unloaded image in array ${prefix} at index ${index}:`,
          img
        );
      }
    });
  }

  playAnimation(images) {
    if (!images || !images.length) return;
    this.img = images[this.currentImage % images.length];
    this.currentImage++;
  }

  draw(ctx) {
    let img = this.img || this.imageCache?.[this.currentImageKey];

    if (img instanceof HTMLImageElement) {
      ctx.drawImage(img, this.x, this.y, this.width, this.height);
    } else {
      console.warn(
        `[draw()] Kein Bild für ${this.constructor.name}:`,
        this.currentImageKey
      );
    }
  }

  getCollisionBox() {
    return {
      x: this.x + this.offset.left,
      y: this.y + this.offset.top,
      width: this.width - this.offset.left - this.offset.right,
      height: this.height - this.offset.top - this.offset.bottom,
    };
  }
}
