class Vector2 {
  public x: number;
  public y: number;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add (other: Vector2) {
    this.x += other.x;
    this.y += other.y;
  }

  public static apply (v1: Vector2, v2: Vector2): Vector2 {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }
}

export default Vector2;