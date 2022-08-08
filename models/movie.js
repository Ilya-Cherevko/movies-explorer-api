const mongoose = require('mongoose');
// const validator = require('validator');
const { schemaConfig } = require('../utils/config');
const { regExp } = require('../utils/constants');

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
    validate: (val) => regExp.test(val),
  //  validate: {
  //    validator(imageUrl) {
  //      return validator.isUrl(imageUrl, urlValidatorConfig);
  //    },
  //  },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: (val) => regExp.test(val),
  //  validate: {
  //    validator(imageUrl) {
  //      return validator.isUrl(imageUrl, urlValidatorConfig);
  //    },
  //  },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: (val) => regExp.test(val),
  //  validate: {
  //    validator(imageUrl) {
  //      return validator.isUrl(imageUrl, urlValidatorConfig);
  //    },
  // },
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
