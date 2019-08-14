"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Counter = _interopRequireDefault(require("./Counter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bookSchema = new _mongoose.default.Schema({
  Title: {
    type: String,
    required: true
  },
  Author: {
    type: String,
    required: false
  },
  Publisher: {
    type: String,
    required: false
  },
  Rating: {
    type: Number,
    required: true,
    min: 1,
    max: 3
  },
  Published: {
    type: Date,
    default: Date.now
  },
  Status: {
    type: String,
    enum: ["CheckedIn", "CheckedOut"],
    required: false
  },
  BookId: {
    type: Number
  }
});

function preSave(next) {
  const doc = this;

  _Counter.default.findByIdAndUpdate({
    _id: "BookId"
  }, {
    $inc: {
      seq: 1
    }
  }, (error, newCounter) => {
    if (error) {
      return next(error);
    }

    if (!newCounter) {
      doc.BookId = 0;
      return _Counter.default.create({
        _id: "BookId",
        seq: 1
      }, next);
    }

    doc.BookId = newCounter.seq;
    return next();
  });
}

bookSchema.pre("save", preSave);

const Book = _mongoose.default.model("Book", bookSchema);

var _default = Book;
exports.default = _default;