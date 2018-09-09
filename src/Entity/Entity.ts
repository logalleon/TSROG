import Vector2 from '../Vector';
import { Color } from '../Canvas/Color';

interface Entity {
  pos: Vector2,
  isActive: boolean,
  color: Color,
  char: string
}

interface Description {
  description: string,
  descriptionLong: string
}

export default Entity;

export { Description }