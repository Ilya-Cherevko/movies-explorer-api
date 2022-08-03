const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { urlValidatorConfig } = require('./config');

const checkURL = (value, helpers) => {
  const isValidURL = validator.isURL(value, urlValidatorConfig);

  return isValidURL
    ? value
    : helpers.message('Invalid URL');
};

const validationProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validationUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().required(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validationFilm = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkURL),
    trailerLink: Joi.string().required().custom(checkURL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(checkURL),
    movieId: Joi.number().required(),
  }),
});

const validationFilmId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validationProfile,
  validationUser,
  validationLogin,
  validationFilm,
  validationFilmId,
};
