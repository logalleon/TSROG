"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SkillLevels;
(function (SkillLevels) {
    SkillLevels["POOR"] = "poor";
    SkillLevels["AVERAGE"] = "average";
    SkillLevels["FAIR"] = "fair";
    SkillLevels["GOOD"] = "good";
    SkillLevels["ADVANCED"] = "advanced";
    SkillLevels["EXCEPTIONAL"] = "exceptional";
    SkillLevels["LEGENDARY"] = "legendary";
    SkillLevels["MYTHICAL"] = "mythical";
})(SkillLevels || (SkillLevels = {}));
exports.SkillLevels = SkillLevels;
var LevelingAllotment;
(function (LevelingAllotment) {
    LevelingAllotment["NONE"] = "none";
    LevelingAllotment["LOW"] = "low";
    LevelingAllotment["MEDIUM"] = "medium";
    LevelingAllotment["HIGH"] = "high";
})(LevelingAllotment || (LevelingAllotment = {}));
exports.LevelingAllotment = LevelingAllotment;
var SkillNames;
(function (SkillNames) {
    SkillNames["ONE_HANDED"] = "one-handed";
    SkillNames["TWO_HANDED"] = "two-handed";
    SkillNames["SHIELD"] = "shield";
    SkillNames["ARCHERY"] = "archery";
    SkillNames["ARMORER"] = "armorer";
    SkillNames["ACROBATICS"] = "acrobatics";
    SkillNames["EXOTIC_WEAPON"] = "exotic weapon";
    SkillNames["TRAPFINDING"] = "trapfinding";
    SkillNames["DUNGEONEERING"] = "dungeoneering";
    SkillNames["ALCHEMY"] = "alchemy";
    SkillNames["LANGUAGE"] = "languge";
    SkillNames["LUCK"] = "luck";
    SkillNames["DODGING"] = "dodging";
    SkillNames["PARRYING"] = "parrying";
    SkillNames["GRAPPLING"] = "grappling";
})(SkillNames || (SkillNames = {}));
exports.SkillNames = SkillNames;
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
exports.SkillLevelTokens = SkillLevelTokens;
const ALLOCATION_ORDER = [LevelingAllotment.HIGH, LevelingAllotment.MEDIUM, LevelingAllotment.LOW, LevelingAllotment.NONE];
exports.ALLOCATION_ORDER = ALLOCATION_ORDER;
class Skill {
    constructor(options) {
        this.allotment = LevelingAllotment.NONE;
        for (let key in options) {
            this[key] = options[key];
        }
        if (this.scale.length < Object.keys(SkillLevels).length - 1) {
            throw new Error('In Skill::contstructor, scale less the skill level');
        }
    }
    update(applyXp) {
        this.xp += applyXp;
        const { xp, scale } = this;
        if (xp > scale[0]) {
            this.level = SkillLevels.MYTHICAL;
        }
        else if (xp > scale[1]) {
            this.level = SkillLevels.LEGENDARY;
        }
        else if (xp > scale[2]) {
            this.level = SkillLevels.EXCEPTIONAL;
        }
        else if (xp > scale[3]) {
            this.level = SkillLevels.ADVANCED;
        }
        else if (xp > scale[4]) {
            this.level = SkillLevels.GOOD;
        }
        else if (xp > scale[5]) {
            this.level = SkillLevels.FAIR;
        }
        else if (xp > scale[6]) {
            this.level = SkillLevels.AVERAGE;
        }
        else {
            this.level = SkillLevels.POOR;
        }
    }
    increaseLevelingAllocation() {
        switch (this.allotment) {
            case LevelingAllotment.NONE:
                this.allotment = LevelingAllotment.LOW;
                break;
            case LevelingAllotment.LOW:
                this.allotment = LevelingAllotment.MEDIUM;
                break;
            case LevelingAllotment.MEDIUM:
                this.allotment = LevelingAllotment.HIGH;
                break;
        }
    }
    decreaseLevelingAllocation() {
        switch (this.allotment) {
            case LevelingAllotment.HIGH:
                this.allotment = LevelingAllotment.MEDIUM;
                break;
            case LevelingAllotment.MEDIUM:
                this.allotment = LevelingAllotment.LOW;
                break;
            case LevelingAllotment.LOW:
                this.allotment = LevelingAllotment.NONE;
                break;
        }
    }
}
exports.Skill = Skill;
//# sourceMappingURL=Skill.js.map