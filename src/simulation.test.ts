import { describe, it, expect } from 'vitest';
import { inputParser } from './utils/inputParser';
import { runInstructions } from './utils/runInstructions';
import { formatResult } from './utils/formatResult';

const runSimulation = (input: string) => {
  const { grid, robots } = inputParser(input);
  const scented = new Set<string>();
  return robots.map(robot =>
    formatResult(runInstructions(robot, grid, scented))
  );
};

describe('simulation integration', () => {
  it('example from the problem spec', () => {
    const input = [
      '5 3',
      '1 1 E',
      'RFRFRFRF',
      '3 2 N',
      'FRRFLLFFRRFLL',
      '0 3 W',
      'LLFFFLFLFL',
    ].join('\n');

    const results = runSimulation(input);

    expect(results[0]).toEqual({ text: '1 1 E', lost: false });
    expect(results[1]).toEqual({ text: '3 3 N', lost: true });
    expect(results[2]).toEqual({ text: '2 3 S', lost: false });
  });

  it('robot that falls off immediately (single F at boundary)', () => {
    const input = '5 3\n5 3 N\nF';
    const results = runSimulation(input);
    expect(results[0].lost).toBe(true);
    expect(results[0].text).toBe('5 3 N');
  });

  it('single robot with no turns, just moves', () => {
    const input = '5 5\n0 0 N\nFFF';
    const results = runSimulation(input);
    expect(results[0]).toEqual({ text: '0 3 N', lost: false });
  });
});
