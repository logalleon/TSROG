import Vector2 from "./Vector";

const pointInBoxCollision = (pos: Vector2, top: number, bottom: number, left: number, right: number): boolean => {
  return (
    pos.y <= top &&
    pos.y >= bottom &&
    pos.x <= right &&
    pos.x >= left
  );
}

const distance = (pos: Vector2, pos2: Vector2): number => {
  return Math.sqrt(Math.pow((pos.x - pos2.x), 2) + Math.pow((pos.y - pos2.y), 2));
};

const modulo = (n: number, m: number): number => ((n % m) + m) % m;

export { pointInBoxCollision, distance, modulo };