const express = require('express');
const app = express();
app.use(express.json());

const userId = 'Nikhil_Nagpure_24082004';
const email = 'nikhilnagpure203@gmail.com';
const rollNumber = '21BCY10249';

app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (item.match(/[a-z]/i)) {
      alphabets.push(item);
      if (item.toLowerCase() === item) {
        highestLowercaseAlphabet = [item];
      }
    }
  });

  res.json({
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

module.exports = app;