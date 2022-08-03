const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const notFoundRouter = require('./404');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validationUser, validationLogin } = require('../utils/validation');

router.post('/signup', validationUser, createUser);
router.post('/signin', validationLogin, login);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('/', auth, notFoundRouter);

module.exports = router;
