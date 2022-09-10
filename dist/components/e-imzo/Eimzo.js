"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _eImzoClient = require("./e-imzo-client");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CAPIWS = window.CAPIWS;
/**
 * @typedef Cert
 * @property {string} disk
 * @property {string} path
 * @property {string} name
 * @property {string} alias
 * @property {string} serialNumber
 * @property {string} validFrom
 * @property {string} validTo
 * @property {string} CN
 * @property {string} TIN
 * @property {string} UID
 * @property {string} O
 * @property {string} T
 * @property {string} type
 */

/**
 * @typedef SignPkcs7Result
 * @property {string} pkcs7_64
 * @property {string} signature_hex
 * @property {string} signer_serial_number
 */

/**
 * @typedef LoadKeyResult
 * @property {string} id
 * @property {Cert} cert
 **/

class EIMZO {
  constructor() {
    _defineProperty(this, "_loadedKey", null);

    _defineProperty(this, "apiKeys", ["localhost", "96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B", "127.0.0.1", "A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F"]);
  }

  get loadedKey() {
    return this._loadedKey;
  }

  set loadedKey(value) {
    this._loadedKey = value;
  }

  /**
   * @return {Promise<{major: Number, minor: Number}>}
   */
  async checkVersion() {
    return new Promise((resolve, reject) => {
      _eImzoClient.EIMZOClient.checkVersion(function (major, minor) {
        resolve({
          major,
          minor
        });
      }, function (error, message) {
        reject(error, message);
      });
    });
  }

  async installApiKeys() {
    return new Promise((resolve, reject) => {
      _eImzoClient.EIMZOClient.installApiKeys(resolve, reject);
    });
  }
  /**
   * @return {Promise<Cert[]>}
   */


  async listAllUserKeys() {
    return new Promise((resolve, reject) => {
      _eImzoClient.EIMZOClient.listAllUserKeys(function (cert, index) {
        return "cert-" + cert.serialNumber + "-" + index;
      }, function (index, cert) {
        return cert;
      }, function (items, firstId) {
        resolve(items, firstId);
      }, function (error, reason) {
        reject(error, reason);
      });
    });
  }
  /**
   * @param {Cert} cert
   * @return {Promise<LoadKeyResult>}
   */


  async loadKey(cert) {
    return new Promise((resolve, reject) => {
      _eImzoClient.EIMZOClient.loadKey(cert, id => {
        this._loadedKey = cert;
        resolve({
          cert,
          id
        });
      }, reject);
    });
  }
  /**
   * @param {string} loadKeyId
   * @return {Promise<string[]>}
   */


  async getCertificateChain(loadKeyId) {
    return new Promise((resolve, reject) => {
      CAPIWS.callFunction({
        plugin: "x509",
        name: "get_certificate_chain",
        arguments: [loadKeyId]
      }, (event, data) => {
        if (data.success) {
          resolve(data.certificates);
        } else {
          reject("Failed");
        }
      }, reject);
    });
  }
  /**
   * @param {string} loadKeyId
   * @return {Promise<?string>}
   */


  async getMainCertificate(loadKeyId) {
    let result = await this.getCertificateChain(loadKeyId);

    if (Array.isArray(result) && result.length > 0) {
      return result[0];
    }

    return null;
  }
  /**
   * @param {string} cert
   * @return {Promise<void>}
   */


  async getCertInfo(cert) {
    return new Promise((resolve, reject) => {
      CAPIWS.callFunction({
        name: "get_certificate_info",
        arguments: [cert]
      }, (event, data) => {
        if (data.success) {
          resolve(data.certificate_info);
        } else {
          reject("Failed");
        }
      }, reject);
    });
  }
  /**
   * @param {Cert} cert
   * @param {string} content
   * @return {Promise<SignPkcs7Result>}
   */


  async signPkcs7(cert, content) {
    let loadKeyResult = await this.loadKey(cert);
    return new Promise((resolve, reject) => {
      CAPIWS.callFunction({
        name: "create_pkcs7",
        plugin: "pkcs7",
        arguments: [window.Base64.encode(content), loadKeyResult.id, "no"]
      }, (event, data) => {
        if (data.success) {
          resolve(data);
        } else {
          reject("Failed");
        }
      }, reject);
    });
  }
  /**
   * @param {string} id of loaded cert
   * @param {string} content
   * @param {?Function} timestamper - function to get timestamp data from server
   * @return {Promise<SignPkcs7Result>}
   */


  async createPkcs7(id, content, timestamper) {
    return new Promise((resolve, reject) => {
      _eImzoClient.EIMZOClient.createPkcs7(id, content, timestamper, (
      /* string */
      pkcs7) => {
        resolve(pkcs7);
      }, reject);
    });
  }
  /**
   * @param {string} signature
   *
   * @return {Promise<string>}
   */


  async getTimestampToken(signature) {
    return new Promise((resolve, reject) => {
      CAPIWS.callFunction({
        name: "get_timestamp_token_request_for_signature",
        arguments: [signature]
      }, function (event, data) {
        if (data.success) {
          resolve(data.timestamp_request_64);
        } else {
          reject("Failed");
        }
      }, reject);
    });
  }
  /**
   * @param {string} domain
   * @param {string} key
   */


  addApiKey(domain, key) {
    if (!this.apiKeys.includes(domain)) {
      this.apiKeys.push(domain, key);
    }
  }

  async install() {
    await this.checkVersion();
    _eImzoClient.EIMZOClient.API_KEYS = this.apiKeys;
    await this.installApiKeys();
  }

}

exports.default = EIMZO;