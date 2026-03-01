import type { InstructionHandler, Instruction } from '../types';
import { Position } from '../domain/Position';
import { LEFT_TURN, RIGHT_TURN, MOVE_FORWARD } from './helpers';

const turnLeft: InstructionHandler = state => ({
  ...state,
  direction: LEFT_TURN[state.direction],
});

const turnRight: InstructionHandler = state => ({
  ...state,
  direction: RIGHT_TURN[state.direction],
});

const moveForward: InstructionHandler = (state, grid, scented) => {
  const { dx, dy } = MOVE_FORWARD[state.direction];
  const nextX = state.position.x + dx;
  const nextY = state.position.y + dy;

  if (!grid.isWithinBounds(nextX, nextY)) {
    const scentKey = state.position.toKey();

    if (scented.has(scentKey)) {
      return state;
    }

    scented.add(scentKey);
    return { ...state, lost: true };
  }

  return { ...state, position: Position.create(nextX, nextY) };
};

export const INSTRUCTION_STRATEGIES: Record<Instruction, InstructionHandler> = {
  L: turnLeft,
  R: turnRight,
  F: moveForward,
};
