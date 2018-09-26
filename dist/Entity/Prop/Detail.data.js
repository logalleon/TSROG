"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prop_data_1 = require("./Prop.data");
const ossuary_1 = require("ossuary");
var Descriptors;
(function (Descriptors) {
    Descriptors["RUINED"] = "{ruined|damaged|destroyed}";
    Descriptors["TIME_AGO"] = "{appears to have long ago|has since|has long ago}";
    Descriptors["NOT_EVER"] = "{no longer|not|will never again be}";
    Descriptors["GLORIOUS"] = "{glorious|wondrous|beautiful|enchanting|captivating}";
    Descriptors["SEVERELY"] = "{severly|badly|intensely|extremely|highly}";
    Descriptors["RUSTED"] = "{is coated in coarse rust|is almost rusted through|is tinged with rust|is rusted}";
})(Descriptors || (Descriptors = {}));
const parseMaterial = (materials, game) => {
    const material = ossuary_1.Random.pluck(materials);
    let m = {};
    // It's only a material type, choose the subtype
    if (!material.subtype) {
        m.type = material;
        m.subtype = (game.legendary.parse(`[materials.${material}]`));
        return m;
    }
    else {
        return material;
    }
};
// Details
const Inlaid = (materials) => {
    return (quality, game) => {
        let material; // @TODO factor this out - this is tedious
        if (materials) {
            material = parseMaterial(materials, game);
        }
        let str = '';
        switch (quality) {
            case Prop_data_1.Quality.RUINED:
            case Prop_data_1.Quality.POOR:
                str += `was inlaid with some kind of ${material.type}, `;
                str += `but ${Descriptors.TIME_AGO} been ${Descriptors.RUINED}.`;
                return str;
            case Prop_data_1.Quality.FAIR:
            case Prop_data_1.Quality.COMMON:
            case Prop_data_1.Quality.GOOD:
            case Prop_data_1.Quality.EXCEPTIONAL:
            case Prop_data_1.Quality.LEGENDARY:
            case Prop_data_1.Quality.MYTHICAL:
                return '1';
        }
    };
};
exports.Inlaid = Inlaid;
const Embroidered = (materials) => {
    return (quality, game) => {
        let material;
        if (materials) {
            material = parseMaterial(materials, game);
        }
        let str = '';
        switch (quality) {
            case Prop_data_1.Quality.RUINED:
            case Prop_data_1.Quality.POOR:
                str += `was embroided with some kind of ${material.type}, `;
                str += `but the threads are ${Descriptors.NOT_EVER} ${Descriptors.GLORIOUS} and are now ${Descriptors.RUINED}.`;
                return str;
            case Prop_data_1.Quality.FAIR:
            case Prop_data_1.Quality.COMMON:
            case Prop_data_1.Quality.GOOD:
            case Prop_data_1.Quality.EXCEPTIONAL:
            case Prop_data_1.Quality.LEGENDARY:
            case Prop_data_1.Quality.MYTHICAL:
                return '125125';
        }
    };
};
exports.Embroidered = Embroidered;
const Scratched = (materials) => {
    return (quality, game) => {
        let material;
        if (materials) {
            material = parseMaterial(materials, game);
        }
        let str = '';
        switch (quality) {
            case Prop_data_1.Quality.RUINED:
            case Prop_data_1.Quality.POOR:
                str += `is ${Descriptors.SEVERELY} ${Descriptors.RUINED}.`;
                return str;
            case Prop_data_1.Quality.FAIR:
            case Prop_data_1.Quality.COMMON:
            case Prop_data_1.Quality.GOOD:
            case Prop_data_1.Quality.EXCEPTIONAL:
            case Prop_data_1.Quality.LEGENDARY:
            case Prop_data_1.Quality.MYTHICAL:
                return '1252';
        }
    };
};
exports.Scratched = Scratched;
const Rusted = (materials) => {
    return (quality, game) => {
        let material;
        if (materials) {
            material = parseMaterial(materials, game);
        }
        let str = '';
        switch (quality) {
            case Prop_data_1.Quality.RUINED:
            case Prop_data_1.Quality.POOR:
                str += `is ${Descriptors.RUSTED}.`;
                return str;
            case Prop_data_1.Quality.FAIR:
            case Prop_data_1.Quality.COMMON:
            case Prop_data_1.Quality.GOOD:
            case Prop_data_1.Quality.EXCEPTIONAL:
            case Prop_data_1.Quality.LEGENDARY:
            case Prop_data_1.Quality.MYTHICAL:
                return '1252';
        }
    };
};
//# sourceMappingURL=Detail.data.js.map