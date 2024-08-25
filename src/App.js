import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = "21BCY10249"; // Replace with your actual roll number
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

    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('/api/bfhl', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        <p>User ID: {response.user_id}</p>
        <p>Email: {response.email}</p>
        <p>Roll Number: {response.roll_number}</p>
        {selectedOptions.map((option) => (
          <div key={option.value}>
            <h3>{option.label}</h3>
            <p>{JSON.stringify(response[option.value])}</p>
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
          placeholder='Enter JSON here (e.g., {"data": ["M","1","334","4","B","Z","a"]})'
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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