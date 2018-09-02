import { ScreenNames, Screen, Swappable } from "./Screen";
import Game from "../Game";
import { InputMap } from "../Input";
import { Panel, Message } from "../Message/Messenger";
import { SkillNames, SkillLevelTokens, LevelingAllotment, Skill } from "../Entity/Actor/Skill/Skill";
import { startCase, lowerCase } from 'lodash';
import { modulo } from "../Geometry";
import { applyEscapeHandlerBinding } from "./CommonHandlers";
import { Colors } from "../Canvas/Color";

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
  public length: number = Object.keys(SkillNames).length;

  private storedInputMaps: InputMap[] = [];

  public skillDistributionAllotment: number[] = [80, 11, 6.5, 2.5] // leveling allotments of none, low, medium, high

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
      [SkillScreenInputsMap.LEGEND]: this.showLegend.bind(this)
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
        for (let key in SkillNames) {
          const skill = SkillNames[key];
          let skillLevel: string = ''; // @TODO temporary
          if (player.skills[skill]) {
            skillLevel = SkillLevelTokens[player.skills[skill].level];
          }
          const message: Message = {
            text: `
              ${startCase(lowerCase(skill))}
              <span class="level">${skillLevel}</span>
              <span class="distribution">${Number(distribution[skill]).toFixed(1)} %</span>
            `,
            classList: `skill skill--${player.skills[skill].allotment}`
          };
          messages.push(message);
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
    console.log(this.inputs, this.storedInputMaps); // @TODO still some weird duplication
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
    messages.push({ text: 'No skill allocation', classList: 'skill skill--none' });
    for (let key in LevelingAllotment) {
      messages.push({
        text: `${startCase(lowerCase(LevelingAllotment[key]))} skill allocation`,
        classList: `skill skill--${LevelingAllotment[key]}`
      });
    }
    Game.instance.messenger.clearPanel(Panel.PANEL_2);
    Game.instance.messenger.writeToPanel(Panel.PANEL_2, messages);
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
    let remainingDistribution = 100;
    let skillDistributionTree: SkillDistributionTree = {};
    let order = [LevelingAllotment.HIGH, LevelingAllotment.MEDIUM, LevelingAllotment.LOW, LevelingAllotment.NONE];
    order.forEach((level, index) => {
      if (distributionTree[level].length) {
        let portion;
        if (index === order.length - 1) {
          console.log(remainingDistribution);
          portion = remainingDistribution / distributionTree[level].length;
        } else {
          remainingDistribution -= this.skillDistributionAllotment[index];
          portion = this.skillDistributionAllotment[index] / distributionTree[level].length;
        }
        distributionTree[level].forEach((name: SkillNames) => {
          skillDistributionTree[name] = portion;
        });
      }
    });
    console.log(skillDistributionTree)
    return skillDistributionTree;
  }

}

export default SkillsScreen;