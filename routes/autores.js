const { Router } = require('express');
const {
	getAutores,
	getAutor,
	postAutor,
	patchAutor,
	deleteAutor,
} = require('../controllers/autores');

const router = Router();

router.get('/', getAutores);
router.get('/:id', getAutor);
router.post('/', postAutor);
router.patch('/:id', patchAutor);
router.delete('/:id', deleteAutor);

module.exports = router;
