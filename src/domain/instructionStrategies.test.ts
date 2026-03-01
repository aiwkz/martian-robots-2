import { describe, it, expect } from 'vitest';
import { INSTRUCTION_STRATEGIES } from './instructionStrategies';
import { Position } from './Position';
import { Grid } from './Grid';
import type { RobotState } from '../types';

const makeState = (
  x: number,
  y: number,
  direction: RobotState['direction'],
  lost = false
): RobotState => ({
  position: Position.create(x, y),
  direction,
  lost,
});

describe('L (turnLeft)', () => {
  const grid = Grid.create(5, 5);
  const scented = new Set<string>();

  it('N → W, position and lost unchanged', () => {
    const result = INSTRUCTION_STRATEGIES.L(
      makeState(1, 1, 'N'),
      grid,
      scented
    );
    expect(result.direction).toBe('W');
    expect(result.position.x).toBe(1);
    expect(result.position.y).toBe(1);
    expect(result.lost).toBe(false);
  });

  it('W → S', () => {
    expect(
      INSTRUCTION_STRATEGIES.L(makeState(1, 1, 'W'), grid, scented).direction
    ).toBe('S');
  });

  it('S → E', () => {
    expect(
      INSTRUCTION_STRATEGIES.L(makeState(1, 1, 'S'), grid, scented).direction
    ).toBe('E');
  });

  it('E → N', () => {
    expect(
      INSTRUCTION_STRATEGIES.L(makeState(1, 1, 'E'), grid, scented).direction
    ).toBe('N');
  });
});

describe('R (turnRight)', () => {
  const grid = Grid.create(5, 5);
  const scented = new Set<string>();

  it('N → E, position and lost unchanged', () => {
    const result = INSTRUCTION_STRATEGIES.R(
      makeState(1, 1, 'N'),
      grid,
      scented
    );
    expect(result.direction).toBe('E');
    expect(result.position.x).toBe(1);
    expect(result.position.y).toBe(1);
    expect(result.lost).toBe(false);
  });

  it('E → S', () => {
    expect(
      INSTRUCTION_STRATEGIES.R(makeState(1, 1, 'E'), grid, scented).direction
    ).toBe('S');
  });

  it('S → W', () => {
    expect(
      INSTRUCTION_STRATEGIES.R(makeState(1, 1, 'S'), grid, scented).direction
    ).toBe('W');
  });

  it('W → N', () => {
    expect(
      INSTRUCTION_STRATEGIES.R(makeState(1, 1, 'W'), grid, scented).direction
    ).toBe('N');
  });
});

describe('F (moveForward)', () => {
  const grid = Grid.create(5, 5);
  const scented = new Set<string>();

  it('moves North (y + 1)', () => {
    const result = INSTRUCTION_STRATEGIES.F(
      makeState(1, 1, 'N'),
      grid,
      scented
    );
    expect(result.position.x).toBe(1);
    expect(result.position.y).toBe(2);
    expect(result.lost).toBe(false);
  });

  it('moves East (x + 1)', () => {
    const result = INSTRUCTION_STRATEGIES.F(
      makeState(1, 1, 'E'),
      grid,
      scented
    );
    expect(result.position.x).toBe(2);
    expect(result.position.y).toBe(1);
    expect(result.lost).toBe(false);
  });

  it('moves South (y - 1)', () => {
    const result = INSTRUCTION_STRATEGIES.F(
      makeState(1, 1, 'S'),
      grid,
      scented
    );
    expect(result.position.x).toBe(1);
    expect(result.position.y).toBe(0);
    expect(result.lost).toBe(false);
  });

  it('moves West (x - 1)', () => {
    const result = INSTRUCTION_STRATEGIES.F(
      makeState(1, 1, 'W'),
      grid,
      scented
    );
    expect(result.position.x).toBe(0);
    expect(result.position.y).toBe(1);
    expect(result.lost).toBe(false);
  });

  it('becomes lost when crossing boundary and adds scent key', () => {
    const scented = new Set<string>();
    const result = INSTRUCTION_STRATEGIES.F(
      makeState(5, 5, 'N'),
      grid,
      scented
    );
    expect(result.lost).toBe(true);
    expect(scented.has('5,5')).toBe(true);
  });

  it('ignores command when position is scented, stays safe', () => {
    const scented = new Set<string>(['5,5']);
    const result = INSTRUCTION_STRATEGIES.F(
      makeState(5, 5, 'N'),
      grid,
      scented
    );
    expect(result.lost).toBe(false);
    expect(result.position.x).toBe(5);
    expect(result.position.y).toBe(5);
  });

  it('direction is unchanged', () => {
    const result = INSTRUCTION_STRATEGIES.F(
      makeState(1, 1, 'N'),
      grid,
      scented
    );
    expect(result.direction).toBe('N');
  });
});
