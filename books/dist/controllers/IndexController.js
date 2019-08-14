"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function index(req, res) {
  res.status(200).send({
    message: "Index"
  });
}

var _default = {
  index
};
exports.default = _default;