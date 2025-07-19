const {
	getTodosFavoritos,
	insereFavorito,
	deletarFavoritoPorId,
} = require('../services/favorito');

async function getFavoritos(req, res) {
	try {
		const livros = await getTodosFavoritos();
		res.send(livros);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
}

async function postFavorito(req, res) {
	try {
		const id = req.params.id;
		await insereFavorito(id);
		res.status(201);
		res.send('Livro inserido com sucesso');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
}

async function deleteFavorito(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			await deletarFavoritoPorId(id);
			res.send('Favorito deletado com sucesso');
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
	getFavoritos,
	postFavorito,
	deleteFavorito,
};
