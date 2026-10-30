export const MIN_NUMBER = 0;
export const MAX_NUMBER = 100;

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
