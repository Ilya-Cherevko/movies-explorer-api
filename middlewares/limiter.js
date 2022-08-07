const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 6e4,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Слишком много запросов, повторите попытку позже' },
});
