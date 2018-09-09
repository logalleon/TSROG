"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("./Screen/Screen");
const Input_1 = require("./Input");
const Messenger_1 = require("./Message/Messenger");
const DungeonGenerator_1 = require("./Map/DungeonGenerator");
const Legendary_1 = require("./Random/Legendary");
const easystarjs_1 = require("../custom_modules/easystarjs");
const Effects_1 = require("./Effects");
const StatusMenu_1 = require("./UI/StatusMenu");
const Visibility_1 = require("./Map/Visibility");
const Color_1 = require("./Canvas/Color");
class Game {
    constructor(screens, player) {
        this.easystarClosedTile = 0;
        this.easystarOpenTile = 1;
        this.easystarOccupiedTile = 2;
        if (Game.instance !== null) {
            throw 'Critical error! Two game instances';
        }
        else {
            Game.instance = this;
        }
        this.player = player;
        this.screens = screens;
        this.activeScreen = screens[Screen_1.ScreenNames.MAP];
        this.keyMap = {};
        this.messenger = new Messenger_1.Messenger({
            panel1: document.getElementById('panel-1'),
            panel2: document.getElementById('panel-2'),
            panel3: document.getElementById('panel-3'),
            bottom: document.getElementById('status-menu')
        });
        window.onkeydown = this.handleInput.bind(this);
        window.onkeyup = this.handleInput.bind(this);
        // Legendary has to load before the floor and dungeon generators
        this.legendary = new Legendary_1.Legendary();
        this.dungeonGenerator = new DungeonGenerator_1.DungeonGenerator({
            depth: 8
        });
        this.effects = new Effects_1.Effects(document.getElementById('transition-wrapper'));
        // Create and render the status menu
        this.statusMenu = new StatusMenu_1.StatusMenu(document.getElementById('status-menu'));
        this.statusMenu.render();
        // Debug
        //this.dungeonGenerator.debugAndGenerateAllFloors();
        this.dungeonGenerator.generateNewFloor();
        this.currentFloor = this.dungeonGenerator.floors[0];
        this.initializeEasyStar();
        this.updatePlayerPos(this.player, this.dungeonGenerator.floors[0].floorStart);
        this.effects.transitionToNextFloor();
        // Debug
        this.activeScreen.render([]); // @TODO make sure the map screen is always the first screen
        // Set the initial LOS
        this.raycaster = new Visibility_1.default(this.currentFloor.floorWidth, this.currentFloor.floorHeight);
        this.raycaster.resetLos(player.pos, player.los);
        this.raycaster.compute(player.pos, player.los);
    }
    /**
     * Effectively, this is the game loop. Since everything is turn-based,
     * the browser window waits for input and then responds accordingly.
     * Sometimes the screen is changed, sometimes enemies move: it all
     * depends on what the key input is from the user.
     * @param e - event
     */
    handleInput(e) {
        e.preventDefault();
        const { keyCode, type } = e;
        const { player } = this;
        this.keyMap[keyCode] = type === 'keydown';
        // Ignore the Shift key, which is just a key modifier
        if (type === 'keydown' && Input_1.keyCodeToChar[keyCode] !== 'Shift') {
            // Get the char value of the current key
            let char = Input_1.mapKeyPressToActualCharacter(Boolean(this.keyMap[Input_1.keyCharToCode['Shift']]), keyCode);
            // Not an uppercase-able character returns and empty string
            char = char.trim();
            if (!char) {
                char = Input_1.keyCodeToChar[keyCode];
            }
            // Handle the player input first. The player gets priority for everything
            const inputMessages = this.activeScreen.handleInput(char);
            let messages = Array.isArray(inputMessages) ? inputMessages : [];
            /**
             * If the player has move interacted, scan each room in the floor to see if it needs
             * to be activated
             */
            if (player.hasMoveInteracted) {
                this.currentFloor.checkPlayerRoomCollision(player.pos);
                this.raycaster.resetLos(player.pos, player.los);
                this.raycaster.compute(player.pos, player.los);
                this.player.hunger.update();
                this.player.thirst.update();
            }
            /**
             * If the player has either moved or interacted with an interactable object,
             * then enemies all get a turn to attack the player. This flag isn't set for certain
             * actions that the play takes, such as inspecting a nearby tile, which essentially
             * a free action.
             */
            if (player.hasMoveInteracted && this.currentFloor.activeEnemies.length) {
                const enemyActions = this.currentFloor.activeEnemies.map(enemy => enemy.act()).reduce((actions, action) => actions.concat(action));
                const enemyUpdates = this.currentFloor.activeEnemies.map(enemy => enemy.update()).reduce((updates, update) => updates.concat(update));
                messages = messages.concat(Array.isArray(enemyActions) ? enemyActions : [], Array.isArray(enemyUpdates) ? enemyUpdates : []);
            }
            // See player.update description
            const playerMessages = player.update();
            // Clear the current message window
            this.messenger.clearPanel(Messenger_1.Panel.PANEL_1);
            this.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, messages.concat(Array.isArray(playerMessages) ? playerMessages : []));
            // Update internals of the game
            this.update();
            // Finally, render what's changed
            // @TODO this shouldn't apply to the map screen
            if (this.activeScreen.name !== Screen_1.ScreenNames.MAP) {
                this.activeScreen.render([]);
            }
        }
    }
    updatePlayerPos(player, nextPos) {
        const { tiles } = this.currentFloor;
        const { x, y } = player.pos;
        const { x: nextX, y: nextY } = nextPos;
        // This is a reference to the row and the items themselves - don't forget they're essentially pointers
        let p_row = tiles[y];
        let p_item = p_row[x];
        // @TODO This isn't right. Clearing out the occupiers will mess up what's in that tile
        // especially when Tile becomes a class
        p_item.occupiers = [];
        p_item.isOccupied = false;
        // Select the next row and tiles
        p_row = tiles[nextY];
        p_item = p_row[nextX];
        p_item.occupiers = [player];
        p_item.isOccupied = true;
        // @TODO revisit above
        this.currentFloor.tiles = tiles;
        player.move(nextPos);
    }
    update() {
        this.currentFloor.activeEnemies = this.currentFloor.activeEnemies.filter(this.corpsify.bind(this));
        if (this.player.isDead()) {
            this.playerDeath();
        }
    }
    corpsify(enemy) {
        if (enemy.isDead()) {
            this.removeDeadOccupants(enemy.pos);
            // @TODO generate a bloody mess to inspect
        }
        return enemy.isActive;
    }
    initializeEasyStar() {
        this.easystar = new easystarjs_1.js();
        this.easystarTiles = this.generateEasystarTiles();
        this.easystar.setGrid(this.easystarTiles);
        this.easystar.setAcceptableTiles([this.easystarOpenTile, this.easystarOccupiedTile]);
        this.easystar.enableDiagonals();
        this.easystar.enableSync();
    }
    removeDeadOccupants(pos) {
        const { x, y } = pos;
        let { occupiers } = this.currentFloor.tiles[y][x];
        // @TODO change this to inspectable
        this.currentFloor.tiles[y][x].char = occupiers[0].char;
        this.currentFloor.tiles[y][x].color = Color_1.Colors.STANDARD_CORPSE;
        // Bring out the dead
        occupiers = occupiers.filter(occupier => !occupier.isDead());
        this.currentFloor.tiles[y][x].occupiers = occupiers;
        this.currentFloor.tiles[y][x].isOccupied = Boolean(occupiers.length);
    }
    generateEasystarTiles() {
        let easystarTiles = [];
        for (let y = 0; y < this.currentFloor.tiles.length; y++) {
            easystarTiles[y] = [];
            for (let x = 0; x < this.currentFloor.tiles[y].length; x++) {
                const currentTile = this.currentFloor.tiles[y][x];
                easystarTiles[y].push(!currentTile.isPassible ?
                    this.easystarClosedTile :
                    currentTile.isOccupied ?
                        this.easystarOccupiedTile :
                        this.easystarOpenTile);
            }
        }
        // Set the player's location to open so the AI can "move" there
        const { x, y } = this.player.pos;
        easystarTiles[y][x] = this.easystarOpenTile;
        return easystarTiles;
    }
    updateEasystarTiles() {
        this.easystarTiles = this.generateEasystarTiles();
        this.easystar.setGrid(this.easystarTiles);
    }
    setTileToOpen(pos) {
        this.easystar.setTileAt(pos.x, pos.y, this.easystarOpenTile);
    }
    setTileToClosed(pos) {
        this.easystar.setTileAt(pos.x, pos.y, this.easystarClosedTile);
    }
    getPath(pos1, pos2) {
        const { easystar } = this;
        let found = [];
        easystar.findPath(pos1.x, pos1.y, pos2.x, pos2.y, (path) => {
            if (!path) {
            }
            else {
                found = path;
            }
        });
        easystar.calculate();
        return found;
    }
    updateEnemyPosition(oldPos, newPos, enemy) {
        const { x, y } = oldPos;
        // Remove here
        this.currentFloor.tiles[y][x].occupiers = this.currentFloor.tiles[y][x].occupiers.filter(occupier => !occupier.isEnemy);
        this.currentFloor.tiles[y][x].isOccupied = false;
        // Add to the next position
        try {
            Array.isArray(this.currentFloor.tiles[newPos.y][newPos.x].occupiers) ?
                this.currentFloor.tiles[newPos.y][newPos.x].occupiers.push(enemy) :
                this.currentFloor.tiles[newPos.y][newPos.x].occupiers = [enemy];
            this.currentFloor.tiles[newPos.y][newPos.x].isOccupied = true;
        }
        catch (e) {
            console.log(oldPos, newPos, this.currentFloor.tiles);
        }
    }
    playerDescend() {
        const { floors, currentDepth } = this.dungeonGenerator;
        if (floors[currentDepth + 1]) {
            this.currentFloor = floors[currentDepth + 1];
        }
        else {
            this.dungeonGenerator.generateNewFloor();
            // Dungeon generator updates the depth automatically
            this.currentFloor = floors[this.dungeonGenerator.currentDepth - 1];
            this.updatePlayerPos(this.player, this.dungeonGenerator.floors[this.dungeonGenerator.currentDepth - 1].floorStart);
            // @TODO Seems like the previous easystar tiles should be saved somehow
            this.initializeEasyStar();
        }
        this.effects.transitionToNextFloor();
        this.raycaster.updateMapSize(this.currentFloor.floorWidth, this.currentFloor.floorHeight);
        this.activeScreen.render([]); // @TODO will this always be the map screen that gets re-rendered?
    }
    playerDeath() {
        this.player.canMove = false;
        // @TODO other things need to happen here
        this.effects.showDeathScreen();
    }
}
Game.instance = null;
exports.default = Game;
//# sourceMappingURL=Game.js.map