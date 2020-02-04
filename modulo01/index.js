const express = require('express'); // Importando express.
const server = express();


server.get('/teste', (req, res) => {
  return res.json({ message: 'Hello '})
})

server.listen(3000); //Porta que o servidor será chamado