const express = require('express');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const csvHeader = [
  { id: 'linha', title: 'Linha de Texto' },
];

const csvWriterInstance = csvWriter({
  path: 'data.csv',
  header: csvHeader,
});

app.post('/saveData', (req, res) => {
  const linhaTexto = req.body.linha;

  if (!linhaTexto) {
    return res.status(400).send('Linha de texto não fornecida.');
  }

  const data = [{ linha: linhaTexto }];

  csvWriterInstance.writeRecords(data)
    .then(() => {
      console.log('Linha de texto gravada com sucesso:', linhaTexto);
      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Erro ao gravar linha de texto:', error);
      res.status(500).send('Erro ao gravar linha de texto.');
    });
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});