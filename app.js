const express = require('express');
const rotaLivro = require('./routes/livro');
const rotaFavorito = require('./routes/favoritos');
const rotaAutor = require('./routes/autores');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/livros', rotaLivro);
app.use('/favoritos', rotaFavorito);
app.use('/autores', rotaAutor);

const port = 8000;

app.listen(port, () => {
	console.log(`Escutando a porta ${port}`);
});
