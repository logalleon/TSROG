import { Screen, ScreenNames } from '../Screen';
import Game from '../../Game';
import { InputMap } from '../../Input';
import { Message, Panel } from '../../Message/Messenger';

class HelpScreen extends Screen {

  public name: ScreenNames = ScreenNames.HELP;
  public inputs: InputMap;

  constructor() {
    super({});
  }

  render() {
    const { messenger } = Game.instance;
    this.renderHelp();
    messenger.renderReturnToMap();
  }

  renderHelp () {
    const { player } = Game.instance;
    Game.instance.messenger.clearPanel(Panel.PANEL_1);
    const title = { text: 'Help' };
    const help = { text: '@TODO'};
    Game.instance.messenger.writeToPanel(Panel.PANEL_1, [title, help]);
  }

}
export default HelpScreen;