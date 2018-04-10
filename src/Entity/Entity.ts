import Vector2 from '../Vector';
import Color from '../Canvas/Color';

interface Entity {
  pos: Vector2,
  isActive: boolean,
  color: Color,
  char: string
}

export default Entity;