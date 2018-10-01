"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actor_1 = require("./Actor");
const Messenger_1 = require("../../Message/Messenger");
const Color_1 = require("../../Canvas/Color");
const Game_1 = require("../../Game");
const { colorize } = Messenger_1.Messenger;
const MASSIVE_DAMAGE_THRESHOLD = .30;
class Enemy extends Actor_1.Actor {
    constructor(options, variation) {
        super(options.actorOptions);
        this.isInteractive = true;
        this.isEnemy = true;
        this.isActive = false;
        this.attackRange = Actor_1.AttackRange.MELEE;
        for (let key in options) {
            if (key !== 'actorOptions') {
                this[key] = options[key];
            }
        }
        this.massiveDamageThreshold = Math.ceil(this.hp * MASSIVE_DAMAGE_THRESHOLD);
        if (variation) {
            this.applyVariation(variation);
        }
    }
    act() {
        // You can't act if you're dead (points to head)
        if (!this.isDead()) {
            const { player } = Game_1.default.instance;
            if (!player.hasMoved) {
                // If the player hasn't moved but has attacked or used a potion / scroll, attack
                if (this.inRange()) {
                    return this.targetAndAttemptAttackPlayer(player);
                    // If the player hasn't moved but is still too far away, attempt to move closer
                }
                else {
                    this.path = this.getUpdatedPath();
                    // Could calculate a new path, maybe something is blocking
                    if (this.path.length === 0) {
                        return [];
                    }
                    const nextPos = this.path[this.path.length - 2];
                    if (!Game_1.default.instance.currentFloor.isOccupied(nextPos)) {
                        // Make sure to adjust the length of the path after moving in case it isn't recalculated later
                        this.path.pop();
                        this.move(nextPos);
                        return [];
                    }
                    else {
                        return [];
                    }
                }
                // Always update the path if the player has moved
            }
            else {
                this.path = this.getUpdatedPath();
                // The player has moved into range
                if (this.inRange()) {
                    return this.targetAndAttemptAttackPlayer(player);
                    // The player is still too far away
                }
                else {
                    // Could calculate a new path, maybe something is blocking
                    if (this.path.length === 0) {
                        return [];
                    }
                    const nextPos = this.path[this.path.length - 2];
                    if (!Game_1.default.instance.currentFloor.isOccupied(nextPos)) {
                        // Make sure to adjust the length of the path after moving in case it isn't recalculated later
                        this.path.pop();
                        this.move(nextPos);
                        return [];
                    }
                    else {
                        return [];
                    }
                }
            }
        }
        else {
            // This has to return something or it breaks logging
            return [];
        }
    }
    targetAndAttemptAttackPlayer(player) {
        if (this.attemptAttack(player)) {
            const damage = this.attack(player);
            return [{
                    text: `
          The ${this.formattedName()} attacks you for 
          ${colorize(String(damage), Color_1.Colors.DAMAGE_DEFAULT)} damage.
            `
                }];
        }
        else {
            return [{
                    text: `The ${this.formattedName()} misses you.`
                }];
        }
    }
    applyVariation(variation) {
        this.variation = variation;
        this.applyModification(variation.xpmod);
        this.applyModification(variation.crmod);
        variation.modifications.forEach((attribute) => this.applyModification(attribute));
    }
    inRange() {
        return this.path && this.path.length !== 0 && this.path.length <= this.attackRange + 1;
    }
    applyModification(modification) {
        const [attribute] = Object.keys(modification);
        this[attribute] = Math.round(this[attribute] * (modification[attribute].multiply || 1)
            + (modification[attribute].add || 0));
    }
    /**
     * @override
     * @param destination
     */
    move(destination) {
        // Update the tile references to the enemy
        Game_1.default.instance.entityManager.updateEnemyPosition(this.pos, destination, this);
        // Update the open / closed tiles for pathfinding
        Game_1.default.instance.updateEasystarTiles();
        super.move(destination);
    }
    update() {
        // Render any changes (damage) to the player
        Game_1.default.instance.statusMenu.render();
        if (this.isDead()) {
            // Set the flag for this object to be removed from game.activeEnemies
            this.isActive = false;
            return [{
                    text: colorize(`The ${this.formattedName()} has perished.`, Color_1.Colors.DEATH_DEFAULT)
                }];
        }
        else {
            return [];
        }
    }
    formattedName() {
        let variant = '';
        if (this.variation) {
            variant = this.variation.name;
        }
        const { name } = this;
        return `
      ${variant ? ` ${variant} ` : ''}
      ${name}
    `;
    }
    formattedChar() {
        const { char, color } = this;
        return `&lt;${colorize(char, color)}&gt;`;
    }
    getUpdatedPath() {
        const { player, easystar } = Game_1.default.instance;
        // Unset self
        Game_1.default.instance.setTileToOpen(this.pos);
        // Calculate the path
        let path = Game_1.default.instance.getPath(player.pos, this.pos);
        // Set self
        Game_1.default.instance.setTileToClosed(this.pos);
        return (path);
    }
}
exports.Enemy = Enemy;
//# sourceMappingURL=Enemy.js.map