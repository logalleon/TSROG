import { Screen, ScreenNames, ItemReference } from './Screen';
import Game from '../Game';
import { InputMap, keyCodeToChar } from '../Input';
import { fontOptions, padding } from '../Canvas/Canvas'
import { Player, InventoryItems, EquipmentSlots, EquippedItemAccessor } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';
import { Colors } from '../Canvas/Color';
import { Message, Panel } from '../Message/Messenger';
import { startCase } from 'lodash';
import { ConfirmKeyBindings, EscapeKeyBinding, applyEscapeHandlerBinding, applyYesNoBinding } from './CommonHandlers';

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

  private storedInputMaps: InputMap[] = [];

  private itemReference = {};

  constructor(name: ScreenNames, item: InventoryItems) {
    super({});
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
    this.game.messenger.clearPanel(Panel.PANEL_1);
    this.game.messenger.writeToPanel(Panel.PANEL_1, this.renderTitle());
    this.game.messenger.writeToPanel(Panel.PANEL_1,
      player[this.item].map((item: Prop, index: number): Message => {
        console.log(item);
        const message: Message = {
          text: `${String.fromCharCode(keyCode)}) ${item.name}`,
        };
        const itemReference: ItemReference = {
          item,
          slot: this.getItemSlot(this.item)
        };
        this.itemReference[String.fromCharCode(keyCode)] = { item, itemReference, index };
        i++;
        keyCode++;
        return message;
      })
    );
    for (let itemReferenceAccessor in this.itemReference) {
      this.inputs[itemReferenceAccessor] = this.showOptions.bind(this, itemReferenceAccessor);
    }
  }

  getItemSlot (item: InventoryItems): EquipmentSlots {
    switch (item) {
      case InventoryItems.AMULETS:
        return EquipmentSlots.NECK;
      case InventoryItems.ARMOR:
        return EquipmentSlots.ARMOR;
      case InventoryItems.WEAPONS:
        return EquipmentSlots.WEAPON;
      default:
        throw new Error('Uh ooooh');
    }
  }

  showOptions (itemReferenceAccessor: ItemReference): void {
    this.storedInputMaps.push(this.inputs);
    this.storeAndSwapInputMap(applyEscapeHandlerBinding(this, {
        [optionsKey.EQUIP]: this.showEquipPrompt.bind(this, itemReferenceAccessor),
        [optionsKey.INSPECT]: this.showInspect.bind(this, itemReferenceAccessor),
        [optionsKey.UNEQUIP]: this.showUnequipPrompt.bind(this, itemReferenceAccessor)
    }, Panel.PANEL_2));
    this.game.messenger.clearPanel(Panel.PANEL_2);
    this.game.messenger.writeToPanel(Panel.PANEL_2,
      [
        {
          text: `${optionsKey.EQUIP}) equip`
        },
        {
          text: `${optionsKey.INSPECT}) inspect`
        },
        {
          text: `${optionsKey.UNEQUIP}) unequip`
        }
      ], true
    );
  }

  showEquipPrompt (itemReferenceAccessor: string) {
    const item: Prop = this.itemReference[itemReferenceAccessor].item;
    const itemReference: ItemReference = this.itemReference[itemReferenceAccessor].itemReference;
    const index: number = this.itemReference[itemReferenceAccessor].index;
    const message = {
      text: `Equip ${item.name} [y/n]?`
    };
    this.storeAndSwapInputMap(
      applyEscapeHandlerBinding(this,
        applyYesNoBinding(this, {},
          () => {
            const accessor: EquippedItemAccessor = {
              index,
              type: this.item
            };
            if (this.game.player.attemptToEquip(accessor, itemReference.slot)) {
              this.game.messenger.writeToPanel(Panel.PANEL_3,
              [
                { text: `Successfully equipped ${item.name}.` }
              ]
              );
            } else {
              const equippedItem = this.game.player.equipped[itemReference.slot];
              this.game.messenger.writeToPanel(Panel.PANEL_3,
                [
                  { text: `Cannot equip ${item.name}. ${equippedItem.name} is equipped in that slot.` }
                ]
              );
            }
          },
          () => { console.log('no') }
        ),
      Panel.PANEL_3, Panel.PANEL_2)
    );
    this.game.messenger.clearPanel(Panel.PANEL_3);
    this.game.messenger.writeToPanel(Panel.PANEL_3, [message], true);
  }

  storeAndSwapInputMap (nextInputs: InputMap): void {
    this.storedInputMaps.push(this.inputs);
    this.inputs = nextInputs;
    console.log(this.inputs, this.storedInputMaps); // @TODO still some weird duplication
  }

  showInspect (itemReferenceAccessor: string) {
    const item = this.itemReference[itemReferenceAccessor];
    this.storeAndSwapInputMap(applyEscapeHandlerBinding(this, {}, Panel.PANEL_3, Panel.PANEL_2));
    this.game.messenger.clearPanel(Panel.PANEL_3);
    this.game.messenger.writeToPanel(Panel.PANEL_3, [{
      text: `Description ${item.descriptionLong}`
    }], true);
  }

  showUnequipPrompt (itemReferenceAccessor: string) {
    const { item } = this.itemReference[itemReferenceAccessor];
    // @TODO add inputs map
    const message = {
      text: `Unequip ${item.name} [y/n]?`
    };
    this.storeAndSwapInputMap(
      applyEscapeHandlerBinding(this,
        applyYesNoBinding(this, {},
          () => { console.log('yes'); },
          () => { console.log('no'); }
        ),
      Panel.PANEL_3, Panel.PANEL_2)
    );
    this.game.messenger.clearPanel(Panel.PANEL_3);
    this.game.messenger.writeToPanel(Panel.PANEL_3, [message], true);
  }
}

export default InventoryItemScreen;