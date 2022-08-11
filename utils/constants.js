const { NODE_ENV, JWT_SECRET, BD } = process.env;

const regExp = /^(https?:\/\/)(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;
// const regExp = /^(https?:\/\/)(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

const addresMongoDB = NODE_ENV === 'production' ? BD : 'mongodb://localhost:27017/moviesdb';

module.exports = {
  regExp,
  secretKey,
  addresMongoDB,
};
