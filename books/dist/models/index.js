"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Book", {
  enumerable: true,
  get: function () {
    return _Book.default;
  }
});
Object.defineProperty(exports, "Counter", {
  enumerable: true,
  get: function () {
    return _Counter.default;
  }
});
exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Book = _interopRequireDefault(require("./Book"));

var _Counter = _interopRequireDefault(require("./Counter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectDb = () => {
  const uri = process.env.NODE_ENV === "development" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
  const port = process.env.MONGO_PORT;
  const database = process.env.MONGO_DATABASE;
  const mongoUri = `mongodb://${uri}:${port}/${database}`;
  const mongoOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  };
  return _mongoose.default.connect(mongoUri, mongoOptions);
};

exports.connectDb = connectDb;