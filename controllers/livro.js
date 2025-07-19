const {
	getTodosLivros,
	getLivroPorId,
	insereLivro,
	modificaLivro,
	deletarLivroPorId,
	getLivrosPorParteDoNomeDoAutor,
} = require('../services/livro');

async function getLivros(req, res) {
	try {
		const nomeAutor = req.query.nomeAutor;

		let livrosRetornados;
		if (nomeAutor) {
			livrosRetornados = await getLivrosPorParteDoNomeDoAutor(nomeAutor);
		} else {
			livrosRetornados = await getTodosLivros();
		}
		res.send(livrosRetornados);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

async function getLivro(req, res) {
	try {
		const id = req.params.id;
		if (id && Number(id)) {
			const livro = await getLivroPorId(id);
			if (!livro) {
				return res.status(404).send('Livro não encontrado');
			}
			res.send(livro);
		} else {
			res.status(422);
			res.send('Id inválido');
		}
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
}

async function postLivro(req, res) {
	try {
		const livroNovo = req.body;
		if (req.body.nome) {
			await insereLivro(livroNovo);
			res.status(201);
			res.send('Livro inserido com sucesso');
		} else {
			res.status(422);
			res.send('O campo nome é obrigatório');
		}
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
}

async function patchLivro(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const body = req.body;
			await modificaLivro(body, id);
			res.send('Item modificado com sucesso');
		} else {
			res.status(422);
			res.send('Id inválido');
		}
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
}

async function deleteLivro(req, res) {
	try {
		const id = req.params.id;
		if (id && Number(id)) {
			await deletarLivroPorId(id);
			res.send('livro deletado com sucesso');
		} else {
			res.status(422);
			res.send('ID inválido');
		}
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
}

module.exports = {
	getLivros,
	getLivro,
	postLivro,
	patchLivro,
	deleteLivro,
};
