"use strict";
exports.__esModule = true;
var Color_1 = require("../Canvas/Color");
var Canvas_1 = require("../Canvas/Canvas");
var Status;
(function (Status) {
    Status[Status["SUCCESS"] = 0] = "SUCCESS";
    Status[Status["FAILURE"] = 1] = "FAILURE";
})(Status || (Status = {}));
exports.Status = Status;
var invalidInput = function (keyValue) { return ({
    text: "Unrecognized input '" + keyValue + "'.",
    color: Color_1.Colors.RED
}); };
exports.invalidInput = invalidInput;
var Messenger = /** @class */ (function () {
    function Messenger(el) {
        this.htmlWrapper = 'span';
        this.el = el;
        this.messages = [];
    }
    Messenger.prototype.logMessages = function (newMessages) {
        var _this = this;
        if (newMessages.length) {
            if (newMessages.length + this.messages.length > this.maxMessages) {
                this.messages = this.messages.slice(newMessages.length).concat(newMessages);
            }
            else {
                this.messages = this.messages.concat(newMessages);
            }
            console.log(this.messages);
            var html = [this.el.innerHTML].concat(this.messages.map(function (message) { return ("\n        <" + _this.htmlWrapper + " style='color: " + message.color.val() + "'>\n        " + message.text + "\n        </" + _this.htmlWrapper + ">\n      "); }));
            console.log(html);
            console.log(html.join().trim());
            this.el.innerHTML = html.join('');
        }
    };
    Messenger.prototype.showAllCurrentMessage = function () {
        var _this = this;
        var html = [];
        if (!this.messages.length) {
            html.push("\n        <" + this.htmlWrapper + " style='color: " + Canvas_1.fontOptions.fontColor + "'>\n        No messages to display.\n        </" + this.htmlWrapper + ">\n      ");
        }
        else {
            html = this.messages.map(function (message) { return ("\n        <" + _this.htmlWrapper + " style='color: " + message.color.val() + "'>\n        " + message.text + "\n        </" + _this.htmlWrapper + ">\n      "); });
        }
        this.el.innerHTML = html.join('');
    };
    return Messenger;
}());
exports.Messenger = Messenger;
