import { startCase } from 'lodash';
import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions, padding } from '../Canvas/Canvas';
import { Colors } from '../Canvas/Color';
import { Player, InventoryItems } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';
import { MapScreenInputs } from './MapScreen';
import { titleCase } from 'lodash';

class CommandScreen extends Screen {

  public name: ScreenNames = ScreenNames.COMMANDS;
  public game: Game;
  public inputs: InputMap;

  constructor() {
    super();
  }

  render() {
    const { messenger } = this.game;
    this.renderMovement();
    messenger.renderSpaceToContinue();
  }

  renderTitle() {
    const title = `${titleCase(this.name)}`;
  }

  renderMovement (): void {
    const { messenger } = this.game;
    const text = `
      ${startCase(this.name)}<br/>
      ${MapScreenInputs.MOVE_UP_LEFT} ${MapScreenInputs.MOVE_UP} ${MapScreenInputs.MOVE_UP_RIGHT}<br/>
      &nbsp;\\|/<br/>
      ${MapScreenInputs.MOVE_LEFT}- -${MapScreenInputs.MOVE_RIGHT}<br/>
      &nbsp;/|\\<br/>
      ${MapScreenInputs.MOVE_DOWN_LEFT} ${MapScreenInputs.MOVE_DOWN} ${MapScreenInputs.MOVE_DOWN_RIGHT}<br/>
      ${MapScreenInputs.AMULET} - ${ScreenNames.AMULET}<br/>
    `;
    messenger.logMessages([{
      text
    }]);
  }

  renderPlayerInventory () {
    const { player } = this.game;
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