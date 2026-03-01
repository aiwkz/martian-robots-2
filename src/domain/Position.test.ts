import { describe, it, expect } from 'vitest';
import { Position } from './Position';

describe('Position.create()', () => {
  it('creates at (0, 0)', () => {
    const pos = Position.create(0, 0);
    expect(pos.x).toBe(0);
    expect(pos.y).toBe(0);
  });

  it('creates at valid coordinates', () => {
    const pos = Position.create(3, 2);
    expect(pos.x).toBe(3);
    expect(pos.y).toBe(2);
  });

  it('creates at boundary (50, 50)', () => {
    const pos = Position.create(50, 50);
    expect(pos.x).toBe(50);
    expect(pos.y).toBe(50);
  });

  it('throws on negative x', () => {
    expect(() => Position.create(-1, 0)).toThrow();
  });

  it('throws on negative y', () => {
    expect(() => Position.create(0, -1)).toThrow();
  });

  it('throws on NaN', () => {
    expect(() => Position.create(NaN, 0)).toThrow();
  });

  it('throws when value exceeds 50', () => {
    expect(() => Position.create(51, 0)).toThrow();
  });
});

describe('Position.tryCreate()', () => {
  it('returns Position for valid coordinates', () => {
    const pos = Position.tryCreate(3, 2);
    expect(pos).not.toBeNull();
    expect(pos?.x).toBe(3);
    expect(pos?.y).toBe(2);
  });

  it('returns null for negative x', () => {
    expect(Position.tryCreate(-1, 0)).toBeNull();
  });

  it('returns null for NaN', () => {
    expect(Position.tryCreate(NaN, 0)).toBeNull();
  });

  it('returns null for value > 50', () => {
    expect(Position.tryCreate(51, 0)).toBeNull();
  });
});

describe('Position.toKey()', () => {
  it('returns "x,y" string', () => {
    expect(Position.create(3, 2).toKey()).toBe('3,2');
  });
});
