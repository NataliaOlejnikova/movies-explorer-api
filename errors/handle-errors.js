const errorHandle = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'произошла ошибкак на сервере' : err.message;
  res.status(statusCode).send({ message });
  next();
};
module.exports = errorHandle;
