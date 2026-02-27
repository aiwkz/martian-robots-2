import type { RobotInput, RobotState, Grid } from '../types';
import { LEFT_TURN, RIGHT_TURN, MOVE_FORWARD } from './helpers';

export const runInstructions = (
  robot: RobotInput,
  grid: Grid,
  scented: Set<string>
): RobotState => {
  const state: RobotState = {
    x: robot.x,
    y: robot.y,
    direction: robot.direction,
    lost: false,
  };

  for (const instruction of robot.instructions) {
    if (state.lost) break;

    if (instruction === 'L') {
      state.direction = LEFT_TURN[state.direction];
      continue;
    }

    if (instruction === 'R') {
      state.direction = RIGHT_TURN[state.direction];
      continue;
    }

    const { dx, dy } = MOVE_FORWARD[state.direction];
    const nextX = state.x + dx;
    const nextY = state.y + dy;

    const scentKey = `${state.x},${state.y}`;

    if (nextX < 0 || nextY < 0 || nextX > grid.maxX || nextY > grid.maxY) {
      if (scented.has(scentKey)) {
        continue;
      }

      scented.add(scentKey);
      state.lost = true;
      break;
    }

    state.x = nextX;
    state.y = nextY;
  }

  return state;
};
