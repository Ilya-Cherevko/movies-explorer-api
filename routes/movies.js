const router = require('express').Router();
const {
  getFilms,
  createFilm,
  deleteFilm,
} = require('../controllers/movies');
const {
  validationFilm,
  validationFilmId,
} = require('../utils/validation');

router.get('/', getFilms);

router.post('/', validationFilm, createFilm);

router.delete('/:id', validationFilmId, deleteFilm);

module.exports = router;
