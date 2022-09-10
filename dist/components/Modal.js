"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

var _react = require("react");

function Modal(_ref) {
  let {
    setIsOpen
  } = _ref;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "modal"
  }, "Hello modal"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsOpen(false)
  }, "Close"));
}