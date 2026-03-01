import { describe, it, expect } from 'vitest';
import { Grid } from './Grid';

describe('Grid.create()', () => {
  it('creates with valid coordinates', () => {
    const grid = Grid.create(5, 3);
    expect(grid.maxX).toBe(5);
    expect(grid.maxY).toBe(3);
  });

  it('creates at boundary (0, 0)', () => {
    const grid = Grid.create(0, 0);
    expect(grid.maxX).toBe(0);
    expect(grid.maxY).toBe(0);
  });

  it('creates at max allowed (50, 50)', () => {
    const grid = Grid.create(50, 50);
    expect(grid.maxX).toBe(50);
    expect(grid.maxY).toBe(50);
  });

  it('throws on negative X', () => {
    expect(() => Grid.create(-1, 3)).toThrow(
      'Grid coordinates must be positive numbers'
    );
  });

  it('throws on negative Y', () => {
    expect(() => Grid.create(5, -1)).toThrow(
      'Grid coordinates must be positive numbers'
    );
  });

  it('throws on NaN X', () => {
    expect(() => Grid.create(NaN, 3)).toThrow(
      'Grid coordinates must be positive numbers'
    );
  });

  it('throws on NaN Y', () => {
    expect(() => Grid.create(5, NaN)).toThrow(
      'Grid coordinates must be positive numbers'
    );
  });

  it('throws when X exceeds 50', () => {
    expect(() => Grid.create(51, 3)).toThrow(
      'Grid coordinates exceed limit of 50'
    );
  });

  it('throws when Y exceeds 50', () => {
    expect(() => Grid.create(5, 51)).toThrow(
      'Grid coordinates exceed limit of 50'
    );
  });
});

describe('Grid.isWithinBounds()', () => {
  const grid = Grid.create(5, 3);

  it('returns true for interior value', () => {
    expect(grid.isWithinBounds(2, 2)).toBe(true);
  });

  it('returns true for (0, 0)', () => {
    expect(grid.isWithinBounds(0, 0)).toBe(true);
  });

  it('returns true for (maxX, maxY)', () => {
    expect(grid.isWithinBounds(5, 3)).toBe(true);
  });

  it('returns false for x > maxX', () => {
    expect(grid.isWithinBounds(6, 2)).toBe(false);
  });

  it('returns false for y > maxY', () => {
    expect(grid.isWithinBounds(2, 4)).toBe(false);
  });

  it('returns false for negative x', () => {
    expect(grid.isWithinBounds(-1, 2)).toBe(false);
  });

  it('returns false for negative y', () => {
    expect(grid.isWithinBounds(2, -1)).toBe(false);
  });
});
