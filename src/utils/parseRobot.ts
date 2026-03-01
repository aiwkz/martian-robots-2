import type { RobotInput, Direction, Instruction } from '../types';
import { Position } from '../domain/Position';
import {
  DIRECTIONS,
  INSTRUCTIONS,
  INSTRUCTIONS_MAX_LENGHT,
} from '../constants';

const parseDirection = (direction: string): Direction | null =>
  DIRECTIONS.includes(direction as Direction) ? (direction as Direction) : null;

const parseInstructions = (instructions: string): Instruction[] | null => {
  const chars = instructions.trim().split('');

  if (chars.length === 0 || chars.length > INSTRUCTIONS_MAX_LENGHT) {
    return null;
  }

  if (!chars.every(char => INSTRUCTIONS.includes(char))) {
    return null;
  }

  return chars as Instruction[];
};

export const parseRobot = (
  positionLine: string,
  instructionLine: string
): RobotInput => {
  const parts = positionLine.trim().split(/\s+/);
  if (parts.length !== 3) {
    throw new Error(`Invalid robot position line: "${positionLine}"`);
  }

  const position = Position.tryCreate(Number(parts[0]), Number(parts[1]));
  if (!position) {
    throw new Error(`Invalid robot coordinates: "${parts[0]} ${parts[1]}"`);
  }

  const direction = parseDirection(parts[2]);
  if (!direction) {
    throw new Error(`Invalid direction: "${parts[2]}"`);
  }

  const instructions = parseInstructions(instructionLine);
  if (!instructions) {
    throw new Error(`Invalid instructions: "${instructionLine}"`);
  }

  return { position, direction, instructions };
};
