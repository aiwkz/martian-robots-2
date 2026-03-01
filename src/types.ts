import type { Grid } from './domain/Grid';
import type { Position } from './domain/Position';

export type Direction = 'N' | 'E' | 'S' | 'W';
export type Instruction = 'L' | 'R' | 'F';

export interface RobotInput {
  position: Position;
  direction: Direction;
  instructions: Instruction[];
}

export interface ParsedInput {
  grid: Grid;
  robots: RobotInput[];
}

export interface RobotState {
  position: Position;
  direction: Direction;
  lost: boolean;
}

export type FormattedResult = {
  text: string;
  lost: boolean;
};
