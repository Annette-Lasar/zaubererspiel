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
    generateHeartsLvl(),
    generateKeyLvl(),
    generateDoorLvl(),
    generateTrapsLvl(),
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
    new PoisonObject(400),
    new PoisonObject(800),
    new PoisonObject(1600),
    new PoisonObject(3300),
    new PoisonObject(3700),
    new PoisonObject(4400),
  ];
}

function generateHeartsLvl() {
  return [
    new Heart(560),
    new Heart(1100),
    new Heart(2000),
    new Heart(2680),
    new Heart(3110),
    new Heart(3550),
    new Heart(4800),
    new Heart(5400),
  ];
}

function generateKeyLvl() {
  return new Key();
}

function generateDoorLvl() {
  return new Door(5500, 80);
}

/**
 * Generates the traps for the level.
 * @returns {Array} An array of traps.
 */
function generateTrapsLvl() {
  return [
    new Trap(800),
    new Trap(1600),
    new Trap(2600),
    new Trap(3400),
    new Trap(4800),
  ];
}

function generateEndboss() {
  return new Endboss(12);
}
