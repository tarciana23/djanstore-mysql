const db = require('../db');

async function getTodosAutores() {
	const [rows] = await db.query('SELECT * FROM autores');
	return rows;
}

async function getAutorPorId(id) {
	const [rows] = await db.query('SELECT * FROM autores WHERE id = ?', [id]);
	return rows[0];
}

async function insereAutor(autorNovo) {
	const { nome, nacionalidade } = autorNovo;
	const [result] = await db.query(
		'INSERT INTO autores (nome, nacionalidade) VALUES (?, ?)',
		[nome, nacionalidade]
	);
	return { id: result.insertId, ...autorNovo };
}

async function modificaAutor(modificacoes, id) {
	const campos = [];
	const valores = [];

	for (const [chave, valor] of Object.entries(modificacoes)) {
		campos.push(`${chave} = ?`);
		valores.push(valor);
	}
	valores.push(id);
	const query = `UPDATE autores SET ${campos.join(', ')} WHERE id = ?`;
	const [result] = await db.query(query, valores);
	return result;
}

async function deletarAutorPorId(id) {
	const [result] = await db.query('DELETE FROM autores WHERE id = ?', [id]);
	return result;
}

module.exports = {
	getTodosAutores,
	getAutorPorId,
	insereAutor,
	modificaAutor,
	deletarAutorPorId,
};
