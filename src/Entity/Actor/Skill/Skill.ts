enum SkillLevels {
  POOR = 'poor',
  AVERAGE = 'average',
  FAIR = 'fair',
  GOOD = 'good',
  ADVANCED = 'advanced',
  EXCEPTIONAL = 'exceptional',
  LEGENDARY = 'legendary',
  MYTHICAL = 'mythical'
}

enum LevelingAllotment {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

enum SkillNames {
  ONE_HANDED = 'one-handed',
  TWO_HANDED = 'two-handed',
  SHIELD = 'shield',
  ARCHERY = 'archery',
  ARMORER = 'armorer',
  ACROBATICS = 'acrobatics',
  EXOTIC_WEAPON = 'exotic weapon',
  TRAPFINDING = 'trapfinding',
  DUNGEONEERING = 'dungeoneering',
  ALCHEMY = 'alchemy',
  LANGUAGE = 'languge',
  LUCK = 'luck',
  DODGING = 'dodging',
  PARRYING = 'parrying',
  GRAPPLING = 'grappling'
}

const SkillLevelTokens = {
  [SkillLevels.POOR]: '_',
  [SkillLevels.AVERAGE]: '~',
  [SkillLevels.FAIR]: '-',
  [SkillLevels.GOOD]: '=',
  [SkillLevels.ADVANCED]: '+',
  [SkillLevels.EXCEPTIONAL]: 'ē',
  [SkillLevels.LEGENDARY]: 'Ł',
  [SkillLevels.MYTHICAL]: 'Ÿ',
};

interface ISkill {
  name: SkillNames,
  level: SkillLevels,
  allotment?: LevelingAllotment,
  description: string,
  xp: number,
  scale: number[]
}

class Skill implements ISkill {

  public name: SkillNames;
  public level: SkillLevels;
  public description: string;
  public xp: number;
  public scale: number[];
  public allotment: LevelingAllotment = LevelingAllotment.NONE;

  constructor (options: ISkill) {
    for (let key in options) {
      this[key] = options[key];
    }
    if (this.scale.length < Object.keys(SkillLevels).length - 1) {
      throw new Error('In Skill::contstructor, scale less the skill level');
    }
  }

  update (applyXp: number) {
    this.xp += applyXp;
    const { xp, scale } = this;
    if (xp > scale[0]) {
      this.level = SkillLevels.MYTHICAL;
    } else if (xp > scale[1]) {
      this.level = SkillLevels.LEGENDARY;
    } else if (xp > scale[2]) {
      this.level = SkillLevels.EXCEPTIONAL;
    } else if (xp > scale[3]) {
      this.level = SkillLevels.ADVANCED;
    } else if (xp > scale[4]) {
      this.level = SkillLevels.GOOD;
    } else if (xp > scale[5]) {
      this.level = SkillLevels.FAIR;
    } else if (xp > scale[6]) {
      this.level = SkillLevels.AVERAGE;
    } else {
      this.level = SkillLevels.POOR;
    }
  }

}

export { SkillLevels, SkillNames, ISkill, Skill, SkillLevelTokens, LevelingAllotment };