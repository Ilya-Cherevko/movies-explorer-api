const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/auth');
const { ERRORS, secretKey } = require('../utils/constants');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(ERRORS.AUTH));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new AuthError(ERRORS.AUTH));
    return;
  }
  // записываем пейлоуд в объект запроса
  req.user = payload;

  next();
};
