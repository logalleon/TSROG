import { Screen, ScreenNames, ItemReference } from './Screen';
import Game from '../Game';
import { InputMap, keyCodeToChar } from '../Input';
import { fontOptions, padding } from '../Canvas/Canvas'
import { Player, InventoryItems, EquipmentSlots } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';
import { Colors } from '../Canvas/Color';
import { Message, Panel } from '../Message/Messenger';
import { startCase } from 'lodash';
import { ConfirmKeyBindings, EscapeKeyBinding } from './CommonHandlers';

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

  private inspectingItems: boolean = false;
  private awaitingConfirmation: boolean = false;

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
    console.log('binding');
    this.storedInputMaps.push(this.inputs);
    this.inputs = {
        [optionsKey.EQUIP]: this.showEquipPrompt.bind(this, itemReferenceAccessor),
        [optionsKey.INSPECT]: this.showInspect.bind(this, itemReferenceAccessor),
        [optionsKey.UNEQUIP]: this.showUnequipPrompt.bind(this, itemReferenceAccessor),
        [EscapeKeyBinding.ESC]: () => { // @TODO this seems like it might become a common pattern - maybe this should be moved to common handlers
          console.log('hello there');
          this.game.messenger.clearPanel(Panel.PANEL_2);
          this.inputs = this.storedInputMaps.pop();
        }
    };
    console.log(this.inputs);
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
      ]
    );
  }

  showEquipPrompt (itemReferenceAccessor: string) {
    const item: Prop = this.itemReference[itemReferenceAccessor];
    const message = {
      text: `Equip ${item.name} [y/n]?`
    };
    this.storedInputMaps.push(this.inputs);
    this.inputs = {
      [ConfirmKeyBindings.YES]: () => { console.log('yes')},
      [ConfirmKeyBindings.NO]: () => { console.log('no')},
      [EscapeKeyBinding.ESC]: () => {
        this.game.messenger.clearPanel(Panel.PANEL_3);
        this.inputs = this.storedInputMaps.pop();
      }
    }
    this.game.messenger.clearPanel(Panel.PANEL_3);
    this.game.messenger.writeToPanel(Panel.PANEL_3, [message]);
  }

  showInspect (itemReferenceAccessor: string) {
    const { item } = this.itemReference[itemReferenceAccessor];
    // @TODO add inputs map
    this.game.messenger.clearPanel(Panel.PANEL_3);
    this.game.messenger.writeToPanel(Panel.PANEL_3, [{
      text: `Description ${item.descriptionLong}`
    }]);
  }

  showUnequipPrompt (itemReferenceAccessor: string) {
    const { item } = this.itemReference[itemReferenceAccessor];
    // @TODO add inputs map
    const message = {
      text: `Unequip ${item.name} [y/n]?`
    };
    this.game.messenger.clearPanel(Panel.PANEL_3);
    this.game.messenger.writeToPanel(Panel.PANEL_3, [message]);
  }
}

export default InventoryItemScreen;