const mongoose = require('mongoose');
const validator = require('validator');
const { urlValidatorConfig, schemaConfig } = require('../utils/config');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(imageURL) {
        return validator.isURL(imageURL, urlValidatorConfig);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(imageURL) {
        return validator.isURL(imageURL, urlValidatorConfig);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(imageURL) {
        return validator.isURL(imageURL, urlValidatorConfig);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, schemaConfig);

module.exports = mongoose.model('movie', movieSchema);
