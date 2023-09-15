// limiter
const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 60 * 1000,
  delayMs: 0,
  max: 100,
  message: JSON.stringify({
    error: 'за 1 минуту было много запросов',
    code: 429,
  }),
});
