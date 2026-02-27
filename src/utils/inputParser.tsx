import type { Grid, ParsedInput, RobotInput } from '../types';
import { MAX_COORDINATE_VALUE } from '../constants';
import { parseRobot } from './parseRobot';

export const inputParser = (input: string): ParsedInput => {
  if (!input) {
    throw new Error('No valid input');
  }

  const lines = input.trim().split('\n').filter(Boolean);

  const gridLimits = lines[0].split(/\s+/);
  if (gridLimits.length !== 2) {
    throw new Error('Grid values should be only two values, X and Y');
  }

  const maxX = parseInt(gridLimits[0], 10);
  const maxY = parseInt(gridLimits[1], 10);

  if (Number.isNaN(maxX) || Number.isNaN(maxY) || maxX < 0 || maxY < 0) {
    throw new Error("Grid values can't be not a number or negative");
  }

  if (maxX > MAX_COORDINATE_VALUE || maxY > MAX_COORDINATE_VALUE) {
    throw new Error('Grid values exceed limit of 50');
  }

  const grid: Grid = { maxX, maxY };

  const robots: RobotInput[] = [];

  for (let i = 1; i < lines.length; i += 2) {
    const positionLine = lines[i];
    const instructionLine = lines[i + 1];

    if (!instructionLine) continue;

    const robot = parseRobot(positionLine, instructionLine);
    if (!robot) continue;

    robots.push(robot);
  }

  return {
    grid,
    robots,
  };
};
