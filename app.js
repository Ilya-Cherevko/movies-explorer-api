require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const routes = require('./routes');
const { addresMongoDB } = require('./utils/constants');
const cors = require('./middlewares/cors');
const error = require('./middlewares/error');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

// подключаемся к серверу mongo;
mongoose.connect(addresMongoDB);

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(cors);

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

app.use(routes);

// обработчики ошибок
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(error);

app.listen(PORT, () => {
  console.log(`Сервер работает на ${PORT} порту`);
  console.log(`Монго работает по адресу ${addresMongoDB}`);
});
