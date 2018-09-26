"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prop_data_1 = require("./Prop.data");
const ossuary_1 = require("ossuary");
class DetailGenerator {
    getNumberOfDetails(quality) {
        switch (quality) {
            case Prop_data_1.Quality.RUINED:
            case Prop_data_1.Quality.POOR:
                return ossuary_1.Random.randomInt(1, 3);
            case Prop_data_1.Quality.FAIR:
            case Prop_data_1.Quality.COMMON:
                return ossuary_1.Random.randomInt(1, 4);
            case Prop_data_1.Quality.GOOD:
            case Prop_data_1.Quality.EXCEPTIONAL:
                return ossuary_1.Random.randomInt(2, 5);
            case Prop_data_1.Quality.LEGENDARY:
                return ossuary_1.Random.randomInt(5, 7);
            case Prop_data_1.Quality.MYTHICAL:
                return ossuary_1.Random.randomInt(6, 10);
        }
    }
}
exports.DetailGenerator = DetailGenerator;
//# sourceMappingURL=DetailGenerator.js.map