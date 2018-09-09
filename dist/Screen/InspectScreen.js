"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("./Screen");
const Messenger_1 = require("../Message/Messenger");
const MapScreen_1 = require("./MapScreen");
const Vector_1 = require("../Vector");
const Game_1 = require("../Game");
const Tile_1 = require("../Map/Tile");
const CommonHandlers_1 = require("./CommonHandlers");
class InspectScreen extends Screen_1.Screen {
    constructor() {
        super({});
        this.identifier = Messenger_1.Panel.PANEL_1;
        this.name = Screen_1.ScreenNames.INSPECT;
        this.storedInputMaps = [];
        this.inputs = Object.assign({
            [MapScreen_1.MapScreenInputs.MOVE_UP]: this.inspectAdjacentTile.bind(this),
            [MapScreen_1.MapScreenInputs.MOVE_LEFT]: this.inspectAdjacentTile.bind(this),
            [MapScreen_1.MapScreenInputs.MOVE_DOWN]: this.inspectAdjacentTile.bind(this),
            [MapScreen_1.MapScreenInputs.MOVE_RIGHT]: this.inspectAdjacentTile.bind(this),
            [MapScreen_1.MapScreenInputs.MOVE_UP_LEFT]: this.inspectAdjacentTile.bind(this),
            [MapScreen_1.MapScreenInputs.MOVE_UP_RIGHT]: this.inspectAdjacentTile.bind(this),
            [MapScreen_1.MapScreenInputs.MOVE_DOWN_LEFT]: this.inspectAdjacentTile.bind(this),
            [MapScreen_1.MapScreenInputs.MOVE_DOWN_RIGHT]: this.inspectAdjacentTile.bind(this),
            [MapScreen_1.MapScreenInputs.WAIT]: this.inspectAdjacentTile.bind(this)
        }, this.inputs);
    }
    inspectAdjacentTile(keyValue) {
        const { player, currentFloor } = Game_1.default.instance;
        const { pos } = player;
        const { tiles } = currentFloor;
        let inspectPos;
        switch (keyValue) {
            case MapScreen_1.MapScreenInputs.MOVE_UP:
                inspectPos = Vector_1.default.apply(pos, new Vector_1.default(0, -1));
                break;
            case MapScreen_1.MapScreenInputs.MOVE_LEFT:
                inspectPos = Vector_1.default.apply(pos, new Vector_1.default(-1, 0));
                break;
            case MapScreen_1.MapScreenInputs.MOVE_DOWN:
                inspectPos = Vector_1.default.apply(pos, new Vector_1.default(0, 1));
                break;
            case MapScreen_1.MapScreenInputs.MOVE_RIGHT:
                inspectPos = Vector_1.default.apply(pos, new Vector_1.default(1, 0));
                break;
            case MapScreen_1.MapScreenInputs.MOVE_UP_LEFT:
                inspectPos = Vector_1.default.apply(pos, new Vector_1.default(-1, -1));
                break;
            case MapScreen_1.MapScreenInputs.MOVE_UP_RIGHT:
                inspectPos = Vector_1.default.apply(pos, new Vector_1.default(1, -1));
                break;
            case MapScreen_1.MapScreenInputs.MOVE_DOWN_LEFT:
                inspectPos = Vector_1.default.apply(pos, new Vector_1.default(-1, 1));
                break;
            case MapScreen_1.MapScreenInputs.MOVE_DOWN_RIGHT:
                inspectPos = Vector_1.default.apply(pos, new Vector_1.default(1, 1));
                break;
            case MapScreen_1.MapScreenInputs.WAIT:
                inspectPos = pos;
                break;
            default:
                throw new Error('In InspectScreen::inspectAdjacentTile');
        }
        const tile = tiles[inspectPos.y][inspectPos.x];
        this.unHighlightTiles();
        let text;
        if (tile.isOccupied) {
            const prop = tile.occupiers[0];
            text = prop.descriptionLong; // @TODO this obviously has to exclude the player
            if (prop.canBePickedUp) {
                Game_1.default.instance.messenger.clearPanel(Messenger_1.Panel.PANEL_2);
                Game_1.default.instance.messenger.writeToPanel(Messenger_1.Panel.PANEL_2, [{
                        text: `Equip the ${prop.name}? [y/n]`
                    }], true);
                this.storeAndSwapInputMap(CommonHandlers_1.applyEscapeHandlerBinding(this, CommonHandlers_1.applyYesNoBinding(this, {}, () => {
                    const pickup = {
                        type: prop.type,
                        item: prop
                    };
                    Game_1.default.instance.player.addToInventory(pickup);
                    // @TODO move this to a pickup / inventory management manager
                }, () => {
                    console.log('no');
                }), Messenger_1.Panel.PANEL_2));
            }
        }
        else {
            text = tile.description;
        }
        // @TODO it really seems at this point that mutliple entities need to exist on the same tile and that a selection process has to exist like in DF
        // Set the active screen back to the map
        Game_1.default.instance.activeScreen = Game_1.default.instance.screens[Screen_1.ScreenNames.MAP];
        return [{ text }];
    }
    render() {
        this.highlightTiles();
    }
    storeAndSwapInputMap(nextInputs) {
        this.storedInputMaps.push(this.inputs);
        this.inputs = nextInputs;
    }
    highlightTiles() {
        const { pos } = Game_1.default.instance.player;
        const { currentFloor } = Game_1.default.instance;
        const { floorWidth, floorHeight, tiles } = currentFloor;
        for (let x = pos.x - 1; x <= pos.x + 1; x++) {
            for (let y = pos.y - 1; y <= pos.y + 1; y++) {
                if (currentFloor.inBounds(floorWidth, floorHeight, new Vector_1.default(x, y)) &&
                    tiles[y][x].type !== Tile_1.TileTypes.VOID) {
                    const selector = Game_1.default.instance.screens[Screen_1.ScreenNames.MAP].getTileId(y, x);
                    document.getElementById(selector).classList.add('inspect');
                }
            }
        }
    }
    unHighlightTiles() {
        const { pos } = Game_1.default.instance.player;
        const { currentFloor } = Game_1.default.instance;
        const { floorWidth, floorHeight, tiles } = currentFloor;
        for (let x = pos.x - 1; x <= pos.x + 1; x++) {
            for (let y = pos.y - 1; y <= pos.y + 1; y++) {
                if (currentFloor.inBounds(floorWidth, floorHeight, new Vector_1.default(x, y))) {
                    const selector = Game_1.default.instance.screens[Screen_1.ScreenNames.MAP].getTileId(y, x);
                    document.getElementById(selector).classList.remove('inspect');
                }
            }
        }
    }
}
exports.default = InspectScreen;
//# sourceMappingURL=InspectScreen.js.map