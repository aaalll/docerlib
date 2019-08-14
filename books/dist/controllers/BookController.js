"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

const validateInt = value => {
  let x; // eslint-disable-next-line

  return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
};

const BookContoller = {
  search: (req, res) => {
    const findOptions = { ...req.query
    };

    _models.Book.find(findOptions).then(Books => {
      res.status(200).json({
        Books
      });
    }).catch(err => {
      res.status(400).json({
        error: err
      });
    });
  },
  get: (req, res) => {
    const {
      id
    } = req.params;
    const findOptions = {
      BookId: id
    };

    _models.Book.findOne(findOptions).then(item => {
      const result = item || {};
      res.status(200).json({
        Book: result
      });
    }).catch(err => {
      res.status(400).json({
        error: err
      });
    });
  },
  create: (req, res) => {
    const {
      Title,
      Author,
      Publisher,
      Rating,
      Published,
      Status
    } = req.body;
    const newBook = new _models.Book({
      Title,
      Author,
      Publisher,
      Rating,
      Published,
      Status
    });

    _models.Book.create(newBook).then(item => {
      res.status(200).json({
        Book: item
      });
    }).catch(err => {
      res.status(400).json({
        error: err
      });
    });
  },
  update: async (req, res) => {
    if (!validateInt(req.params.id)) {
      return res.status(400).json({
        message: "Wrong id"
      });
    }

    const item = await _models.Book.findOneAndUpdate({
      BookId: parseInt(req.params.id, 10)
    }, req.body);

    if (item === null) {
      return res.status(400).json({
        message: "Wrong id"
      });
    }

    const updatedBook = {
      BookId: req.params.id,
      ...req.body
    };
    return res.json({
      status: res.status,
      data: updatedBook
    });
  },
  delete: (req, res) => {
    const {
      id
    } = req.params;

    if (!validateInt(req.params.id)) {
      return res.status(400).json({
        message: "Wrong id"
      });
    }

    return _models.Book.deleteOne({
      BookId: id
    }).then(() => {
      res.status(200).json({
        message: "Book deleted successfully"
      });
    }).catch(err => {
      res.status(400).json({
        error: err
      });
    });
  }
};
var _default = BookContoller;
exports.default = _default;