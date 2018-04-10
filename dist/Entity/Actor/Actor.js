"use strict";
exports.__esModule = true;
var Dice_1 = require("../../Random/Dice");
var Actor = /** @class */ (function () {
    function Actor(options) {
        this.canMove = true;
        this.canAttack = true;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Actor.prototype.move = function (destination) {
        if (this.canMove) {
            this.pos = destination;
        }
    };
    Actor.prototype.attemptAttack = function (target) {
        var dice = Dice_1.StandardDice.d20 + "+" + this.cth;
        return (Dice_1.rollDice(dice) >= target.ac);
    };
    Actor.prototype.attack = function (target) {
        var damage = Dice_1.rollDice(this.damage);
        target.hp -= damage;
        return damage;
    };
    Actor.prototype.isDead = function () {
        return this.hp <= 0;
    };
    return Actor;
}());
exports.Actor = Actor;
