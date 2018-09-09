"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pointInBoxCollision = (pos, top, bottom, left, right) => {
    return (pos.y <= top &&
        pos.y >= bottom &&
        pos.x <= right &&
        pos.x >= left);
};
exports.pointInBoxCollision = pointInBoxCollision;
const distance = (pos, pos2) => {
    return Math.sqrt(Math.pow((pos.x - pos2.x), 2) + Math.pow((pos.y - pos2.y), 2));
};
exports.distance = distance;
const modulo = (n, m) => ((n % m) + m) % m;
exports.modulo = modulo;
//# sourceMappingURL=Geometry.js.map