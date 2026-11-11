// Creates an Error carrying an HTTP status code
module.exports = (status, message) => {
  const err = new Error(message);
  err.statusCode = status;
  return err;
};