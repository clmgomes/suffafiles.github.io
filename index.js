const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/saveDate', (req, res) => {
  const date = req.body.date;
  fs.appendFileSync('dates.txt', date + '\n');
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});