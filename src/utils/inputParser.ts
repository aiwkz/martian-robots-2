import type { ParsedInput, RobotInput } from '../types';
import { Grid } from '../domain/Grid';
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

  const maxX = Number(gridLimits[0]);
  const maxY = Number(gridLimits[1]);

  const grid = Grid.create(maxX, maxY);

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
