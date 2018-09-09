"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Messenger_1 = require("../Message/Messenger");
var ConfirmKeyBindings;
(function (ConfirmKeyBindings) {
    ConfirmKeyBindings["YES"] = "y";
    ConfirmKeyBindings["NO"] = "n";
})(ConfirmKeyBindings || (ConfirmKeyBindings = {}));
exports.ConfirmKeyBindings = ConfirmKeyBindings;
var EscapeKeyBinding;
(function (EscapeKeyBinding) {
    EscapeKeyBinding["ESC"] = "Esc";
})(EscapeKeyBinding || (EscapeKeyBinding = {}));
exports.EscapeKeyBinding = EscapeKeyBinding;
const applyEscapeHandlerBinding = (context, inputs, currentPanel, previousPanel = Messenger_1.Panel.PANEL_1) => {
    return Object.assign({}, inputs, {
        [EscapeKeyBinding.ESC]: () => {
            context.game.messenger.clearPanel(currentPanel);
            context.game.messenger.setPanelAsActive(previousPanel);
            context.inputs = context.storedInputMaps.pop();
        }
    });
};
exports.applyEscapeHandlerBinding = applyEscapeHandlerBinding;
const applyYesNoBinding = (context, inputs, yesHandler, noHandler) => {
    return Object.assign({}, inputs, {
        [ConfirmKeyBindings.YES]: yesHandler.bind(context),
        [ConfirmKeyBindings.NO]: noHandler.bind(context)
    });
};
exports.applyYesNoBinding = applyYesNoBinding;
//# sourceMappingURL=CommonHandlers.js.map