class Level {
  backgrounds;
  knights;
  poisons;
  key;
  door;
  snakes;
  traps;
  crystal;
  endboss;
  level_end_x = 13395;

  constructor(
    backgrounds,
    knights,
    poisons,
    key,
    door,
    snakes,
    traps,
    crystal,
    endboss
  ) {
    this.backgrounds = backgrounds || [];
    this.knights = knights || [];
    this.poisons = poisons || [];
    this.key = key;
    this.door = door;
    this.snakes = snakes;
    this.traps = traps || [];
    this.crystal = crystal;
    this.endboss = endboss;
  }
}
