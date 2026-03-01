import { describe, it, expect } from 'vitest';
import { runInstructions } from './runInstructions';
import { Position } from '../domain/Position';
import { Grid } from '../domain/Grid';
import type { RobotInput } from '../types';

describe('runInstructions()', () => {
  const grid = Grid.create(5, 5);
  const scented = new Set<string>();

  it('returns initial state when instructions array is empty', () => {
    const robot: RobotInput = {
      position: Position.create(1, 1),
      direction: 'N',
      instructions: [],
    };
    const result = runInstructions(robot, grid, scented);
    expect(result.position.x).toBe(1);
    expect(result.position.y).toBe(1);
    expect(result.direction).toBe('N');
    expect(result.lost).toBe(false);
  });

  it('single L changes direction', () => {
    const robot: RobotInput = {
      position: Position.create(1, 1),
      direction: 'N',
      instructions: ['L'],
    };
    const result = runInstructions(robot, grid, scented);
    expect(result.direction).toBe('W');
  });

  it('single R changes direction', () => {
    const robot: RobotInput = {
      position: Position.create(1, 1),
      direction: 'N',
      instructions: ['R'],
    };
    const result = runInstructions(robot, grid, scented);
    expect(result.direction).toBe('E');
  });

  it('F moves robot within bounds', () => {
    const robot: RobotInput = {
      position: Position.create(1, 1),
      direction: 'N',
      instructions: ['F'],
    };
    const result = runInstructions(robot, grid, scented);
    expect(result.position.y).toBe(2);
    expect(result.lost).toBe(false);
  });

  it('robot that goes lost stops processing remaining instructions', () => {
    const robot: RobotInput = {
      position: Position.create(5, 5),
      direction: 'N',
      instructions: ['F', 'L'],
    };
    const result = runInstructions(robot, grid, scented);
    expect(result.lost).toBe(true);
    expect(result.direction).toBe('N');
  });

  it('respects scented set: robot ignores F that would fall off scented position', () => {
    const scented = new Set<string>(['5,5']);
    const robot: RobotInput = {
      position: Position.create(5, 5),
      direction: 'N',
      instructions: ['F'],
    };
    const result = runInstructions(robot, grid, scented);
    expect(result.lost).toBe(false);
    expect(result.position.x).toBe(5);
    expect(result.position.y).toBe(5);
  });
});
