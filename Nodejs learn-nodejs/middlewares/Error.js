const notfound = (req, res, next) => {
  const error = new Error(`not found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const StatusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(StatusCode).json({ message: err.message });
};


module.exports = {
  notfound,
  errorHandler,
};
