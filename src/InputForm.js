import React, { useState } from 'react';

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jsonInput = JSON.parse(inputValue);
      const response = await fetch('https://your-vercel-url.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonInput)
      });
      const responseData = await response.json();
      setResponse(responseData);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter JSON input:
        <textarea value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      </label>
      <button type="submit">Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default InputForm;