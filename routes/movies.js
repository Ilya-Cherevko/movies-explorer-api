const router = require('express').Router();
const {
  getFilms,
  createFilm,
  deleteFilm,
} = require('../controllers/movies');
const {
  validationFilm,
  vvalidationFilmId,
} = require('../utils/validation');

router.get('/', getFilms);

router.post('/', validationFilm, createFilm);

router.delete('/:Id', validationFilmId, deleteFilm);

module.exports = router;