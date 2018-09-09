"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("./Screen");
const Game_1 = require("../Game");
const Vector_1 = require("../Vector");
const Messenger_1 = require("../Message/Messenger");
const Color_1 = require("../Canvas/Color");
const Tile_1 = require("../Map/Tile");
var MapScreenInputs;
(function (MapScreenInputs) {
    MapScreenInputs["INVENTORY"] = "I";
    MapScreenInputs["AMULET"] = "t";
    MapScreenInputs["ARMOR"] = "u";
    MapScreenInputs["FOOD"] = "o";
    MapScreenInputs["KEYS"] = "y";
    MapScreenInputs["POTIONS"] = "p";
    MapScreenInputs["RING"] = "n";
    MapScreenInputs["SCROLL"] = "l";
    MapScreenInputs["WEAPONS"] = "k";
    MapScreenInputs["COMMANDS"] = "?";
    MapScreenInputs["UNEQUIP"] = "U";
    MapScreenInputs["MESSAGES"] = "M";
    MapScreenInputs["HELP"] = "/";
    MapScreenInputs["MOVE_UP"] = "w";
    MapScreenInputs["MOVE_LEFT"] = "a";
    MapScreenInputs["MOVE_DOWN"] = "s";
    MapScreenInputs["MOVE_RIGHT"] = "d";
    MapScreenInputs["MOVE_UP_LEFT"] = "q";
    MapScreenInputs["MOVE_UP_RIGHT"] = "e";
    MapScreenInputs["MOVE_DOWN_LEFT"] = "z";
    MapScreenInputs["MOVE_DOWN_RIGHT"] = "c";
    MapScreenInputs["DESCEND"] = ">";
    MapScreenInputs["ASCEND"] = "<";
    MapScreenInputs["WAIT"] = "x";
    MapScreenInputs["INSPECT"] = "i";
    MapScreenInputs["SKILLS"] = "g";
})(MapScreenInputs || (MapScreenInputs = {}));
exports.MapScreenInputs = MapScreenInputs;
class MapScreen extends Screen_1.Screen {
    constructor() {
        super({});
        this.textSpacing = new Vector_1.default(.9, 1.5);
        this.name = Screen_1.ScreenNames.MAP;
        this.inputs = {
            [MapScreenInputs.INVENTORY]: this.showScreen.bind(this, Screen_1.ScreenNames.INVENTORY),
            [MapScreenInputs.AMULET]: this.showScreen.bind(this, Screen_1.ScreenNames.AMULET),
            [MapScreenInputs.ARMOR]: this.showScreen.bind(this, Screen_1.ScreenNames.ARMOR),
            [MapScreenInputs.FOOD]: this.showScreen.bind(this, Screen_1.ScreenNames.FOOD),
            [MapScreenInputs.KEYS]: this.showScreen.bind(this, Screen_1.ScreenNames.KEYS),
            [MapScreenInputs.POTIONS]: this.showScreen.bind(this, Screen_1.ScreenNames.POTIONS),
            [MapScreenInputs.RING]: this.showScreen.bind(this, Screen_1.ScreenNames.RING),
            [MapScreenInputs.SCROLL]: this.showScreen.bind(this, Screen_1.ScreenNames.SCROLL),
            [MapScreenInputs.WEAPONS]: this.showScreen.bind(this, Screen_1.ScreenNames.WEAPON),
            [MapScreenInputs.COMMANDS]: this.showScreen.bind(this, Screen_1.ScreenNames.COMMANDS),
            [MapScreenInputs.UNEQUIP]: this.showScreen.bind(this, Screen_1.ScreenNames.UNEQUIP),
            [MapScreenInputs.MESSAGES]: this.showScreen.bind(this, Screen_1.ScreenNames.MESSAGES),
            [MapScreenInputs.HELP]: this.showScreen.bind(this, Screen_1.ScreenNames.HELP),
            [MapScreenInputs.MOVE_UP]: this.attemptPlayerMovement.bind(this),
            [MapScreenInputs.MOVE_LEFT]: this.attemptPlayerMovement.bind(this),
            [MapScreenInputs.MOVE_DOWN]: this.attemptPlayerMovement.bind(this),
            [MapScreenInputs.MOVE_RIGHT]: this.attemptPlayerMovement.bind(this),
            [MapScreenInputs.MOVE_UP_LEFT]: this.attemptPlayerMovement.bind(this),
            [MapScreenInputs.MOVE_UP_RIGHT]: this.attemptPlayerMovement.bind(this),
            [MapScreenInputs.MOVE_DOWN_LEFT]: this.attemptPlayerMovement.bind(this),
            [MapScreenInputs.MOVE_DOWN_RIGHT]: this.attemptPlayerMovement.bind(this),
            [MapScreenInputs.DESCEND]: this.attemptDescend,
            [MapScreenInputs.WAIT]: this.playerWait,
            [MapScreenInputs.INSPECT]: this.showScreen.bind(this, Screen_1.ScreenNames.INSPECT),
            [MapScreenInputs.SKILLS]: this.showScreen.bind(this, Screen_1.ScreenNames.SKILLS)
        };
    }
    render() {
        const { currentFloor, messenger } = Game_1.default.instance;
        const { tiles } = currentFloor;
        messenger.clearPanel(Messenger_1.Panel.BOTTOM);
        messenger.writeToPanel(Messenger_1.Panel.BOTTOM, [{
                color: Color_1.Colors.DEFAULT,
                text: `Press '?' for command list.`
            }]);
        this.renderTiles();
    }
    renderTiles() {
        const tiles = document.getElementById('tilemap');
        const title = document.getElementById('title');
        const { currentFloor } = Game_1.default.instance;
        const titleHtml = `<h2>${currentFloor.getFormattedName()}</h2>`;
        let tileHtml = '';
        for (let y = 0; y < currentFloor.floorHeight; y++) {
            tileHtml += `<p>`;
            for (let x = 0; x < currentFloor.floorWidth; x++) {
                const tile = currentFloor.tiles[y][x];
                const { char } = tile.isOccupied ? tile.occupiers[0] : tile; // @TODO update to show the most important occupier to display, maybe with z values
                tileHtml += `
        <span
          class='tile'
          style="color: ${this.getTileColor(tile)};}"
          id="${this.getTileId(y, x)}"
        >
          ${char}
        </span>`;
            } // debug color
            tileHtml += `</p>`;
        }
        title.innerHTML = titleHtml;
        tiles.innerHTML = tileHtml;
        // debug
        this.debugHighlightRoomStartingPositions();
        // debug
    }
    getTileColor(tile) {
        if (tile.isVisible) {
            return tile.isOccupied ? tile.occupiers[0].color.val() : tile.color.val();
        }
        else {
            return tile.hasVisited ? Color_1.Colors.HAS_VISITED_TILE.val() : Color_1.Colors.BACKGROUD_COLOR.val();
        }
    }
    getTileId(y, x) {
        return `${y}-${x}`;
    }
    attemptPlayerMovement(keyValue) {
        const { player, currentFloor } = Game_1.default.instance;
        const { pos } = player;
        const { tiles } = currentFloor;
        let nextPos;
        switch (keyValue) {
            case 'w':
                nextPos = Vector_1.default.apply(pos, new Vector_1.default(0, -1));
                break;
            case 'a':
                nextPos = Vector_1.default.apply(pos, new Vector_1.default(-1, 0));
                break;
            case 's':
                nextPos = Vector_1.default.apply(pos, new Vector_1.default(0, 1));
                break;
            case 'd':
                nextPos = Vector_1.default.apply(pos, new Vector_1.default(1, 0));
                break;
            case 'q':
                nextPos = Vector_1.default.apply(pos, new Vector_1.default(-1, -1));
                break;
            case 'e':
                nextPos = Vector_1.default.apply(pos, new Vector_1.default(1, -1));
                break;
            case 'z':
                nextPos = Vector_1.default.apply(pos, new Vector_1.default(-1, 1));
                break;
            case 'c':
                nextPos = Vector_1.default.apply(pos, new Vector_1.default(1, 1));
                break;
        }
        // Quickest checks first!
        if (player.canMove && currentFloor.inBounds(currentFloor.floorWidth, currentFloor.floorHeight, nextPos)) {
            const { isPassible, isOccupied, occupiers } = tiles[nextPos.y][nextPos.x];
            if (isPassible && !isOccupied) {
                const prevPos = player.pos;
                Game_1.default.instance.updatePlayerPos(player, nextPos);
                this.redrawTile(prevPos);
                this.redrawTile(nextPos);
            }
            else if (isOccupied) {
                let target;
                let messages = [];
                // Find the first enemy in the space
                // @TODO there really shouldn't be more than one enemy in a single space
                // There might be something like an enemy and some items on the floor, debris, or a trap
                for (let i = 0; i < occupiers.length; i++) {
                    if (occupiers[i].isInteractive && occupiers[i].isEnemy) {
                        target = occupiers[i];
                        if (player.attemptAttack(target)) {
                            // Make sure to set the target as active if there's some kind of sneak attack
                            if (!target.isActive) {
                                target.isActive = true;
                                Game_1.default.instance.currentFloor.activeEnemies.push(target);
                            }
                            const damage = player.attack(target);
                            messages.push(player.formatSuccessfulAttack(damage, target));
                        }
                        else {
                            messages.push(player.formatUnsuccessfulAttack(target));
                        }
                    }
                }
                return messages;
            }
            else if (!isPassible) {
            }
            else {
                console.log('Something is not right here. Check your logic, ya dingus.');
            }
        }
        return null;
    }
    playerWait() {
        const { player } = Game_1.default.instance;
        player.hasMoveInteracted = true;
    }
    showScreen(screen) {
        Game_1.default.instance.activeScreen = Game_1.default.instance.screens[screen];
    }
    attemptDescend() {
        const { currentFloor, player } = Game_1.default.instance;
        if (currentFloor.tiles[player.pos.y][player.pos.x].type === Tile_1.TileTypes.FLOOR_DOWN) {
            Game_1.default.instance.playerDescend();
        }
        else {
            return [{
                    text: 'You cannot descend here.'
                }];
        }
    }
    debugHighlightRoomStartingPositions() {
        Game_1.default.instance.currentFloor.rooms.forEach((room) => {
            const selector = this.getTileId(room.pos.y, room.pos.x);
            document.getElementById(selector).style.border = '1px solid blue';
        });
    }
    redrawTile(pos) {
        const selector = this.getTileId(pos.y, pos.x);
        const tile = Game_1.default.instance.currentFloor.tiles[pos.y][pos.x];
        const { char } = tile.isOccupied ? tile.occupiers[0] : tile; // @TODO update to show the most important occupier to display, maybe with z values
        const tileColor = this.getTileColor(tile);
        const el = document.getElementById(selector);
        el.innerText = char;
        el.style.color = tileColor;
        el.style.border = 'none';
    }
}
exports.default = MapScreen;
//# sourceMappingURL=MapScreen.js.map