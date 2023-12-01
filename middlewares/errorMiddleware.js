const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        return next(); // No error, continue to the next middleware
      }
    
    console.error(err.stack || err.message || err);
    res.status(500).json({ message: 'something went wrong'});
  }
  export default errorMiddleware;