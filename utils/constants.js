const { NODE_ENV, JWT_SECRET, BD } = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

const addresMongoDB = NODE_ENV === 'production' ? BD : 'mongodb://localhost:27017/moviesdb';

const ERRORS = {
  DEFAULT: 'Произошла ошибка',
  AUTH: 'Необходима авторизация',
  MANY_REQUEST: 'Слишком много запросов, повторите попытку позже',
  INCORRECT_REQUEST: 'Ресурс не найден. Проверьте URL и метод запроса',

  MOVIE: {
    INCORRECT: 'Переданы некорректные данные при сохранении фильма',
    FOUND: 'Фильм не найден',
    PERMISSIONS: 'У вас недостаточно прав доступа',
    ID: 'Передан некорректный id фильма',
  },

  USER: {
    FOUND: 'Пользователь не найден.',
    INCORRECT_UPDATE: 'Переданы некорректные данные при обновлении профиля',
    INCORRECT_CREATE: 'Переданы некорректные данные при создании пользователя',
    EXISTS: 'Такой пользователь уже существует!',
    AUTH: 'Неправильные почта или пароль',
  },
};

module.exports = {
  secretKey,
  addresMongoDB,
  ERRORS,
};
