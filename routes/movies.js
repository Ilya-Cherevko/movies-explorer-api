const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');
const {
  validationCard,
  validationCardId,
} = require('../utils/validation');

router.get('/', getCards);

router.get('/movies', getMovies);

router.post('/movies', validationMovies, createMovie);

router.delete('/:cardId', validationCardId, deleteMovie);

module.exports = router;
