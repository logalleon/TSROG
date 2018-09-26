"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ossuary_1 = require("ossuary");
const bluebird_1 = require("bluebird");
var AttackRange;
(function (AttackRange) {
    AttackRange[AttackRange["MELEE"] = 1] = "MELEE";
})(AttackRange || (AttackRange = {}));
exports.AttackRange = AttackRange;
class Actor {
    constructor(options) {
        this.isActive = false;
        this.cth = 0;
        this.canMove = true;
        this.canAttack = true;
        for (let key in options) {
            this[key] = options[key];
        }
    }
    act() {
        return null;
    }
    // @TODO maybe revisit later
    actAsync() {
        return new bluebird_1.Promise((resolve) => resolve(null));
    }
    move(destination) {
        this.pos = destination;
    }
    attemptAttack(target) {
        const dice = `${ossuary_1.Dice.StandardDice.d20}+${this.cth}`;
        return (ossuary_1.Dice.rollDice(dice) >= target.ac);
    }
    attack(target) {
        console.log(this.damage);
        const damage = ossuary_1.Dice.rollDice(this.damage);
        target.hp -= damage;
        return damage;
    }
    isDead() {
        return this.hp <= 0;
    }
}
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map