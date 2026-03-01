import type { RobotInput, RobotState } from '../types';
import type { Grid } from '../domain/Grid';
import { Position } from '../domain/Position';
import { LEFT_TURN, RIGHT_TURN, MOVE_FORWARD } from './helpers';

export const runInstructions = (
  robot: RobotInput,
  grid: Grid,
  scented: Set<string>
): RobotState => {
  const state: RobotState = {
    position: robot.position,
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
    const nextX = state.position.x + dx;
    const nextY = state.position.y + dy;

    if (!grid.isWithinBounds(nextX, nextY)) {
      const scentKey = state.position.toKey();

      if (scented.has(scentKey)) {
        continue;
      }

      scented.add(scentKey);
      state.lost = true;
      break;
    }

    state.position = Position.create(nextX, nextY);
  }

  return state;
};
