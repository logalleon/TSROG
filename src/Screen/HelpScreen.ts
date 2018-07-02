import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { Message } from '../Message/Message';

class HelpScreen extends Screen {

  public name: ScreenNames = ScreenNames.HELP;
  public game: Game;
  public inputs: InputMap;

  constructor() {
    super();
  }

  render() {
    const { messenger } = this.game;
    this.renderHelp();
    messenger.renderReturnToMap();
  }

  renderHelp () {
    const { player } = this.game;
    this.game.messenger.clearMessages();
    const title = { text: 'Help' };
    const help = { text: '@TODO'};
    this.game.messenger.logMessages([title, help]);
  }

}
export default HelpScreen;