const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretKey } = require('../utils/constants');
const { jwtConfig, updateControllerConfig } = require('../utils/config');
const ConflictError = require('../utils/errors/conflict');
const NotFoundError = require('../utils/errors/not-found');
const BadRequestError = require('../utils/errors/bad-req');
const AuthError = require('../utils/errors/auth');

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) { throw new NotFoundError('Пользователь по указанному id не найден'); }
      res.send(user);
    })
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  // Неверная ошибка + в принципе лишняя проверка
  if (!email || !name) {
    next(new NotFoundError('Переданы некорректные данные при обновлении профиля'));
    return;
  }

  User.findByIdAndUpdate(userId, { email, name }, updateControllerConfig)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
        return;
      }

      if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует!'));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  // Неверная ошибка + в принципе лишняя проверка
  if (!email || !password || !name) {
    next(new NotFoundError('Переданы некорректные данные при создании пользователя'));
    return;
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
        return;
      }

      if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует!'));
        return;
      }

      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  // Неверная ошибка + в принципе лишняя проверка
  if (!email || !password) {
    next(new NotFoundError('Переданы некорректные данные при входе'));
    return;
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        secretKey,
        jwtConfig,
      );

      res.send({ token });
    })
    .catch((err) => next(new AuthError(err.message)));
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
