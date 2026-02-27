# Martian Robots – Code Challenge

## The Problem

The surface of Mars is a rectangular grid. Robots move on this grid using instructions sent from Earth.

You must write a program that simulates the robots and prints their **final position**.

A robot position consists of:

- A coordinate: `(x, y)`
- A direction: `N`, `E`, `S`, or `W`

## Directions and Instructions

### Directions

- `N` = North
- `E` = East
- `S` = South
- `W` = West

### Instructions

- `L` → Turn left 90 degrees (stays on the same grid point)
- `R` → Turn right 90 degrees (stays on the same grid point)
- `F` → Move forward one grid point in the current direction

**Example movements:**

- Facing `N`, `F` → `(x, y)` becomes `(x, y+1)`
- Facing `E`, `F` → `(x, y)` becomes `(x+1, y)`
- Facing `S`, `F` → `(x, y)` becomes `(x, y-1)`
- Facing `W`, `F` → `(x, y)` becomes `(x-1, y)`

Future versions may introduce new instruction types, so the code should be designed to be easily extensible.

## Grid Limits and LOST Robots

- The grid is rectangular
- Bottom-left corner is always `(0, 0)`
- Top-right corner is given in the input (`maxX maxY`)
- Coordinates range from `0` to `maxX` (x) and `0` to `maxY` (y) inclusive

If a robot attempts to move **outside** the grid boundaries, it becomes **LOST**:

- The robot stops executing any further instructions
- It leaves a **scent** at its **last valid position** (the position it was in before the invalid move)
- If another robot later tries to move off the grid **from the exact same position and in the same direction**, that move is **ignored** (the robot stays in place and continues with the next instruction)

## Input Format

maxX maxY
x y direction
instructions
x y direction
instructions

- First line: two integers → grid size (`maxX` `maxY`)
- Then for each robot:
  - One line: `x y direction` (integers + one letter N/E/S/W)
  - One line: string of instructions (L, R, F only in the example)
- Blank lines may appear anywhere → should be ignored
- Constraints:
  - `0 ≤ maxX, maxY ≤ 50`
  - Instruction strings are < 100 characters
  - All values are valid (no need to validate input format)

## Output Format

For each robot, output **one line**:

- If the robot is still on the grid:
  `x y direction`

- If the robot is **LOST**:
  `x y direction LOST`

(where `x y` are the **last valid position** before becoming lost)

## Example

### Input

5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL

### Output

1 1 E
3 3 N LOST
2 3 S

## Suggested Approach Hints

- Represent direction as an enum/class or as index in array `['N','E','S','W']`
- Keep track of "scents" as set of positions + direction where a fall-off happened
- Process robots **sequentially** (one after another)
- For each `F` instruction, check if next position is out of bounds → if yes, mark as LOST and leave scent (unless that exact fall-off already has a scent)
