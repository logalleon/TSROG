import { InputMap } from "../Input";
import { Panel } from "../Message/Messenger";

enum ConfirmKeyBindings {
  YES = 'y',
  NO = 'n'
}

enum EscapeKeyBinding {
  ESC = 'Esc'
}

const applyEscapeHandlerBinding = (context: any, inputs: InputMap, currentPanel: Panel, previousPanel: Panel = Panel.PANEL_1): InputMap => {
  return (<any>Object).assign({}, inputs, {
    [EscapeKeyBinding.ESC]: () => {
      context.game.messenger.clearPanel(currentPanel);
      context.game.messenger.setPanelAsActive(previousPanel);
      context.inputs = context.storedInputMaps.pop();
    }
  });
}

const applyYesNoBinding = (context: any, inputs: InputMap, yesHandler: any, noHandler: any): InputMap => {
  return (<any>Object).assign({}, inputs, {
    [ConfirmKeyBindings.YES]: yesHandler.bind(context),
    [ConfirmKeyBindings.NO]: noHandler.bind(context)
  });
};



export { ConfirmKeyBindings, EscapeKeyBinding, applyEscapeHandlerBinding, applyYesNoBinding }