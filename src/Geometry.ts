import Vector2 from "./Vector";

const pointInBoxCollision = (pos: Vector2, top: number, bottom: number, left: number, right: number): boolean => {
  return (
    pos.y <= top &&
    pos.y >= bottom &&
    pos.x <= right &&
    pos.x >= left
  );
}

export { pointInBoxCollision };