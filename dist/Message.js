"use strict";
exports.__esModule = true;
var Status;
(function (Status) {
    Status[Status["SUCCESS"] = 0] = "SUCCESS";
    Status[Status["FAILURE"] = 1] = "FAILURE";
})(Status || (Status = {}));
exports.Status = Status;
var invalidInput = function (keyValue) {
    return "Unrecognized input '" + keyValue + "'.";
};
exports.invalidInput = invalidInput;
