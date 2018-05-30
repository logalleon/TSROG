import Game from './Game';

const TITLE_TIME = 5000;

class Effects {

  public el: HTMLDivElement;

  constructor (el: HTMLDivElement) {
    this.el = el;
  }

  transitionToNextFloor (): void {
    const { currentFloor, player } = Game.instance;
    player.canMove = false;
    const floorName = currentFloor.getFormattedName();
    this.el.style.display = 'inherit'; // this is only really needed once
    this.el.innerHTML = '';
    this.el.classList.remove('fade');
    const stepTime = floorName.length / TITLE_TIME;
    const p = document.createElement('p');
    this.el.appendChild(p);
    for (let i = 0; i < floorName.length; i++) {
      const span = document.createElement('span');
      span.innerText = floorName[i];
      span.style.animationDelay = `${stepTime * i * 8}s`;
      p.appendChild(span);
    }
    setTimeout(() => {
      this.el.classList.add('fade');
      setTimeout(() => {
        player.canMove = true;
      }, 600); // fade animation time
    }, TITLE_TIME)
  }

}
export { Effects };