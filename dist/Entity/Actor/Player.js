"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Actor_1 = require("./Actor");
var InventoryItems;
(function (InventoryItems) {
    InventoryItems["AMULETS"] = "amulets";
    InventoryItems["ARMOR"] = "armor";
    InventoryItems["FOOD"] = "food";
    InventoryItems["POTIONS"] = "potions";
    InventoryItems["RINGS"] = "rings";
    InventoryItems["SCROLLS"] = "scrolls";
    InventoryItems["WEAPONS"] = "weapons";
})(InventoryItems || (InventoryItems = {}));
exports.InventoryItems = InventoryItems;
var EquipmentSlots;
(function (EquipmentSlots) {
    EquipmentSlots["NECK"] = "neck";
    EquipmentSlots["ARMOR"] = "armor";
    EquipmentSlots["LEFT_HAND"] = "left hand";
    EquipmentSlots["RIGHT_HAND"] = "right hand";
    EquipmentSlots["WEAPON"] = "weapon";
})(EquipmentSlots || (EquipmentSlots = {}));
exports.EquipmentSlots = EquipmentSlots;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(options) {
        var _this = _super.call(this, options.actorOptions) || this;
        _this.equipped = (_a = {},
            _a[EquipmentSlots.NECK] = null,
            _a[EquipmentSlots.ARMOR] = null,
            _a[EquipmentSlots.LEFT_HAND] = null,
            _a[EquipmentSlots.RIGHT_HAND] = null,
            _a[EquipmentSlots.WEAPON] = null,
            _a);
        for (var key in InventoryItems) {
            _this[InventoryItems[key]] = [];
        }
        for (var key in options) {
            if (key !== 'actorOptions') {
                _this[key] = options[key];
            }
        }
        return _this;
        var _a;
    }
    Player.prototype.addToInventory = function (pickup) {
        this[pickup.type] = [].concat(this[pickup.type], pickup.item);
    };
    Player.prototype.attemptToEquip = function (accessor, slot) {
        // There's already something in that equipment slot
        if (this.equipped[slot]) {
            return false;
            // Equip the item
        }
        else {
            this.equipped[slot] = this[accessor.type][accessor.index];
            return true;
        }
    };
    return Player;
}(Actor_1.Actor));
InventoryItems.AMULETS, InventoryItems.ARMOR, InventoryItems.FOOD, InventoryItems.POTIONS, InventoryItems.RINGS, InventoryItems.SCROLLS, InventoryItems.WEAPONS;
exports.Player = Player;
