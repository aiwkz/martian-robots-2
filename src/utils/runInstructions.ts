import type { RobotInput, RobotState } from '../types';
import type { Grid } from '../domain/Grid';
import { INSTRUCTION_STRATEGIES } from '../domain/instructionStrategies';

export const runInstructions = (
  robot: RobotInput,
  grid: Grid,
  scented: Set<string>
): RobotState => {
  let state: RobotState = {
    position: robot.position,
    direction: robot.direction,
    lost: false,
  };

  for (const instruction of robot.instructions) {
    if (state.lost) {
      break;
    }

    state = INSTRUCTION_STRATEGIES[instruction](state, grid, scented);
  }

  return state;
};
