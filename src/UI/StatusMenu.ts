import Game from '../Game';
import { startCase } from 'lodash';
import { Messenger } from '../Message/Messenger';
import { StatusColors } from '../Canvas/Color';

class StatusMenu {

  public el: HTMLElement;

  constructor (el: HTMLElement) {
    this.el = el;
  }

  render () {
    const { player } = Game.instance;
    const level = `<span class="status" id="player-level">Level ${player.level}</span>`;
    const hp = `<span class="status" id="player-hp">HP ${Math.round(player.hp)}/${player.maxHp}</span>`;
    const hunger = `<span class="status" id="player-hunger">Hunger ${Messenger.colorize(startCase(player.hunger.level), StatusColors.HUNGER)}</span>`;
    const thirst = `<span class="status" id="player-thirst">Thirst ${Messenger.colorize(startCase(player.thirst.level), StatusColors.THIRST)}</span>`;
    const regen = `<span class="status" id="player-regen">Regen ${player.hpRegen}</span>`;
    const otherStatuses = this.buildOtherStatusEffects();
    this.el.innerHTML = `${level}${hp}${regen}${hunger}${thirst}`;
  }

  buildOtherStatusEffects (): string {
    return '';
  }

}
export { StatusMenu };