"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routes;

var _controllers = require("../controllers");

function routes(app) {
  app.get("/", _controllers.IndexController.index);
  app.get("/book", _controllers.BookController.search);
  app.post("/book", _controllers.BookController.create);
  app.get("/book/:id", _controllers.BookController.get);
  app.put("/book/:id", _controllers.BookController.update);
  app.delete("/book/:id", _controllers.BookController.delete);
}