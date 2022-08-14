const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ERRORS, secretKey } = require('../utils/constants');
const { jwtConfig, updateControllerConfig } = require('../utils/config');
const ConflictError = require('../utils/errors/conflict');
const NotFoundError = require('../utils/errors/not-found');
const BadRequestError = require('../utils/errors/bad-req');

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) { throw new NotFoundError(ERRORS.USER.FOUND); }
      res.send(user);
    })
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(userId, { email, name }, updateControllerConfig)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERRORS.USER.INCORRECT_UPDATE));
        return;
      }

      if (err.code === 11000) {
        next(new ConflictError(ERRORS.USER.EXISTS));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

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
        next(new BadRequestError(ERRORS.USER.INCORRECT_CREATE));
        return;
      }

      if (err.code === 11000) {
        next(new ConflictError(ERRORS.USER.EXISTS));
        return;
      }

      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        secretKey,
        jwtConfig,
      );

      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
