const { ERRORS } = require('../utils/constants');

module.exports = (err, _, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? ERRORS.DEFAULT : err.message;

  res.status(statusCode).send({ message });
  next();
};
