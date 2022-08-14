const Movie = require('../models/movie');
const { ERRORS } = require('../utils/constants');
const NotFoundError = require('../utils/errors/not-found');
const BadRequestError = require('../utils/errors/bad-req');
const ForbiddenError = require('../utils/errors/forbid');

const getFilms = (req, res, next) => {
  const owner = req.user._id;

  Movie
    .find({ owner })
    .then((films) => { res.send(films); })
    .catch((err) => next(err));
};

const createFilm = (req, res, next) => {
  const owner = req.user._id;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    })
    .then((film) => {
      res.send(film);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERRORS.MOVIE.INCORRECT));
      }
      next(err);
    });
};

const deleteFilm = (req, res, next) => {
  const filmId = req.params.id;
  const userId = req.user._id.toString();

  Movie
    .findById(filmId)
    .then((film) => {
      if (!film) throw new NotFoundError(ERRORS.MOVIE.FOUND);

      const ownerFilmId = film.owner.toString();
      if (ownerFilmId !== userId) { throw new ForbiddenError(ERRORS.MOVIE.PERMISSIONS); }

      return Movie.findByIdAndDelete(filmId);
    })

    .then((film) => {
      res.send(film);
    })

    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(ERRORS.MOVIE.ID));
        return;
      }
      next(err);
    });
};

module.exports = {
  getFilms,
  createFilm,
  deleteFilm,
};
