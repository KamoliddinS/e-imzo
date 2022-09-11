"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _Eimzo = _interopRequireDefault(require("./e-imzo/Eimzo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Modal() {
  const [certificates, setCertificates] = (0, _react.useState)(null);
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const EIMZOClient = new _Eimzo.default();
  (0, _react.useEffect)(() => {
    const listAllKeys = async () => {
      const certs = await EIMZOClient.install();
      const data = await EIMZOClient.listAllUserKeys();
      setCertificates(data);
    };

    listAllKeys();
    console.log("certificates", certificates);
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => toggleModal()
  }, "E-imzo bilan kirish "), isOpen ? /*#__PURE__*/_react.default.createElement("div", {
    className: "modal",
    onClick: () => toggleModal()
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/_react.default.createElement("h1", null, "Modal"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => toggleModal()
  }, "close"))) : null);
}