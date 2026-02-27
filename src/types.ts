export type Direction = 'N' | 'E' | 'S' | 'W';
export type Instruction = 'L' | 'R' | 'F';

export interface Grid {
  maxX: number;
  maxY: number;
}

export interface RobotInput {
  x: number;
  y: number;
  direction: Direction;
  instructions: Instruction[];
}

export interface ParsedInput {
  grid: Grid;
  robots: RobotInput[];
}

export interface RobotState {
  x: number;
  y: number;
  direction: Direction;
  lost: boolean;
}

export type FormattedResult = {
  text: string;
  lost: boolean;
};
