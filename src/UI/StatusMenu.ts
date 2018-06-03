import Game from '../Game';

class StatusMenu {

  public el: HTMLElement;

  constructor (el: HTMLElement) {
    this.el = el;
  }

  render () {
    const { player } = Game.instance;
    const level = `<span id="player-level">Level ${player.level}</span>`;
    const hp = `<span id="player-hp">HP ${Math.round(player.hp)}/${player.maxHp}</span>`;
    const regen = `<span id="player-regen">Regen ${player.hpRegen}</span>`;
    this.el.innerHTML = `${level}${hp}${regen}`;
  }

}
export { StatusMenu };