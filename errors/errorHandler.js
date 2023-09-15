// errorHandler 500
const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'произошла ошибка на сервере' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
