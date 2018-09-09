"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Skill_1 = require("./Skill");
const defaultSkills = {
    [Skill_1.SkillNames.ACROBATICS]: new Skill_1.Skill({
        name: Skill_1.SkillNames.ACROBATICS,
        level: Skill_1.SkillLevels.POOR,
        description: '',
        xp: 0,
        scale: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    })
};
exports.defaultSkills = defaultSkills;
//# sourceMappingURL=Skill.data.js.map