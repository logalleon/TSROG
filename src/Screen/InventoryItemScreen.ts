import { Screen, ScreenNames, ItemReference } from './Screen';
import Game from '../Game';
import { InputMap, keyCodeToChar } from '../Input';
import { fontOptions, padding } from '../Canvas/Canvas'
import { Player, InventoryItems, EquipmentSlots } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';
import { Colors } from '../Canvas/Color';
import { Message } from '../Message/Message';
import { startCase } from 'lodash';

enum optionsKey {
  EQUIP = 'e',
  INSPECT = 'i',
  UNEQUIP = 'u'
}

class InventoryItemScreen extends Screen {

  public name: ScreenNames;
  public item: InventoryItems;
  public game: Game;
  public inputs: InputMap;

  private inspectingItems: boolean = false;
  private awaitingConfirmation: boolean = false;

  private itemReference = {};

  constructor(name: ScreenNames, item: InventoryItems) {
    super();
    this.name = name;
    this.item = item;
  }

  render() {
    const { messenger } = this.game;
    this.renderInventoryItems();
    messenger.renderReturnToMap();
  }

  renderTitle (): Message[] {
    const message: Message = {
      text: `${startCase(this.item)}`
    };
    return [message];
  }

  renderInventoryItems () {
    const { player } = this.game;
    // Start with A
    let keyCode = 65;
    let i = 0;
    this.game.messenger.clearMessages();
    this.game.messenger.logMessages(this.renderTitle());
    this.game.messenger.logMessages(
      player[this.item].map((item: Prop, index: number): Message => {
        const message: Message = {
          text: `${String.fromCharCode(keyCode)}) ${item.name}`,
        };
        this.itemReference[String.fromCharCode(keyCode)] = item;
        i++;
        keyCode++;
        return message;
      })
    );
    for (let itemReferenceAccessor in this.itemReference) {
      this.inputs[itemReferenceAccessor] = this.showOptions.bind(this, itemReferenceAccessor);
    }
  }

  showOptions (itemReferenceAccessor: ItemReference): void {
    const messages: Message[] = [
      {
        text: `${optionsKey.EQUIP}) equip`
      },
      {
        text: `${optionsKey.INSPECT}) inspect`
      },
      {
        text: `${optionsKey.UNEQUIP}) unequip`
      }
    ]
    this.inputs[optionsKey.EQUIP] = this.showEquipPrompt;
    this.inputs[optionsKey.INSPECT] = this.showInspect;
    this.inputs[optionsKey.UNEQUIP] = this.showUnequipPrompt;
    this.game.messenger.writeToPanel('panel2', messages);
  }

  showEquipPrompt () {

  }

  showInspect () {
    this.game.messenger.writeToPanel('panel3', [{ text: 'hello' }]);
  }

  showUnequipPrompt () {

  }



  // renderYesNo (): void {
  //   this.awaitingConfirmation = true;
  //   const { messenger } = this.game;
  //   const reference: ItemReference = this.itemReference[this.itemReferenceAccessor];
  //   const { item } = reference;
  //   messenger.clearMessages();
  //   const text = `Unequip ${item.name} [y/n]?`;
  //   messenger.logMessages([{ text }]);
  // }

}
export default InventoryItemScreen;