const rateLimit = require('express-rate-limit');
const { ERRORS } = require('../utils/constants');

module.exports = rateLimit({
  windowMs: 15 * 6e4,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: ERRORS.MANY_REQUEST },
});