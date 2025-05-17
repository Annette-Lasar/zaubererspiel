class Level {
  backgrounds;
  knights;
  poisons;
  hearts;
  key;
  door;
  traps;
  endboss;
  level_end_x = 6500;

  constructor(
    backgrounds,
    knights,
    poisons,
    hearts,
    key,
    door,
    traps,
    endboss
  ) {
    this.backgrounds = backgrounds || [];
    this.knights = knights || [];
    this.poisons = poisons || [];
    this.hearts = hearts || [];
    this.key = key;
    this.door = door;
    this.traps = traps || [];
    this.endboss = endboss;
  }
}
