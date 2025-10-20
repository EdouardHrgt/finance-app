// ./utils/HttpError.js
class HttpError extends Error {
  constructor(message, status, routes = null) {
    super(message);
    this.status = status;
    this.routes = routes;
  }
}

module.exports = HttpError;
