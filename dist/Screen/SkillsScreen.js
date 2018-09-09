"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("./Screen");
const Game_1 = require("../Game");
const Messenger_1 = require("../Message/Messenger");
const Skill_1 = require("../Entity/Actor/Skill/Skill");
const lodash_1 = require("lodash");
const Geometry_1 = require("../Geometry");
const CommonHandlers_1 = require("./CommonHandlers");
const Color_1 = require("../Canvas/Color");
var SkillScreenInputsMap;
(function (SkillScreenInputsMap) {
    SkillScreenInputsMap["DOWN"] = "Down";
    SkillScreenInputsMap["UP"] = "Up";
    SkillScreenInputsMap["LEGEND"] = "?";
    SkillScreenInputsMap["ADJUST_UP"] = "Right";
    SkillScreenInputsMap["ADJUST_DOWN"] = "Left";
})(SkillScreenInputsMap || (SkillScreenInputsMap = {}));
class SkillsScreen extends Screen_1.Screen {
    constructor() {
        super({});
        this.currentIndex = 0;
        this.length = Object.keys(Skill_1.SkillNames).length;
        this.storedInputMaps = [];
        this.skillDistributionAllotment = [0, 10, 20, 70]; // leveling allotments of none, low, medium, high
        this.name = Screen_1.ScreenNames.SKILLS;
        this.inputs = Object.assign(this.inputs, {
            [SkillScreenInputsMap.UP]: () => {
                this.currentIndex = Geometry_1.modulo((this.currentIndex - 1), this.length);
                this.render();
            },
            [SkillScreenInputsMap.DOWN]: () => {
                this.currentIndex = Geometry_1.modulo((this.currentIndex + 1), this.length);
                this.render();
            },
            [SkillScreenInputsMap.LEGEND]: this.showLegend.bind(this),
            [SkillScreenInputsMap.ADJUST_DOWN]: this.adjustSkillLevelingAllotment.bind(this),
            [SkillScreenInputsMap.ADJUST_UP]: this.adjustSkillLevelingAllotment.bind(this)
        });
    }
    render() {
        const { messenger } = this.game;
        this.renderSkills();
        messenger.renderReturnToMap();
    }
    renderSkills() {
        const distribution = this.calculateSkillDistribution();
        const { player } = this.game;
        this.game.messenger.clearPanel(Messenger_1.Panel.PANEL_1);
        this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, this.renderTitle());
        this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, (() => {
            const messages = [];
            let index = 0;
            for (let key in Skill_1.SkillNames) {
                const skill = Skill_1.SkillNames[key];
                let skillLevel = ''; // @TODO temporary
                if (player.skills[skill]) {
                    skillLevel = Skill_1.SkillLevelTokens[player.skills[skill].level];
                }
                const distributionAmount = Number(distribution[skill]) === 0 ?
                    '' : Number(distribution[skill]).toFixed(1) + '%';
                const message = {
                    text: `
              ${lodash_1.startCase(lodash_1.lowerCase(skill))}
              <span class="level">${skillLevel}</span>
              <span class="distribution">${distributionAmount}</span>
            `,
                    classList: `skill skill--${player.skills[skill].allotment}`
                };
                if (this.currentIndex === index) {
                    this.currentReference = player.skills[skill];
                }
                messages.push(message);
                index++;
            }
            messages[this.currentIndex].classList += ' skill--highlighted';
            messages.push({ text: 'Press ? for legend' });
            return messages;
        })());
    }
    renderTitle() {
        return [{ text: 'Skills' }];
    }
    storeAndSwapInputMap(nextInputs) {
        this.storedInputMaps.push(this.inputs);
        this.inputs = nextInputs;
    }
    showLegend() {
        this.storeAndSwapInputMap({});
        this.inputs = CommonHandlers_1.applyEscapeHandlerBinding(this, this.inputs, Messenger_1.Panel.PANEL_2);
        let messages = [{ text: 'Legend', color: Color_1.Colors.INDIGO }];
        messages.push({ text: 'Current Skill Level' });
        messages.push({ text: '-----' });
        for (let key in Skill_1.SkillLevelTokens) {
            const token = Skill_1.SkillLevelTokens[key];
            messages.push({ text: `${token}: ${lodash_1.startCase(lodash_1.lowerCase(key))}` });
        }
        messages.push({ text: 'Skill Allocation' });
        messages.push({ text: '-----' });
        for (let key in Skill_1.LevelingAllotment) {
            messages.push({
                text: `${lodash_1.startCase(lodash_1.lowerCase(Skill_1.LevelingAllotment[key]))} skill allocation`,
                classList: `skill skill--${Skill_1.LevelingAllotment[key]}`
            });
        }
        Game_1.default.instance.messenger.clearPanel(Messenger_1.Panel.PANEL_2);
        Game_1.default.instance.messenger.writeToPanel(Messenger_1.Panel.PANEL_2, messages);
    }
    adjustSkillLevelingAllotment(keyValue) {
        if (keyValue === SkillScreenInputsMap.ADJUST_DOWN) {
            this.currentReference.decreaseLevelingAllocation();
        }
        else if (keyValue === SkillScreenInputsMap.ADJUST_UP) {
            this.currentReference.increaseLevelingAllocation();
        }
    }
    calculateSkillDistribution() {
        const { player } = Game_1.default.instance;
        const distributionTree = {
            [Skill_1.LevelingAllotment.NONE]: [],
            [Skill_1.LevelingAllotment.LOW]: [],
            [Skill_1.LevelingAllotment.MEDIUM]: [],
            [Skill_1.LevelingAllotment.HIGH]: []
        };
        for (let key in player.skills) {
            const skill = player.skills[key];
            distributionTree[skill.allotment].push(skill.name);
        }
        let initialDistribution;
        let remainingDistribution = initialDistribution = 100;
        let skillDistributionTree = {};
        const LOW_TO_HIGH_ALLOCATION = [].concat(Skill_1.ALLOCATION_ORDER).reverse();
        // Remove distribution from total
        let highestIndex = 0;
        // Find the highest level allotment
        LOW_TO_HIGH_ALLOCATION.forEach((level, index) => {
            if (distributionTree[level].length) {
                // Set the high level that has values
                highestIndex = index;
            }
        });
        // Everything will be even
        if (highestIndex === 0) {
            const portion = initialDistribution / distributionTree[Skill_1.LevelingAllotment.NONE].length;
            distributionTree[Skill_1.LevelingAllotment.NONE].forEach((name) => {
                skillDistributionTree[name] = portion;
            });
            // None values will not be added!
        }
        else {
            LOW_TO_HIGH_ALLOCATION.forEach((level, index) => {
                // skip none allotment
                if (distributionTree[level].length && index !== 0) {
                    remainingDistribution -= this.skillDistributionAllotment[index];
                }
            });
            LOW_TO_HIGH_ALLOCATION.forEach((level, index) => {
                if (distributionTree[level].length) {
                    let portion;
                    // If the current index is the highest, use the entire remainder from above
                    if (highestIndex === index) {
                        portion = (this.skillDistributionAllotment[index] + remainingDistribution) / distributionTree[level].length;
                        // Otherwise, use the slice allotted for that particular level
                    }
                    else if (index === 0) {
                        portion = 0;
                    }
                    else {
                        portion = this.skillDistributionAllotment[index] / distributionTree[level].length;
                    }
                    // Split the portion among all skills set to that allotment level
                    distributionTree[level].forEach((name) => {
                        skillDistributionTree[name] = portion;
                    });
                }
            });
        }
        return skillDistributionTree;
    }
}
exports.default = SkillsScreen;
//# sourceMappingURL=SkillsScreen.js.map