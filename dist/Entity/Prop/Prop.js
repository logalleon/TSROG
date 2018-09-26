"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractProp {
    constructor(options) {
        for (let key in options) {
            this[key] = options[key];
        }
    }
}
exports.AbstractProp = AbstractProp;
class AbstractBlockingProp extends AbstractProp {
    constructor(options) {
        super(options);
        this.blocksMovement = true;
    }
}
exports.AbstractBlockingProp = AbstractBlockingProp;
class AbstractPickupProp extends AbstractProp {
    constructor(options) {
        super(options);
        this.canBePickedUp = true;
    }
}
exports.AbstractPickupProp = AbstractPickupProp;
class AbstractMaterialProp extends AbstractProp {
    constructor(options) {
        super(options);
    }
}
exports.AbstractMaterialProp = AbstractMaterialProp;
class AbstractDamagingProp extends AbstractProp {
    constructor(options) {
        super(options);
    }
}
exports.AbstractDamagingProp = AbstractDamagingProp;
class AbstractDamagingPickupProp extends AbstractPickupProp {
    constructor(options) {
        super(options);
    }
}
exports.AbstractDamagingPickupProp = AbstractDamagingPickupProp;
class AbstractMaterialPickupProp extends AbstractPickupProp {
    constructor(options) {
        super(options);
    }
}
exports.AbstractMaterialPickupProp = AbstractMaterialPickupProp;
class AbstractDamagingPickupMaterialProp extends AbstractDamagingPickupProp {
    constructor(options) {
        super(options);
    }
}
exports.AbstractDamagingPickupMaterialProp = AbstractDamagingPickupMaterialProp;
//# sourceMappingURL=Prop.js.map