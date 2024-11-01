const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  valor: { type: Number, required: true },
  crescimento: { type: Number, required: true } 
});

module.exports = mongoose.model('Action', ActionSchema);
