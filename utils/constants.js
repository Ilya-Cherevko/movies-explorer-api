const { NODE_ENV, JWT_SECRET, BD } = process.env;

const regExp = /^(https?:\/\/)(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

const addressMongoDB = NODE_ENV === 'production' ? BD : 'mongodb://localhost:27017/moviesdb';

const ERRORS = {
  DEFAULT: 'Произошла ошибка.',
  AUTH: 'Необходима авторизация',
  MANY_REQUEST: 'Слишком много запросов, повторите попытку позже.',
  INCORRECT_REQUEST: 'Ресурс не найден. Проверьте URL и метод запроса',

  MOVIE: {
    INCORRECT: 'Переданы некорректные данные при сохранении фильма.',
    FOUND: 'Фильм не найден.',
    PERMISSIONS: 'У вас недостаточно прав доступа.',
    ID: 'Передан некорректный id фильма.',
  },

  USER: {
    FOUND: 'Пользователь не найден.',
    ID: 'Передан некорректный id пользователя.',
    INCORRECT_UPDATE: 'Переданы некорректные данные при обновлении профиля.',
    INCORRECT_CREATE: 'Переданы некорректные данные при создании пользователя.',
    INCORRECT_LOGIN: 'Переданы некорректные данные при входе.',
    EXISTS: 'Такой пользователь уже существует!',
    AUTH: 'Неправильные почта или пароль',
  },
};

module.exports = {
  reqExp,
  secretKey,
  ERRORS,
  addressMongoDB,
};
