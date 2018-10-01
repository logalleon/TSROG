import { Screen, ScreenNames, ItemReference } from '../Screen';
import Game from '../../Game';
import { InputMap } from '../../Input';
import { clearCanvas, fontOptions } from '../../Canvas/Canvas'
import { Player, InventoryItems, EquippedItems, EquippedItemAccessor, EquipmentSlots, TOTAL_EQUIPMENT_SLOTS } from '../../Entity/Actor/Player';
import { Prop } from '../../Entity/Prop/Prop';
import { Message, Panel } from '../../Message/Messenger';
import { Colors } from '../../Canvas/Color';
import { kebabCase, lowerCase } from 'lodash';
import { modulo } from '../../Geometry';

enum EquipmentScreenInputsMap {
  DOWN = 'Down',
  UP = 'Up',
  LEGEND = '?',
  NEXT = 'Right',
  PREV = 'Left'
}

class EquipmentScreen extends Screen {

  public name: ScreenNames = ScreenNames.EQUIPMENT;
  public inputs: InputMap;

  private itemReferenceAccessor: EquipmentSlots;
  private currentIndex: number = 0;
  private length: number = TOTAL_EQUIPMENT_SLOTS;

  private itemReference: {
    [key: string]: ItemReference,
  };

  private awaitingConfirmation: boolean = false;

  constructor() {
    super({});
    this.renderYesNo = this.renderYesNo.bind(this);
    this.inputs = (<any>Object).assign(this.inputs, {
      [EquipmentScreenInputsMap.PREV]: () => {
        console.log(modulo((this.currentIndex - 1), this.length))
        console.log(this.length, this.currentIndex);
        this.currentIndex = modulo((this.currentIndex - 1), this.length);
        this.render();
      },
      [EquipmentScreenInputsMap.NEXT]: () => {
        this.currentIndex = modulo((this.currentIndex + 1), this.length);
        this.render();
      }
    });
  }

  render() {
    this.renderEquippedItems();
    // @TODO it should be more obvious that yes/no is being rendered
  }

  renderEquippedItems (): void {
    console.log(this.inputs);
    const { player } = Game.instance;
    const { equipped: equipmentSlots } = player;
    let keyCode = 65;
    let i = 0;
    Game.instance.messenger.clearPanel(Panel.PANEL_1);
    const title = [{ text: 'Equipment' }];
    Game.instance.messenger.writeToPanel(Panel.PANEL_1, title);
    this.itemReference = {};
    let index = 0;
    for (let slot in equipmentSlots) {
      let classList = `equipment equipment--${kebabCase(lowerCase(slot))}`;
      if (this.currentIndex === index) {
        classList += ' equipment--highlighted';
      }
      const itemOrEmptySlot: Prop|null = equipmentSlots[slot];
      const message: Message = {
        text: `${String.fromCharCode(keyCode)}) ${
          itemOrEmptySlot ? itemOrEmptySlot.name
          : 'nothing equipped'
          }`,
        color: Colors.WHITE,
        classList
      };
      const reference: ItemReference = {
        item: itemOrEmptySlot,
        slot: <EquipmentSlots>slot
      };
      this.itemReference[String.fromCharCode(keyCode)] = reference;
      i++;
      keyCode++;
      Game.instance.messenger.writeToPanel(Panel.PANEL_1, [message]);
      index++;
    }
    // @TODO this might need to be updated to conform with the merge that's
    this.inputs = (<any>Object).assign(this.inputs, this.returnToMap);
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
          Game.instance.player.attemptToUnequip(reference.slot);
          Game.instance.messenger.writeToPanel(Panel.PANEL_1, [{ text: `Unequipped ${item.name}.` }]);
          this.awaitingConfirmation = false;
        },
        'n': () => {
          this.awaitingConfirmation = false;
        }
      }, this.returnToMap);
    } else {
      const text = 'Cannot unequip empty slot.';
      Game.instance.messenger.writeToPanel(Panel.PANEL_1, [{ text }]);
    }
  }

  renderYesNo (): void {
    this.awaitingConfirmation = true;
    const { messenger } = Game.instance;
    const reference: ItemReference = this.itemReference[this.itemReferenceAccessor];
    const { item } = reference;
    messenger.clearPanel(Panel.PANEL_1);
    const text = `Unequip ${item.name} [y/n]?`;
    messenger.writeToPanel(Panel.PANEL_1, [{ text }]);
  }

}
export default EquipmentScreen;