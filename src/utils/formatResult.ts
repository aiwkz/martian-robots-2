import type { RobotState, FormattedResult } from '../types';

export const formatResult = (state: RobotState): FormattedResult => {
  return {
    text: `${state.position.x} ${state.position.y} ${state.direction}`,
    lost: state.lost,
  };
};
