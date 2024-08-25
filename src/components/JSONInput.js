import React, { useState } from 'react';

const JSONInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const jsonInput = JSON.parse(input).data;
      setError(null);
      onSubmit(jsonInput);
    } catch (e) {
      setError('Invalid JSON');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={handleChange}
          rows="4"
          cols="50"
          placeholder='Enter JSON like {"data": ["A", "C", "z"]}'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default JSONInput;
