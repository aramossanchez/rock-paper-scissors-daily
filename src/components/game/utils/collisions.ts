import type { Item } from "../../../types/types";

export const collisionDetectionBetweenSameElements = (
  array: Item[],
  iconRadius: number,
  speed: number,
) => {
  for (let i = 0; i < array.length; i++) {
    const firstItem = array[i];
    for (let j = i + 1; j < array.length; j++) {
      const otherItem = array[j];
      const distanceX = firstItem.x - otherItem.x;
      const distanceY = firstItem.y - otherItem.y;
      if (
        distanceX >= -iconRadius * 2 &&
        distanceX <= iconRadius * 2 &&
        distanceY >= -iconRadius * 2 &&
        distanceY <= iconRadius * 2
      ) {
        const tempX = firstItem.movementX;
        const tempY = firstItem.movementY;
        firstItem.movementX = otherItem.movementX;
        firstItem.movementY = otherItem.movementY;
        otherItem.movementX = tempX;
        otherItem.movementY = tempY;
        if (firstItem.x > otherItem.x) {
          firstItem.x = firstItem.x + speed;
          otherItem.x = otherItem.x - speed;
        }
        if (firstItem.x < otherItem.x) {
          firstItem.x = firstItem.x - speed;
          otherItem.x = otherItem.x + speed;
        }
        if (firstItem.y > otherItem.y) {
          firstItem.y = firstItem.y + speed;
          otherItem.y = otherItem.y - speed;
        }
        if (firstItem.y < otherItem.y) {
          firstItem.y = firstItem.y - speed;
          otherItem.y = otherItem.y + speed;
        }
      }
    }
  }
};

export const collisionDetectionBetweenWinnerAndLoser = (
  winnerArray: Item[],
  loserArray: Item[],
  iconRadius: number,
  replace?: boolean,
  eliminate?: boolean,
  winnerSetter: (value: React.SetStateAction<number>) => void = () => {},
  loserSetter: (value: React.SetStateAction<number>) => void = () => {},
) => {
  for (let i = 0; i < winnerArray.length; i++) {
    const winnerItem = winnerArray[i];
    for (let j = 0; j < loserArray.length; j++) {
      const loserItem = loserArray[j];
      const distanceX = winnerItem.x - loserItem.x;
      const distanceY = winnerItem.y - loserItem.y;
      if (
        distanceX >= -iconRadius * 2 &&
        distanceX <= iconRadius * 2 &&
        distanceY >= -iconRadius * 2 &&
        distanceY <= iconRadius * 2
      ) {
        if (replace) {
          winnerArray.push({
            x: loserItem.x,
            y: loserItem.y,
            movementX: -winnerItem.movementX * 1.1,
            movementY: -winnerItem.movementY * 1.1,
          });
          loserArray.splice(j, 1);
          winnerSetter((prev) => prev + 1);
          loserSetter((prev) => prev - 1);
        } else if (eliminate) {
          loserArray.splice(j, 1);
          loserSetter((prev) => prev - 1);
          winnerArray[i].movementX = -winnerItem.movementX * 1.1;
          winnerArray[i].movementY = -winnerItem.movementY * 1.1;
        }
        j--;
      }
    }
  }
};

export const collisionDetectionWithWalls = (
  array: Item[],
  iconRadius: number,
  canvas: HTMLCanvasElement,
) => {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (
      item.x + item.movementX + iconRadius >= canvas.width ||
      item.x + item.movementX - iconRadius <= 0
    ) {
      if (item.x + item.movementX + iconRadius >= canvas.width) {
        item.x = item.x - iconRadius / 2;
      }
      if (item.x + item.movementX - iconRadius <= 0) {
        item.x = item.x + iconRadius / 2;
      }
      item.movementX = -item.movementX;
    }
    if (
      item.y + item.movementY + iconRadius >= canvas?.height ||
      item.y + item.movementY - iconRadius <= 0
    ) {
      if (item.y + item.movementY + iconRadius >= canvas?.height) {
        item.y = item.y - iconRadius / 2;
      }
      if (item.y + item.movementY - iconRadius <= 0) {
        item.y = item.y + iconRadius / 2;
      }
      item.movementY = -item.movementY;
    }
    item.x += item.movementX;
    item.y += item.movementY;
  }
};
