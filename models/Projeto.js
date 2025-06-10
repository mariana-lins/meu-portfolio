const mongoose = require('mongoose');

const ProjetoSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  tecnologias: String,
  link: String
});

module.exports = mongoose.model('Projeto', ProjetoSchema);