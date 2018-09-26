"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tile_1 = require("../Map/Tile");
const Room_1 = require("./Room");
const Corridor_1 = require("./Corridor");
const Game_1 = require("../Game");
const Vector_1 = require("../Vector");
const roman_numeral_1 = require("roman-numeral");
const Geometry_1 = require("../Geometry");
const Prop_data_1 = require("../Entity/Prop/Prop.data");
const ossuary_1 = require("ossuary");
const Random_1 = require("ossuary/dist/lib/Random");
class Floor {
    constructor(options) {
        this.rooms = [];
        this.corridors = [];
        this.enemies = [];
        this.activeEnemies = [];
        for (let key in options) {
            this[key] = options[key];
        }
    }
    buildFloor() {
        this.generateName();
        this.rooms = [];
        this.corridors = [];
        const numRooms = ossuary_1.Random.randomIntRange(this.numRoomsRange);
        const numCorridors = numRooms - 1;
        this.rooms.push(new Room_1.Room());
        this.corridors.push(new Corridor_1.Corridor());
        this.rooms[0].initialRoom(this.roomWidthRange, this.roomHeightRange, this.floorWidth, this.floorHeight);
        this.corridors[0].setup(this.rooms[0], this.corridorLengthRange, this.roomWidthRange, this.roomHeightRange, this.floorWidth, this.floorHeight, true);
        for (let i = 1; i < numRooms; i++) {
            this.rooms.push(new Room_1.Room());
            this.rooms[i].subsequentRoom(this.roomWidthRange, this.roomHeightRange, this.floorWidth, this.floorHeight, this.corridors[i - 1]);
            if (i < numCorridors) {
                this.corridors.push(new Corridor_1.Corridor());
                this.corridors[i].setup(this.rooms[i], this.corridorLengthRange, this.roomWidthRange, this.roomHeightRange, this.floorWidth, this.floorHeight, false);
            }
        }
        this.setVoidTiles();
        this.setRoomTiles();
        this.setCorridorTiles();
        // Walls are added around rooms and corridors, so this has to be called afterwards
        this.setWalls();
        this.setDoorTiles();
        // This cuts of "extra" void tiles around the map
        //this.trimFloor();
        // Make sure to call placement of items with a pos after trim so the positions are correct
        this.spawnEnemies();
        this.setStaircaseTiles();
        // Spawn pickups
        this.spawnPickups();
        if (this.floorPersistance && this.floorPersistance.persistance) {
            this.willPersistFor = ossuary_1.Random.randomIntRange(this.floorPersistance.persistance);
            this.floorPersistance.startIndex = this.depth;
        }
    }
    setVoidTiles() {
        this.tiles = [];
        for (let y = 0; y < this.floorHeight; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.floorWidth; x++) {
                // These all point to the same void tile instance
                this.tiles[y][x] = Game_1.default.instance.dungeonGenerator.tileSpawner.voidTile;
            }
        }
    }
    setRoomTiles() {
        this.rooms.forEach((room) => {
            for (let row = 0; row < room.roomHeight; row++) {
                const y = room.pos.y + row;
                const p_row = this.tiles[y];
                for (let col = 0; col < room.roomWidth; col++) {
                    const x = room.pos.x + col;
                    p_row[x] = Game_1.default.instance.dungeonGenerator.tileSpawner.getTile({
                        region: this.regionName,
                        isPassible: true,
                        type: Tile_1.TileTypes.FLOOR
                    });
                }
            }
        });
    }
    setCorridorTiles() {
        this.corridors.forEach((corridor) => {
            for (let i = 0; i < corridor.length; i++) {
                let { x, y } = corridor.startingPosition;
                switch (corridor.direction) {
                    case Corridor_1.Direction.North:
                        y += i;
                        break;
                    case Corridor_1.Direction.East:
                        x += i;
                        break;
                    case Corridor_1.Direction.South:
                        y -= i;
                        break;
                    case Corridor_1.Direction.West:
                        x -= i;
                        break;
                }
                // @TODO something isn't right here . . . the start of a corridor should always be
                // in bounds, right?
                if (this.inBounds(this.floorWidth, this.floorHeight, new Vector_1.default(x, y))) {
                    this.tiles[y][x] = Game_1.default.instance.dungeonGenerator.tileSpawner.getTile({
                        region: this.regionName,
                        isPassible: true,
                        type: Tile_1.TileTypes.FLOOR
                    });
                }
            }
        });
    }
    setDoorTiles() {
        this.corridors.forEach((corridor) => {
            let { x, y } = corridor.startingPosition;
            if (this.inBounds(this.floorWidth, this.floorHeight, corridor.startingPosition)) {
                // @TODO 'walk back' if there are tiles prevent the door from being any use
                this.tiles[y][x] = Game_1.default.instance.dungeonGenerator.tileSpawner.getTile({
                    depth: this.depth,
                    type: Tile_1.TileTypes.DOOR
                });
            }
        });
    }
    setStaircaseTiles() {
        const startingRoom = this.rooms[0];
        let startingPosition = this.getRandomPointInRoom(startingRoom);
        // Don't set staircases near the edge of rooms.
        ossuary_1.Random.clamp(startingPosition.x, startingRoom.pos.x + 1, startingRoom.pos.x + startingRoom.roomWidth - 2);
        ossuary_1.Random.clamp(startingPosition.y, startingRoom.pos.y + 1, startingRoom.pos.y + startingRoom.roomHeight - 2);
        this.tiles[startingPosition.y][startingPosition.x] = Game_1.default.instance.dungeonGenerator.tileSpawner.getTile({
            type: Tile_1.TileTypes.FLOOR_UP
        });
        this.floorStart = startingPosition;
        if (this.depth !== Game_1.default.instance.dungeonGenerator.maxDepth - 1) {
            // @TODO hard-coded? maybe the location of ending staircase should depend on floor options
            const endingRoom = this.rooms[ossuary_1.Random.randomInt(this.rooms.length - 3, this.rooms.length - 1)];
            let endingPosition = this.getRandomPointInRoom(endingRoom);
            // Don't set staircases near the edge of rooms.
            ossuary_1.Random.clamp(endingPosition.x, endingRoom.pos.x + 1, endingRoom.pos.x + endingRoom.roomWidth - 2);
            ossuary_1.Random.clamp(endingPosition.y, endingRoom.pos.y + 1, endingRoom.pos.y + endingRoom.roomHeight - 2);
            this.tiles[endingPosition.y][endingPosition.x] = Game_1.default.instance.dungeonGenerator.tileSpawner.getTile({
                type: Tile_1.TileTypes.FLOOR_DOWN
            });
        }
    }
    setWalls() {
        const { tileSpawner } = Game_1.default.instance.dungeonGenerator;
        const { regionName: region } = this;
        const isPassible = false;
        const type = Tile_1.TileTypes.WALL;
        this.rooms.forEach((room) => {
            let y;
            let x;
            let row;
            let col;
            // West wall
            for (row = -1; row < room.roomHeight + 1; row++) {
                x = room.pos.x - 1;
                y = room.pos.y + row;
                if (this.tiles[y] && this.tiles[y][x] && this.tiles[y][x].type === Tile_1.TileTypes.VOID) {
                    this.tiles[y][x] = tileSpawner.getTile({ region, isPassible, type });
                }
            }
            // North wall
            for (col = -1; col < room.roomWidth + 1; col++) {
                x = room.pos.x + col;
                y = room.pos.y - 1;
                if (this.tiles[y] && this.tiles[y][x] && this.tiles[y][x].type === Tile_1.TileTypes.VOID) {
                    this.tiles[y][x] = tileSpawner.getTile({ region, isPassible, type });
                }
            }
            // East wall
            for (row = -1; row < room.roomHeight + 1; row++) {
                x = room.pos.x + room.roomWidth;
                y = room.pos.y + row;
                if (this.tiles[y] && this.tiles[y][x] && this.tiles[y][x].type === Tile_1.TileTypes.VOID) {
                    this.tiles[y][x] = tileSpawner.getTile({ region, isPassible, type });
                }
            }
            // South wall
            for (col = -1; col < room.roomWidth + 1; col++) {
                x = room.pos.x + col;
                y = room.pos.y + room.roomHeight;
                if (this.tiles[y] && this.tiles[y][x] && this.tiles[y][x].type === Tile_1.TileTypes.VOID) {
                    this.tiles[y][x] = tileSpawner.getTile({ region, isPassible, type });
                }
            }
        });
        this.corridors.forEach((corridor) => {
            let north;
            let east;
            let south;
            let west;
            for (let i = 0; i < corridor.length; i++) {
                let { x, y } = corridor.startingPosition;
                switch (corridor.direction) {
                    case Corridor_1.Direction.North:
                        y += i;
                        west = x - 1;
                        east = x + 1;
                        if (this.tiles[y] && this.tiles[y][west] && this.tiles[y][west].type === Tile_1.TileTypes.VOID) {
                            this.tiles[y][west] = tileSpawner.getTile({ region, isPassible, type });
                        }
                        if (this.tiles[y] && this.tiles[y][east] && this.tiles[y][east].type === Tile_1.TileTypes.VOID) {
                            this.tiles[y][east] = tileSpawner.getTile({ region, isPassible, type });
                        }
                        break;
                    case Corridor_1.Direction.East:
                        x += i;
                        north = y - 1;
                        south = y + 1;
                        if (this.tiles[north] && this.tiles[north][x] && this.tiles[north][x].type === Tile_1.TileTypes.VOID) {
                            this.tiles[north][x] = tileSpawner.getTile({ region, isPassible, type });
                        }
                        if (this.tiles[south] && this.tiles[south][x] && this.tiles[south][x].type === Tile_1.TileTypes.VOID) {
                            this.tiles[south][x] = tileSpawner.getTile({ region, isPassible, type });
                        }
                        break;
                    case Corridor_1.Direction.South:
                        y -= i;
                        west = x - 1;
                        east = x + 1;
                        if (this.tiles[y] && this.tiles[y][west] && this.tiles[y][west].type === Tile_1.TileTypes.VOID) {
                            this.tiles[y][west] = tileSpawner.getTile({ region, isPassible, type });
                        }
                        if (this.tiles[y] && this.tiles[y][east] && this.tiles[y][east].type === Tile_1.TileTypes.VOID) {
                            this.tiles[y][east] = tileSpawner.getTile({ region, isPassible, type });
                        }
                        break;
                    case Corridor_1.Direction.West:
                        x -= i;
                        north = y - 1;
                        south = y + 1;
                        if (this.tiles[north] && this.tiles[north][x] && this.tiles[north][x].type === Tile_1.TileTypes.VOID) {
                            this.tiles[north][x] = tileSpawner.getTile({ region, isPassible, type });
                        }
                        if (this.tiles[south] && this.tiles[south][x] && this.tiles[south][x].type === Tile_1.TileTypes.VOID) {
                            this.tiles[south][x] = tileSpawner.getTile({ region, isPassible, type });
                        }
                        break;
                }
                // @TODO something isn't right here . . . the start of a corridor should always be
                // in bounds, right?
                if (this.inBounds(this.floorWidth, this.floorHeight, new Vector_1.default(x, y))) {
                    this.tiles[y][x] = Game_1.default.instance.dungeonGenerator.tileSpawner.getTile({
                        region: this.regionName,
                        isPassible: true,
                        type: Tile_1.TileTypes.FLOOR
                    });
                }
            }
        });
    }
    // @TODO not sure where this is used
    hasAdjacentFloorTiles(tile, pos) {
        const { x, y } = pos;
        const { FLOOR } = Tile_1.TileTypes;
        return ((this.tiles[y - 1] && this.tiles[y - 1][x].type === Tile_1.TileTypes.FLOOR) ||
            (this.tiles[y + 1] && this.tiles[y + 1][x].type === Tile_1.TileTypes.FLOOR) ||
            (this.tiles[y][x - 1] && this.tiles[y][x - 1].type === Tile_1.TileTypes.FLOOR) ||
            (this.tiles[y][x + 1] && this.tiles[y][x + 1].type === Tile_1.TileTypes.FLOOR));
    }
    getRandomPointInRoom(room) {
        const x = ossuary_1.Random.randomInt(room.pos.x, room.roomWidth + room.pos.x);
        const y = ossuary_1.Random.randomInt(room.pos.y, room.roomHeight + room.pos.y);
        // Just fucking Random.clamp to the bounds of the map
        return new Vector_1.default(ossuary_1.Random.clamp(x, 0, this.floorWidth - 1), ossuary_1.Random.clamp(y, 0, this.floorHeight - 1));
    }
    inBounds(width, height, v) {
        return v.x >= 0 &&
            v.y >= 0 &&
            v.x < width &&
            v.y < height;
    }
    generateName() {
        this.name = Game_1.default.instance.legendary.parse(this.name);
        // Starting floor in a sequence
        if (this.floorPersistance) {
            if (this.floorPersistance.persistance) {
                this.nameInSequence = 1;
            }
            else {
                this.nameInSequence = (this.depth - this.floorPersistance.startIndex) + 1;
            }
        }
    }
    spawnEnemies() {
        const { enemySpawner } = Game_1.default.instance.dungeonGenerator;
        let currentCR = 0;
        while (currentCR < this.maxCR) {
            const e = enemySpawner.createEnemyByCr(ossuary_1.Random.randomIntRange(this.floorCRRange), null, this.regionName);
            currentCR += e.cr;
            // If the enemy can't be placed, don't place it
            if (this.placeEnemyOnMap(e)) {
                this.enemies.push(e);
            }
        }
    }
    spawnPickups() {
        const { propSpawner } = Game_1.default.instance.dungeonGenerator;
        let totalPickups = ossuary_1.Random.randomIntRange(this.pickupsRange);
        while (totalPickups) {
            const baseDamage = {
                damageRange: new Random_1.IntegerRange(4, 8),
                bonusRange: new Random_1.IntegerRange(0, 1),
                type: ossuary_1.Random.pluck([Prop_data_1.DamageType.STRIKE, Prop_data_1.DamageType.SLASH])
            };
            // @TODO debug
            const params = {
                baseDamage,
                quality: [Prop_data_1.Quality.RUINED, Prop_data_1.Quality.POOR],
                material: Prop_data_1.MaterialType.METAL
            };
            const pickup = propSpawner.spawnWeapon(params);
            this.placePickupOnMap(pickup);
            totalPickups--;
        }
    }
    placeEnemyOnMap(enemy) {
        // @TODO maybe make this smarter
        let tries = 5;
        const placementRange = new Random_1.IntegerRange(1, this.rooms.length - 1);
        const roomIndex = ossuary_1.Random.randomIntRange(placementRange);
        const possiblePosition = this.getRandomPointInRoom(this.rooms[roomIndex]);
        while (tries) {
            const { x, y } = possiblePosition;
            if (!this.tiles[y][x].isOccupied) {
                enemy.pos = possiblePosition;
                enemy.roomIndex = roomIndex;
                this.tiles[y][x].isOccupied = true;
                this.tiles[y][x].occupiers = [enemy];
                return true;
            }
            tries--;
        }
        return false;
    }
    placePickupOnMap(pickup) {
        // @TODO maybe make this smarter
        let tries = 10;
        const placementRange = new Random_1.IntegerRange(1, this.rooms.length - 1);
        const roomIndex = ossuary_1.Random.randomIntRange(placementRange);
        const possiblePosition = this.getRandomPointInRoom(this.rooms[roomIndex]);
        while (tries) {
            const { x, y } = possiblePosition;
            if (!this.tiles[y][x].isOccupied) {
                pickup.pos = possiblePosition;
                this.tiles[y][x].isOccupied = true;
                this.tiles[y][x].occupiers = [pickup];
                return true;
            }
            tries--;
        }
        return false;
    }
    getFormattedName() {
        return `
      ${this.name}${this.nameInSequence ? ` ${roman_numeral_1.convert(this.nameInSequence)}` : ''}
      <br/>${this.regionName} - Depth ${this.depth}
    `;
    }
    isOccupied(pos) {
        const { x, y } = pos;
        return (this.tiles[y] &&
            this.tiles[y][x] &&
            this.tiles[y][x].isOccupied);
    }
    // Trim off void tiles
    trimFloor() {
        let top;
        let left;
        let right;
        let bottom;
        for (let row = 0; row < this.floorHeight; row++) {
            for (let col = 0; col < this.floorWidth; col++) {
                if (this.tiles[row][col].type !== Tile_1.TileTypes.VOID) {
                    bottom = row;
                    break;
                }
            }
        }
        for (let row = this.floorHeight - 1; row > 0; row--) {
            for (let col = this.floorWidth - 1; col > 0; col--) {
                if (this.tiles[row][col].type !== Tile_1.TileTypes.VOID) {
                    top = row;
                    break;
                }
            }
        }
        let trimmedTiles = [];
        for (let row = top; row <= bottom + 1; row++) {
            trimmedTiles[row - top] = [];
            for (let col = 0; col < this.floorWidth; col++) {
                trimmedTiles[row - top][col] = this.tiles[row][col];
                if (trimmedTiles[row - top][col].pos) {
                    trimmedTiles[row - top][col].pos.y = [row - top];
                }
            }
        }
        this.tiles = trimmedTiles;
        this.floorHeight = bottom - top;
        // Adjust the position of the rooms
        this.rooms.forEach((room) => {
            room.pos.y -= (top);
            // -= top - bottom
        });
        this.corridors.forEach((corridor) => {
            corridor.startingPosition.y -= (bottom - top);
            corridor.endPosition.y -= top - bottom;
        });
    }
    checkPlayerRoomCollision(pos) {
        this.rooms.forEach((room, roomIndex) => {
            if (!room.isActive) {
                let halfHeight = room.roomHeight / 2;
                let halfWidth = room.roomWidth / 2;
                let top = room.pos.y + room.roomHeight;
                let bottom = room.pos.y;
                let left = room.pos.x;
                let right = room.pos.x + room.roomWidth;
                if (Geometry_1.pointInBoxCollision(pos, top, bottom, left, right)) {
                    room.isActive = true;
                    // Activate all enemeies in that room
                    this.enemies.forEach((enemy) => {
                        if (enemy.roomIndex === roomIndex) {
                            enemy.isActive = true;
                            this.activeEnemies.push(enemy);
                        }
                    });
                }
            }
        });
    }
}
exports.Floor = Floor;
//# sourceMappingURL=Floor.js.map