const {
	getTodosAutores,
	getAutorPorId,
	insereAutor,
	modificaAutor,
	deletarAutorPorId,
} = require('../services/autor');

async function getAutores(req, res) {
	try {
		const autores = await getTodosAutores();
		res.send(autores);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

async function getAutor(req, res) {
	try {
		const id = req.params.id;
		if (id && Number(id)) {
			const autor = await getAutorPorId(id);
			if (!autor) {
				return res.status(404).send('Autor não encontrado');
			}
			res.send(autor);
		} else {
			res.status(422).send('Id inválido');
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
}

async function postAutor(req, res) {
	try {
		const autorNovo = req.body;
		if (req.body.nome) {
			await insereAutor(autorNovo);
			res.status(201).send('Autor inserido com sucesso');
		} else {
			res.status(422).send('O campo nome é obrigatório');
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
}

async function patchAutor(req, res) {
	try {
		const id = req.params.id;

		if (id && Number(id)) {
			const body = req.body;
			await modificaAutor(body, id);
			res.send('Autor modificado com sucesso');
		} else {
			res.status(422).send('Id inválido');
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
}

async function deleteAutor(req, res) {
	try {
		const id = req.params.id;
		if (id && Number(id)) {
			await deletarAutorPorId(id);
			res.send('Autor deletado com sucesso');
		} else {
			res.status(422).send('ID inválido');
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
}

module.exports = {
	getAutores,
	getAutor,
	postAutor,
	patchAutor,
	deleteAutor,
};
