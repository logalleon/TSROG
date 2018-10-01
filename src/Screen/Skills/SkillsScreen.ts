import { ScreenNames, Screen } from "../Screen";
import Game from "../../Game";
import { InputMap } from "../../Input";
import { Panel, Message } from "../../Message/Messenger";
import { SkillNames, SkillLevelTokens, LevelingAllotment, Skill, ALLOCATION_ORDER } from "../../Entity/Actor/Skill/Skill";
import { startCase, lowerCase } from 'lodash';
import { modulo } from "../../Geometry";
import { applyEscapeHandlerBinding } from "../CommonHandlers";
import { Colors } from "../../Canvas/Color";
import { Swappable } from "../ScreenInterfaces";

enum SkillScreenInputsMap {
  DOWN = 'Down',
  UP = 'Up',
  LEGEND = '?',
  ADJUST_UP = 'Right',
  ADJUST_DOWN = 'Left'
}

interface SkillDistributionTree {
  [key: string]: number
}

class SkillsScreen extends Screen implements Swappable {

  public name: ScreenNames;
  public game: Game;
  public inputs: InputMap;

  public currentIndex: number = 0;
  public currentReference: Skill;
  public length: number = Object.keys(SkillNames).length;

  private storedInputMaps: InputMap[] = [];

  public skillDistributionAllotment: number[] = [0, 10, 20, 70] // leveling allotments of none, low, medium, high

  constructor() {
    super({});
    this.name = ScreenNames.SKILLS;
    this.inputs = (<any>Object).assign(this.inputs, {
      [SkillScreenInputsMap.UP]: () => {
        this.currentIndex = modulo((this.currentIndex - 1), this.length);
        this.render();
      },
      [SkillScreenInputsMap.DOWN]: () => {
        this.currentIndex = modulo((this.currentIndex + 1), this.length);
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

  renderSkills () {
    const distribution = this.calculateSkillDistribution();
    const { player } = this.game;
    this.game.messenger.clearPanel(Panel.PANEL_1);
    this.game.messenger.writeToPanel(Panel.PANEL_1, this.renderTitle());
    this.game.messenger.writeToPanel(Panel.PANEL_1,
      ((): Message[] => {
        const messages: Message[] = [];
        let index = 0;
        for (let key in SkillNames) {
          const skill = SkillNames[key];
          let skillLevel: string = ''; // @TODO temporary
          if (player.skills[skill]) {
            skillLevel = SkillLevelTokens[player.skills[skill].level];
          }
          const distributionAmount = Number(distribution[skill]) === 0 ?
            '' : Number(distribution[skill]).toFixed(1) + '%';
          const message: Message = {
            text: `
              ${startCase(lowerCase(skill))}
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
        messages.push({ text: 'Press ? for legend' })
        return messages;
      })()
    );
  }

  renderTitle (): Message[] {
    return [{ text: 'Skills' }];
  }

  storeAndSwapInputMap (nextInputs: InputMap): void {
    this.storedInputMaps.push(this.inputs);
    this.inputs = nextInputs;
  }

  showLegend (): void {
    this.storeAndSwapInputMap({});
    this.inputs = applyEscapeHandlerBinding(this, this.inputs, Panel.PANEL_2);
    let messages: Message[] = [{ text: 'Legend', color: Colors.INDIGO }];
    messages.push({ text: 'Current Skill Level' });
    messages.push({ text: '-----' });
    for (let key in SkillLevelTokens) {
      const token = SkillLevelTokens[key];
      messages.push({ text: `${token}: ${startCase(lowerCase(key))}` });
    }
    messages.push({ text: 'Skill Allocation' });
    messages.push({ text: '-----' });
    for (let key in LevelingAllotment) {
      messages.push({
        text: `${startCase(lowerCase(LevelingAllotment[key]))} skill allocation`,
        classList: `skill skill--${LevelingAllotment[key]}`
      });
    }
    Game.instance.messenger.clearPanel(Panel.PANEL_2);
    Game.instance.messenger.writeToPanel(Panel.PANEL_2, messages);
  }

  adjustSkillLevelingAllotment (keyValue: string) {
    if (keyValue === SkillScreenInputsMap.ADJUST_DOWN) {
      this.currentReference.decreaseLevelingAllocation();
    } else if (keyValue === SkillScreenInputsMap.ADJUST_UP) {
      this.currentReference.increaseLevelingAllocation();
    }
  }

  calculateSkillDistribution (): SkillDistributionTree {
    const { player } = Game.instance;
    const distributionTree = {
      [LevelingAllotment.NONE]: [],
      [LevelingAllotment.LOW]: [],
      [LevelingAllotment.MEDIUM]: [],
      [LevelingAllotment.HIGH]: []
    }
    for (let key in player.skills) {
      const skill = player.skills[key];
      distributionTree[skill.allotment].push(skill.name);
    }
    let initialDistribution;
    let remainingDistribution = initialDistribution = 100;
    let skillDistributionTree: SkillDistributionTree = {};
    const LOW_TO_HIGH_ALLOCATION = [].concat(ALLOCATION_ORDER).reverse();
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
      const portion = initialDistribution / distributionTree[LevelingAllotment.NONE].length;
      distributionTree[LevelingAllotment.NONE].forEach((name: SkillNames) => {
        skillDistributionTree[name] = portion;
      });
    // None values will not be added!
    } else {
      LOW_TO_HIGH_ALLOCATION.forEach((level, index) => {
        // skip none allotment
        if (distributionTree[level].length && index !== 0) {
          remainingDistribution -= this.skillDistributionAllotment[index];
        }
      })
      LOW_TO_HIGH_ALLOCATION.forEach((level, index) => {
        if (distributionTree[level].length) {
          let portion;
          // If the current index is the highest, use the entire remainder from above
          if (highestIndex === index) {
            portion = (this.skillDistributionAllotment[index] + remainingDistribution) / distributionTree[level].length;
          // Otherwise, use the slice allotted for that particular level
          } else if (index === 0) {
            portion = 0;
          } else {
            portion = this.skillDistributionAllotment[index] / distributionTree[level].length;
          }
          // Split the portion among all skills set to that allotment level
          distributionTree[level].forEach((name: SkillNames) => {
            skillDistributionTree[name] = portion;
          });
        }
      });
    }
    
    return skillDistributionTree;
  }

}

export default SkillsScreen;