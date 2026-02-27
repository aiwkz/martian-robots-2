# Martian Robots 2

This project is a **second implementation** of the classic _Martian Robots_ problem.

The original solution was written in **2021** and lives in this same GitHub account.
This version exists to intentionally **revisit the problem with more experience**, better structure, stricter typing, and a modern frontend toolchain.

The goal is not to change the problem, but to improve **code quality, clarity, and architecture**.

---

## 🧠 Problem Description

The full problem statement, rules, constraints, and example inputs/outputs are documented in:

📄 **martian-robots.md**

This implementation follows that specification exactly, including:

- Grid limits
- Robot movement rules
- “Scent” mechanics for lost robots
- Expected output format

---

## 🚀 Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **ESLint (flat config)**
- **Modern ES Modules**

No external state libraries, no UI frameworks, no over-engineering.

---

## 🏗 Architecture Overview

The solution is intentionally split by responsibility:

### Core logic (framework-agnostic)

- `inputParser` – validates and parses raw input into typed structures
- `runInstructions` – executes robot instructions and handles scent logic
- `helpers` – direction maps and movement tables
- `formatResult` – formats final robot state output

These utilities are **pure, testable, and reusable**, independent of React.

### UI layer

- A simple React component that:
  - Accepts raw input
  - Executes the simulation
  - Displays formatted results or errors

The UI is deliberately minimal. The focus is correctness and clarity.

---

## ▶️ Running the Project

Install dependencies:

```bash
npm install
npm run dev
npm run build
npm run preview
```
