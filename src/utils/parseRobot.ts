import type { RobotInput, Direction } from '../types';
import { Position } from '../domain/Position';
import { DIRECTIONS, INSTRUCTIONS } from '../constants';

export const parseRobot = (
  positionLine: string,
  instructionLine: string
): RobotInput | null => {
  const parts = positionLine.split(/\s+/);
  if (parts.length !== 3) return null;

  const x = Number(parts[0]);
  const y = Number(parts[1]);
  const direction = parts[2] as Direction;

  const position = Position.tryCreate(x, y);
  if (!position) return null;

  if (!DIRECTIONS.includes(direction)) return null;

  const instructions = instructionLine.trim().split('');
  if (instructions.length === 0) return null;

  for (const instruction of instructions) {
    if (!INSTRUCTIONS.includes(instruction)) return null;
  }

  return {
    position,
    direction,
    instructions: instructions as RobotInput['instructions'],
  };
};
