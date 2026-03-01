import { useState } from 'react';
import type { FormattedResult } from '../../types';
import { inputParser } from '../../utils/inputParser';
import { runInstructions } from '../../utils/runInstructions';
import { formatResult } from '../../utils/formatResult';

import './input.css';

const Input = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<FormattedResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleRun = () => {
    try {
      setError(null);
      setOutput([]);

      const { grid, robots } = inputParser(input);

      const scented = new Set<string>();
      const results = [];

      for (const robot of robots) {
        const finalState = runInstructions(robot, grid, scented);
        results.push(formatResult(finalState));
      }

      setOutput(results);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <div className='input-container'>
      <textarea
        className='textarea'
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <button className='button' onClick={handleRun}>
        Run Instructions
      </button>

      {error && <p className='error'>{error}</p>}

      <div className='result-container'>
        {output.map((line, index) => (
          <p key={index} className='result'>
            {line.text}
            {line.lost && <span className='lost'> LOST</span>}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Input;
