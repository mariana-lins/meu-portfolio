const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true })); // Adicione esta linha

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Meu Portfólio', nome: 'Mariana Cavalcante Lins' });
});

const projetos = [];

app.get('/projetos', (req, res) => {
  res.render('projetos', { title: 'Projetos', projetos });
});

app.post('/projetos', (req, res) => {
  const { titulo, descricao, tecnologias, link } = req.body;
  projetos.push({ titulo, descricao, tecnologias, link });
  res.redirect('/projetos');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
