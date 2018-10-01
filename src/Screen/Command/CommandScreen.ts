import { startCase } from 'lodash';
import { Screen, ScreenNames } from '../Screen';
import Game from '../../Game';
import { InputMap } from '../../Input';
import { clearCanvas, fontOptions, padding } from '../../Canvas/Canvas';
import { Colors } from '../../Canvas/Color';
import { Player, InventoryItems } from '../../Entity/Actor/Player';
import { Prop } from '../../Entity/Prop/Prop';
import { MapScreenInputs } from '../Map/MapScreen';
import { titleCase } from 'lodash';
import { Panel } from '../../Message/Messenger';

class CommandScreen extends Screen {

  public name: ScreenNames = ScreenNames.COMMANDS;
  public inputs: InputMap;

  constructor() {
    super({});
  }

  render() {
    const { messenger } = Game.instance;
    this.renderCommands();
    messenger.renderReturnToMap();
  }

  renderTitle() {
    const title = `${titleCase(this.name)}`;
  }

  renderCommands (): void {
    const { messenger } = Game.instance;
    const I = MapScreenInputs;
    const S = ScreenNames;
    const text = `
      ${startCase(this.name)}<br/>
      ${I.MOVE_UP_LEFT} ${I.MOVE_UP} ${I.MOVE_UP_RIGHT}<br/>
      &nbsp;\\|/<br/>
      ${I.MOVE_LEFT}- -${I.MOVE_RIGHT}<br/>
      &nbsp;/|\\<br/>
      ${I.MOVE_DOWN_LEFT} ${I.MOVE_DOWN} ${I.MOVE_DOWN_RIGHT}<br/>
      ${I.INVENTORY} - ${S.INVENTORY}<br/>
      ${I.HELP} - ${S.HELP}<br/>
      ${I.AMULET} - ${S.AMULET}<br/>
      ${I.WEAPONS} - ${S.WEAPON}<br/>
      ${I.RING} - ${S.RING}<br/>
      ${I.ARMOR} - ${S.ARMOR}<br/>
      ${I.SCROLL} - ${S.SCROLL}<br/>
      ${I.POTIONS} - ${S.POTIONS}<br/>
      ${I.FOOD} - ${S.FOOD}<br/>
      ${I.KEYS} - ${S.KEYS}<br/>
      ${I.EQUIPMENT} - ${S.EQUIPMENT}<br/>
    `;
    console.log(text);
    messenger.writeToPanel(Panel.PANEL_1, [{
      text
    }]);
  }

  renderPlayerInventory () {
    const { player } = Game.instance;
    const padding = fontOptions.fontSize * 2;
    let keyCode = 65;
    let i = 0;
    for (let key in InventoryItems) {
      player[InventoryItems[key]].forEach((item: Prop) => {
        keyCode++;
      });
    }
  }

}
export default CommandScreen;