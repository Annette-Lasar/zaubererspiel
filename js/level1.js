/**
 * Initializes and returns the first level.
 * @returns {Level} The initialized level.
 */
// const level1 = initLevel();

/**
 * Initializes the level by generating enemies, environments, backgrounds, poison objects, and traps.
 * @returns {Level} The initialized level.
 */
function createLevel1() {
  return new Level(
    generateBackgroundsLvl(),
    generateKnightsLvl(),
    generatePoisonsLvl(),
    generateKeyLvl(),
    generateDoorLvl(),
    generateSnakesLvl(),
    generateTrapsLvl(),
    generateCrystalLvl(),
    generateEndboss()
  );
}

function generateBackgroundsLvl() {
  return [
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood7, -719),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood6, -719),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood4, -719, 0),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood3, -719, 100),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood2, -719),
    new BackgroundObject(LOADED_IMAGES.game_items.candle, -685, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood1, -719),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood7, 0),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood6, 0),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood4, 0, 0),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood3, 0, 100),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood2, 0),
    new BackgroundObject(LOADED_IMAGES.game_items.candle, 150, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood1, 0),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood7, 719),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood6, 719),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood4, 719, 0),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood3, 719, 100),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood2, 719),
    new BackgroundObject(LOADED_IMAGES.game_items.candle, 740, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.game_items.skull, 950, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood1, 719),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood7, 719 * 2),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood6, 719 * 2),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.green_wood.wood4,
      719 * 2,
      0
    ),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.blue_wood.wood3,
      719 * 2,
      100
    ),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood2, 719 * 2),
    new BackgroundObject(LOADED_IMAGES.game_items.candle, 1400, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood1, 719 * 2),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood7, 719 * 3),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood6, 719 * 3),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.green_wood.wood4,
      719 * 3,
      0
    ),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.blue_wood.wood3,
      719 * 3,
      100
    ),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood2, 719 * 3),
    new BackgroundObject(LOADED_IMAGES.game_items.candle, 2200, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.game_items.skull, 2400, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood1, 719 * 3),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood7, 719 * 4),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood6, 719 * 4),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.green_wood.wood4,
      719 * 4,
      0
    ),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.blue_wood.wood3,
      719 * 4,
      100
    ),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood2, 719 * 4),
    new BackgroundObject(LOADED_IMAGES.game_items.candle, 3000, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.game_items.skull, 3200, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood1, 719 * 4),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood7, 719 * 5),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood6, 719 * 5),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.green_wood.wood4,
      719 * 5,
      0
    ),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.blue_wood.wood3,
      719 * 5,
      100
    ),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood2, 719 * 5),
    new BackgroundObject(LOADED_IMAGES.game_items.candle, 3700, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.game_items.skull, 3900, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood1, 719 * 5),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood7, 719 * 6),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood6, 719 * 6),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.green_wood.wood4,
      719 * 6,
      0
    ),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.blue_wood.wood3,
      719 * 6,
      100
    ),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood2, 719 * 6),
    new BackgroundObject(LOADED_IMAGES.game_items.candle, 4400, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.game_items.skull, 4600, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood1, 719 * 6),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood7, 719 * 7),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood6, 719 * 7),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.green_wood.wood4,
      719 * 7,
      0
    ),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.blue_wood.wood3,
      719 * 7,
      100
    ),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood2, 719 * 7),
    new BackgroundObject(LOADED_IMAGES.game_items.candle, 5100, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.game_items.skull, 5300, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood1, 719 * 7),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood7, 719 * 8),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood6, 719 * 8),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.green_wood.wood4,
      719 * 8,
      0
    ),
    new BackgroundObject(
      LOADED_IMAGES.backgrounds.blue_wood.wood3,
      719 * 8,
      100
    ),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood2, 719 * 8),
    new BackgroundObject(LOADED_IMAGES.game_items.candle, 5800, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.game_items.skull, 6000, 50, 10, 30),
    new BackgroundObject(LOADED_IMAGES.backgrounds.green_wood.wood1, 719 * 8),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 6471),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 7190),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 7910),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 8629),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 9348),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 10067),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 10786),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 11505),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 12225),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 12944),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 13000),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 13719),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 14438),
    new BackgroundObject(LOADED_IMAGES.backgrounds.blue_wood.wood2, 15157),
  ];
}

function generateKnightsLvl() {
  return [
    new Knight(0, 900, 1),
    new Knight(2000, 1500, 2),
    new Knight(4000, 2100, 3),
    new Knight(8000, 2700, 4),
    new Knight(10000, 3300, 5),
    new Knight(12000, 3900, 6),
  ];
}

/**
 * Generates the poison objects for the level.
 * @returns {Array} An array of poison objects.
 */
function generatePoisonsLvl() {
  return [
    new PoisonObject(800, 400),
    new PoisonObject(1600, 300),
    new PoisonObject(2400, 200),
    new PoisonObject(3200, 400),
    new PoisonObject(4000, 300),
    new PoisonObject(6400, 200),
  ];
}

function generateKeyLvl() {
  return new Key(4500, 130);
}

function generateDoorLvl() {
  return new Door(4500, 80);
}

function generateSnakesLvl() {
  return [
    new Snake(7000, 200, 7),
    new Snake(8300, 200, 8),
    new Snake(9500, 200, 9),
    new Snake(10700, 200, 10),
    new Snake(11700, 200, 11),
  ];
}

/**
 * Generates the traps for the level.
 * @returns {Array} An array of traps.
 */
function generateTrapsLvl() {
  return [
    new Trap(7500, 330),
    new Trap(8600, 330),
    new Trap(9900, 330),
    new Trap(11000, 330),
    new Trap(11700, 330),
  ];
}

function generateCrystalLvl() {
  return new Crystal(300, 380);
}

function generateEndboss() {
  return new Endboss(11800, 200, 12);
}
