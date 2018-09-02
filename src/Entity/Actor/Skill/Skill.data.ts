import { Skill, SkillNames, SkillLevels } from "./Skill";

interface SkillMap {
  [key: string]: Skill
}

const defaultSkills: SkillMap = {
  [SkillNames.ACROBATICS]: new Skill({
    name: SkillNames.ACROBATICS,
    level: SkillLevels.POOR,
    description: '',
    xp: 0,
    scale: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  })
};

export { defaultSkills, SkillMap };