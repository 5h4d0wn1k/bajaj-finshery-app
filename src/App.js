import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const apiEndpoint = '/api/bfhl';

  useEffect(() => {
    document.title = '21BCY10249';
  }, []);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);
    setSelectedOptions([]);

    try {
      if (!input.trim()) {
        throw new Error('Input cannot be empty.');
      }

      const parsedInput = JSON.parse(input);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error('JSON should have a "data" array.');
      }

      const res = await axios.post(apiEndpoint, parsedInput);
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setError(`Error: ${err.message}`);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {response.user_id && (
          <p>
            <strong>User ID:</strong> {response.user_id}
          </p>
        )}
        {response.email && (
          <p>
            <strong>Email:</strong> {response.email}
          </p>
        )}
        {response.roll_number && (
          <p>
            <strong>Roll Number:</strong> {response.roll_number}
          </p>
        )}
        {selectedOptions.map((option) => (
          <div key={option.value}>
            <h3>{option.label}</h3>
            {response[option.value] && (
              <p>
                <code>{JSON.stringify(response[option.value], null, 2)}</code>
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Operation</h1>
      <form onSubmit={handleSubmit}>
      <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder='Enter JSON here (e.g., {\"data\": [\"M\",\"1\",\"334\",\"4\",\"B\",\"Z\",\"a\"]})'
      rows={5}
      cols={50}
      />

        <br />
        <button type="submit">Submit</button>
      </form>
      {error && (
        <p style={{ color: 'red' }}>
          <strong>Error:</strong> {error}
        </p>
      )}
      {response && (
        <div>
          <h2>Response:</h2>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            placeholder="Select options to display"
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
