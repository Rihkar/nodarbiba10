import React, { useState } from 'react';
import './Planner1.scss';

const tasks:string[] = [];
const Planner1 = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => (
            setInputValue(event.target.value)
          )}
        />
        <button
          onClick={() => {
            if (inputValue) {
              tasks.push(inputValue);
              setInputValue('');
            }
          }}
        >
          ADD
        </button>
      </div>
      <ul>
        {tasks.map((el) => (
          <li key={Math.random()}>
            {el}

          </li>
        ))}

      </ul>
    </div>
  );
};

export default Planner1;
