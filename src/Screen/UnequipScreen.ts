import { Screen, ScreenNames, ItemReference } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions } from '../Canvas/Canvas'
import { Player, InventoryItems, EquippedItems, EquippedItemAccessor, EquipmentSlots } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';
import { Message } from '../Message/Message';
import { Colors } from '../Canvas/Color';

class UnequipScreen extends Screen {

  public name: ScreenNames = ScreenNames.UNEQUIP;
  public game: Game;
  public inputs: InputMap;

  private itemReferenceAccessor: EquipmentSlots;

  private itemReference: {
    [key: string]: ItemReference,
  };

  private awaitingConfirmation: boolean = false;

  constructor() {
    super();
    this.renderYesNo = this.renderYesNo.bind(this);
  }

  render() {
    const { messenger } = this.game;
    if (!this.awaitingConfirmation) {
      this.renderEquippedItems();
    } else {
      this.renderYesNo();
    }
    // @TODO it should be more obvious that yes/no is being rendered
  }

  renderEquippedItems (): void {
    const { player } = this.game;
    const { equipped: equipmentSlots } = player;
    let keyCode = 65;
    let i = 0;
    this.game.messenger.clearMessages();
    const title = [{ text: 'Unequip Items' }];
    this.game.messenger.logMessages(title);
    this.itemReference = {};
    for (let slot in equipmentSlots) {
      const itemOrEmptySlot: Prop|null = equipmentSlots[slot];
      const message: Message = {
        text: `${String.fromCharCode(keyCode)}) ${
          itemOrEmptySlot ? itemOrEmptySlot.name
          : 'nothing equipped'
          }`,
        color: Colors.WHITE
      };
      const reference: ItemReference = {
        item: itemOrEmptySlot,
        slot: <EquipmentSlots>slot
      };
      this.itemReference[String.fromCharCode(keyCode)] = reference;
      i++;
      keyCode++;
      this.game.messenger.logMessages([message]);
    }
    this.inputs = (<any>Object).assign({}, this.returnToMap);
    for (let itemReferenceAccessor in this.itemReference) {
      this.inputs[itemReferenceAccessor] = this.setItemReferenceAccessor.bind(this, itemReferenceAccessor);
    }
  }

  setItemReferenceAccessor (itemReferenceAccessor: EquipmentSlots): void {
    this.itemReferenceAccessor = itemReferenceAccessor;
    const reference = this.itemReference[this.itemReferenceAccessor];
    const item: Prop|null = reference.item;
    if (item !== null) {
      this.awaitingConfirmation = true;
      // @TODO there's obviously a possibility that the y or n lists
      // collide with these - make sure that the letters y and n can't be menu options
      this.inputs = (<any>Object).assign({}, {
        'y': () => {
          this.game.player.attemptToUnequip(reference.slot);
          this.game.messenger.logMessages([{ text: `Unequipped ${item.name}.` }]);
          this.awaitingConfirmation = false;
        },
        'n': () => {
          this.awaitingConfirmation = false;
        }
      }, this.returnToMap);
    } else {
      const text = 'Cannot unequip empty slot.';
      this.game.messenger.logMessages([{ text }]);
    }
  }

  renderYesNo (): void {
    this.awaitingConfirmation = true;
    const { messenger } = this.game;
    const reference: ItemReference = this.itemReference[this.itemReferenceAccessor];
    const { item } = reference;
    messenger.clearMessages();
    const text = `Unequip ${item.name} [y/n]?`;
    messenger.logMessages([{ text }]);
  }

}
export default UnequipScreen;