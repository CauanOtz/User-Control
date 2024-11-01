const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

// Rota padrão
app.get('/', (req, res) => {
  res.send('Servidor funcionando!'); 
});

app.use('/api/actions', require('./Routes/actions'));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
