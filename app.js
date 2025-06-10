const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Projeto = require('./models/Projeto');

app.use(express.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Meu Portfólio', nome: 'Mariana Lins' });
});

// Listar projetos
app.get('/projetos', async (req, res) => {
  const projetos = await Projeto.find();
  res.render('projetos', { title: 'Projetos', projetos });
});

// Cadastrar projeto
app.post('/projetos', async (req, res) => {
  const { titulo, descricao, tecnologias, link } = req.body;
  await Projeto.create({ titulo, descricao, tecnologias, link });
  res.redirect('/projetos');
});

// Deletar projeto
app.post('/projetos/:id/delete', async (req, res) => {
  await Projeto.findByIdAndDelete(req.params.id);
  res.redirect('/projetos');
});

// Editar projeto
app.get('/projetos/:id/edit', async (req, res) => {
  const projeto = await Projeto.findById(req.params.id);
  res.render('editarProjeto', { title: 'Editar Projeto', projeto });
});

// Atualizar projeto
app.post('/projetos/:id/edit', async (req, res) => {
  const { titulo, descricao, tecnologias, link } = req.body;
  await Projeto.findByIdAndUpdate(req.params.id, { titulo, descricao, tecnologias, link });
  res.redirect('/projetos');
});

// Projetos público
app.get('/projetos-publico', async (req, res) => {
  const projetos = await Projeto.find();
  res.render('projetosPublico', { title: 'Projetos', projetos });
});

// Conexão com o MongoDB 
mongoose.connect('mongodb+srv://mmarianalinss:Msg721723@cluster0.qrro7qb.mongodb.net/meuportfolio?retryWrites=true&w=majority&appName=Cluster0', {
  // pode remover useNewUrlParser e useUnifiedTopology se quiser
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
