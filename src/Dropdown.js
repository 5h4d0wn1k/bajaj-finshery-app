import React, { useState } from 'react';

const Dropdown = ({ response }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (option) => {
    setSelectedOptions((prevOptions) => [...prevOptions, option]);
  };

  const handleDeselect = (option) => {
    setSelectedOptions((prevOptions) => prevOptions.filter((o) => o !== option));
  };

  return (
    <div>
      <h2>Select options:</h2>
      <ul>
        <li>
          <input
            type="checkbox"
            id="alphabets"
            value="Alphabets"
            onChange={(event) => event.target.checked ? handleSelect('Alphabets') : handleDeselect('Alphabets')}
          />
          <label htmlFor="alphabets">Alphabets</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="numbers"
            value="Numbers"
            onChange={(event) => event.target.checked ? handleSelect('Numbers') : handleDeselect('Numbers')}
          />
          <label htmlFor="numbers">Numbers</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="highest-lowercase-alphabet"
            value="Highest lowercase alphabet"
            onChange={(event) => event.target.checked ? handleSelect('Highest lowercase alphabet') : handleDeselect('Highest lowercase alphabet')}
          />
          <label htmlFor="highest-lowercase-alphabet">Highest lowercase alphabet</label>
        </li>
      </ul>
      <h2>Response:</h2>
      {selectedOptions.map((option) => (
        <div key={option}>
          <h3>{option}:</h3>
          <ul>
            {response[option.toLowerCase()]?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;