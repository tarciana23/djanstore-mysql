const db = require('../db');

async function getTodosLivros() {
	const [rows] = await db.query(`
        SELECT
            livros.id,
            livros.nome,
			livros.ano,
            autores.id AS autor_id,
            autores.nome AS autor_nome,
            autores.nacionalidade AS autor_nacionalidade
        FROM
            livros
        INNER JOIN
            autores ON livros.autor_id = autores.id
    `);
	return rows;
}

async function getLivroPorId(id) {
	const [rows] = await db.query(
		`
        SELECT
            livros.id,
            livros.nome,
			livros.ano,
            autores.id AS autor_id,
            autores.nome AS autor_nome,
            autores.nacionalidade AS autor_nacionalidade
        FROM
            livros
        INNER JOIN
            autores ON livros.autor_id = autores.id
        WHERE
            livros.id = ?
    `,
		[id]
	);
	return rows[0];
}

async function getLivrosPorParteDoNomeDoAutor(nomeAutor) {
	const [rows] = await db.query(
		`
        SELECT
            livros.id,
            livros.nome,
            livros.ano,
            autores.id AS autor_id,
            autores.nome AS autor_nome,
            autores.nacionalidade AS autor_nacionalidade
        FROM
            livros
        INNER JOIN
            autores ON livros.autor_id = autores.id
        WHERE
            autores.nome LIKE ?
    `,
		[`%${nomeAutor}%`]
	); // Usamos % para buscar partes do nome
	return rows;
}

async function insereLivro(livroNovo) {
	const { nome, ano, autor_id } = livroNovo;
	const [result] = await db.query(
		'INSERT INTO livros (nome, ano, autor_id) VALUES (?, ?, ?)',
		[nome, ano, autor_id]
	);
	return { id: result.insertId, ...livroNovo };
}

async function modificaLivro(modificacoes, id) {
	const campos = [];
	const valores = [];

	for (const [chave, valor] of Object.entries(modificacoes)) {
		if (chave === 'autor') {
			campos.push('autor_id = ?');
		} else {
			campos.push(`${chave} = ?`);
		}
		valores.push(valor);
	}
	valores.push(id);
	const query = `UPDATE livros SET ${campos.join(', ')} WHERE id = ?`;
	const [result] = await db.query(query, valores);
	return result;
}

async function deletarLivroPorId(id) {
	const [result] = await db.query('DELETE FROM livros WHERE id = ?', [id]);
	return result;
}

module.exports = {
	getTodosLivros,
	getLivroPorId,
	insereLivro,
	modificaLivro,
	deletarLivroPorId,
	getLivrosPorParteDoNomeDoAutor,
};
