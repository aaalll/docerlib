"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.default.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});