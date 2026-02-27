import type { RobotState, FormattedResult } from '../types';

export const formatResult = (state: RobotState): FormattedResult => {
  return {
    text: `${state.x} ${state.y} ${state.direction}`,
    lost: state.lost,
  };
};
