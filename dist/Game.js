"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("./Screen/Screen");
const Input_1 = require("./Input");
const Messenger_1 = require("./Message/Messenger");
const DungeonGenerator_1 = require("./Map/DungeonGenerator");
const easystarjs_1 = require("../custom_modules/easystarjs");
const Effects_1 = require("./Effects");
const StatusMenu_1 = require("./UI/StatusMenu");
const Visibility_1 = require("./Map/Visibility");
const Color_1 = require("./Canvas/Color");
const Prop_data_1 = require("./Entity/Prop/Prop.data");
const Weapon_data_1 = require("./Entity/Prop/Weapon/Weapon.data");
const ossuary_1 = require("ossuary");
const EntityManager_1 = require("./Entity/EntityManager");
const ScreenManager_1 = require("./Screen/ScreenManager");
class Game {
    constructor(player) {
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
        this.legendary = new ossuary_1.Parser(Object.assign({}, Prop_data_1.materialData, Weapon_data_1.weaponData));
        this.dungeonGenerator = new DungeonGenerator_1.DungeonGenerator({
            depth: 8
        });
        // Load all screens through the manager
        this.screenManager = new ScreenManager_1.ScreenManager();
        this.effects = new Effects_1.Effects(document.getElementById('transition-wrapper'));
        // Create and render the status menu
        this.statusMenu = new StatusMenu_1.StatusMenu(document.getElementById('status-menu'));
        this.statusMenu.render();
        // Always instantiate the entity manager before the dungeon itself
        this.entityManager = new EntityManager_1.EntityManager();
        // Debug
        //this.dungeonGenerator.debugAndGenerateAllFloors();
        this.dungeonGenerator.generateNewFloor();
        this.currentFloor = this.dungeonGenerator.floors[0];
        this.initializeEasyStar();
        this.entityManager.updatePlayerPos(this.player, this.dungeonGenerator.floors[0].floorStart);
        this.effects.transitionToNextFloor();
        // Debug
        this.screenManager.activeScreen.render([]); // @TODO make sure the map screen is always the first screen
        // Set the initial LOS
        this.raycaster = new Visibility_1.default(this.currentFloor.floorWidth, this.currentFloor.floorHeight);
        this.raycaster.resetLos(player.pos, player.los);
        this.raycaster.compute(player.pos, player.los);
        // You should always start on the right screen for now
        this.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [{ text: 'This is the map screen', color: Color_1.Colors.DEFAULT }]);
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
            console.log(char);
            const inputMessages = this.screenManager.activeScreen.handleInput(char);
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
            if (this.screenManager.activeScreen.name !== Screen_1.ScreenNames.MAP) {
                this.screenManager.activeScreen.render([]);
            }
        }
    }
    update() {
        this.currentFloor.activeEnemies = this.currentFloor.activeEnemies.filter(this.entityManager.corpsify.bind(this));
        if (this.player.isDead()) {
            this.playerDeath();
        }
    }
    initializeEasyStar() {
        this.easystar = new easystarjs_1.js();
        this.easystarTiles = this.generateEasystarTiles();
        this.easystar.setGrid(this.easystarTiles);
        this.easystar.setAcceptableTiles([this.easystarOpenTile, this.easystarOccupiedTile]);
        this.easystar.enableDiagonals();
        this.easystar.enableSync();
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
    playerDescend() {
        const { floors, currentDepth } = this.dungeonGenerator;
        if (floors[currentDepth + 1]) {
            this.currentFloor = floors[currentDepth + 1];
        }
        else {
            this.dungeonGenerator.generateNewFloor();
            // Dungeon generator updates the depth automatically
            this.currentFloor = floors[this.dungeonGenerator.currentDepth - 1];
            this.entityManager.updatePlayerPos(this.player, this.dungeonGenerator.floors[this.dungeonGenerator.currentDepth - 1].floorStart);
            // @TODO Seems like the previous easystar tiles should be saved somehow
            this.initializeEasyStar();
        }
        this.effects.transitionToNextFloor();
        this.raycaster.updateMapSize(this.currentFloor.floorWidth, this.currentFloor.floorHeight);
        this.screenManager.activeScreen.render([]); // @TODO will this always be the map screen that gets re-rendered?
    }
    playerDeath() {
        this.player.canMove = false;
        // @TODO other things need to happen here
        this.effects.showDeathScreen();
    }
    removeObjectFromMap(pos, index) {
        // @TODO this will eventually require the index of the item to be removed
        if (index) {
            let arr = this.currentFloor.tiles[pos.y][pos.x].occupiers;
            arr = [].concat(arr.slice(0, index), arr.slice(index + 1));
            this.currentFloor.tiles[pos.y][pos.x].occupiers = arr;
        }
        else {
            this.currentFloor.tiles[pos.y][pos.x].occupiers.pop(); // should work for now
        }
    }
}
Game.instance = null;
exports.default = Game;
//# sourceMappingURL=Game.js.map