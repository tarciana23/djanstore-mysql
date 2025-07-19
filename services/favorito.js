const db = require('../db');

async function getTodosFavoritos() {
	const [rows] = await db.query(`
		SELECT l.id, l.nome, l.autor, l.ano
		FROM livros l
		WHERE l.id IN (SELECT id FROM favoritos)
	`);
	return rows;
}

async function deletarFavoritoPorId(id) {
	await db.query('DELETE FROM favoritos WHERE id = ?', [id]);
}

async function insereFavorito(id) {
	const [result] = await db.query('INSERT INTO favoritos (id) VALUES (?)', [
		id,
	]);
	return { id };
}

module.exports = {
	getTodosFavoritos,
	deletarFavoritoPorId,
	insereFavorito,
};
