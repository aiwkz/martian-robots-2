import { describe, it, expect } from 'vitest';
import { parseRobot } from './parseRobot';

describe('parseRobot() — happy paths', () => {
  it('tolerates trailing space in position line', () => {
    const robot = parseRobot('1 1 E ', 'F');
    expect(robot.direction).toBe('E');
  });

  it('tolerates trailing space in instruction line', () => {
    const robot = parseRobot('1 1 E', 'RFRF ');
    expect(robot.instructions).toEqual(['R', 'F', 'R', 'F']);
  });

  it('parses valid "1 1 E" + "RFRFRFRF"', () => {
    const robot = parseRobot('1 1 E', 'RFRFRFRF');
    expect(robot.position.x).toBe(1);
    expect(robot.position.y).toBe(1);
    expect(robot.direction).toBe('E');
    expect(robot.instructions).toEqual([
      'R',
      'F',
      'R',
      'F',
      'R',
      'F',
      'R',
      'F',
    ]);
  });

  it('accepts direction N', () => {
    expect(parseRobot('0 0 N', 'F').direction).toBe('N');
  });

  it('accepts direction S', () => {
    expect(parseRobot('0 0 S', 'F').direction).toBe('S');
  });

  it('accepts direction W', () => {
    expect(parseRobot('0 0 W', 'F').direction).toBe('W');
  });
});

describe('parseRobot() — error paths', () => {
  it('throws on fewer than 3 parts in position line', () => {
    expect(() => parseRobot('1 1', 'F')).toThrow();
  });

  it('throws on more than 3 parts in position line', () => {
    expect(() => parseRobot('1 1 E X', 'F')).toThrow();
  });

  it('throws on negative coordinates', () => {
    expect(() => parseRobot('-1 1 E', 'F')).toThrow();
  });

  it('throws on non-numeric coordinate string', () => {
    expect(() => parseRobot('a 1 E', 'F')).toThrow();
  });

  it('throws on invalid direction', () => {
    expect(() => parseRobot('1 1 X', 'F')).toThrow();
  });

  it('throws on empty instruction string', () => {
    expect(() => parseRobot('1 1 E', '')).toThrow();
  });

  it('throws on instruction string over 100 characters', () => {
    expect(() => parseRobot('1 1 E', 'F'.repeat(101))).toThrow();
  });

  it('throws on unknown instruction character', () => {
    expect(() => parseRobot('1 1 E', 'FZF')).toThrow();
  });
});
