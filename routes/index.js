const router = require('express').Router();
const userRouter = require('./users.router');
const movieRouter = require('./movies.router');
const notFoundRouter = require('./404.router');
const { createUser, login } = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const { validationUser, validationLogin } = require('../utils/validation');

router.post('/signup', validationUser, createUser);
router.post('/signin', validationLogin, login);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('/', auth, notFoundRouter);

module.exports = router;