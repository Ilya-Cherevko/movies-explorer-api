const allowedCors = [
  'http://titanikum.nomoredomains.sbs',
  'https://titanikum.nomoredomains.sbs',
  'https://api.titanikum.nomoredomains.sbs',
  'http://localhost:3000',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      res.end();
      // return;
    }
  }
  next();
};
