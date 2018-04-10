"use strict";
exports.__esModule = true;
var Quality;
(function (Quality) {
    Quality["RUINED"] = "ruined";
    Quality["POOR"] = "poor";
    Quality["FAIR"] = "fair";
    Quality["COMMON"] = "common";
    Quality["GOOD"] = "good";
    Quality["EXCEPTIONAL"] = "exceptional";
    Quality["LEGENDARY"] = "legendary";
    Quality["MYTHICAL"] = "mythical";
})(Quality || (Quality = {}));
exports.Quality = Quality;
var Prop = /** @class */ (function () {
    function Prop(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    return Prop;
}());
exports.Prop = Prop;
