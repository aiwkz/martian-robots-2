import type { RobotInput, Direction } from '../types';
import { MAX_COORDINATE_VALUE, DIRECTIONS, INSTRUCTIONS } from '../constants';

export const parseRobot = (
  positionLine: string,
  instructionLine: string
): RobotInput | null => {
  const initialPosition = positionLine.split(/\s+/);
  if (initialPosition.length !== 3) return null;

  const x = Number(initialPosition[0]);
  const y = Number(initialPosition[1]);
  const direction = initialPosition[2] as Direction;

  if (
    Number.isNaN(x) ||
    Number.isNaN(y) ||
    x < 0 ||
    y < 0 ||
    x > MAX_COORDINATE_VALUE ||
    y > MAX_COORDINATE_VALUE
  ) {
    return null;
  }

  if (!DIRECTIONS.includes(direction)) {
    return null;
  }

  const instructions = instructionLine.trim().split('');
  if (instructions.length === 0) return null;

  for (const instruction of instructions) {
    if (!INSTRUCTIONS.includes(instruction)) {
      return null;
    }
  }

  return {
    x,
    y,
    direction,
    instructions: instructions as RobotInput['instructions'],
  };
};
