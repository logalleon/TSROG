import { Screen, ScreenNames } from '../Screen';
import Game from '../../Game';
import { InputMap } from '../../Input';
import { clearCanvas, fontOptions } from '../../Canvas/Canvas'
import { Player, InventoryItems } from '../../Entity/Actor/Player';
import { Prop } from '../../Entity/Prop/Prop';
import { Message } from '../../Message/Messenger';
import { Colors } from '../../Canvas/Color';
import { Panel } from '../../Message/Messenger';

class InventoryScreen extends Screen {

  public name: ScreenNames = ScreenNames.INVENTORY;
  public inputs: InputMap;

  constructor() {
    super({});
  }

  render() {
    const { messenger } = Game.instance;
    this.renderPlayerInventory();
    messenger.renderReturnToMap();
  }

  renderPlayerInventory () {
    const { player } = Game.instance;
    let keyCode = 65;
    let i = 0;
    Game.instance.messenger.clearPanel(Panel.PANEL_1);
    const title = [{ text: 'Inventory' }];
    Game.instance.messenger.writeToPanel(Panel.PANEL_1, title);
    for (let key in InventoryItems) {
      Game.instance.messenger.writeToPanel(Panel.PANEL_1, 
        player[InventoryItems[key]].map((item: Prop): Message => {
          const message: Message = {
            text: `${String.fromCharCode(keyCode)}) ${item.name}`,
            color: Colors.WHITE
          };
          i++;
          keyCode++;
          return message;
        })
      );
    }
  }

}
export default InventoryScreen;