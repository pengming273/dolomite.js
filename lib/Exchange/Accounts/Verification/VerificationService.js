"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AuthService2 = _interopRequireDefault(require("../../../common/AuthService"));

var _Account = _interopRequireDefault(require("../Account"));

var _AuthToken = _interopRequireDefault(require("./AuthToken"));

var _SignatureData = _interopRequireDefault(require("./SignatureData"));

var _PrepareMessage = _interopRequireDefault(require("./PrepareMessage"));

var _CountryRegions = _interopRequireDefault(require("./res/CountryRegions"));

var _PhoneCountryCodes = _interopRequireDefault(require("./res/PhoneCountryCodes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VerificationService =
/*#__PURE__*/
function (_AuthService) {
  _inherits(VerificationService, _AuthService);

  function VerificationService() {
    _classCallCheck(this, VerificationService);

    return _possibleConstructorReturn(this, _getPrototypeOf(VerificationService).apply(this, arguments));
  }

  _createClass(VerificationService, [{
    key: "prepareUpgradeToTier2",
    /////////////////////////
    // ----------------------------------------------
    // Tier 2 Upgrade
    value: function prepareUpgradeToTier2(_ref) {
      var address = _ref.address,
          accountId = _ref.accountId;
      return this.prepare('tier2', {
        address: address,
        account_id: accountId
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
  }, {
    key: "upgradeToTier2",
    value: function upgradeToTier2(_ref2) {
      var accountId = _ref2.accountId,
          phoneNumber = _ref2.phoneNumber,
          extensionNumber = _ref2.extensionNumber,
          verificationCode = _ref2.verificationCode,
          phoneVerificationSignature = _ref2.phoneVerificationSignature,
          streetAddress = _ref2.streetAddress,
          secondaryStreetAddress = _ref2.secondaryStreetAddress,
          city = _ref2.city,
          zip = _ref2.zip,
          stateCode = _ref2.stateCode,
          countryCode = _ref2.countryCode,
          signature = _ref2.signature,
          prepareId = _ref2.prepareId;
      return this.post('tier2', {
        account_id: accountId,
        phone_verification_signature: phoneVerificationSignature,
        phone_number: phoneNumber,
        extension_number: parseInt(extensionNumber),
        phone_code: verificationCode,
        primary_street_address: streetAddress,
        secondary_street_address: secondaryStreetAddress,
        city: city,
        state_code: stateCode,
        postal_code: zip,
        country_code: countryCode,
        auth_signature: signature,
        prepare_id: prepareId
      });
    } // ----------------------------------------------
    // Tier 3 Upgrade

  }, {
    key: "prepareUpgradeToTier3",
    value: function prepareUpgradeToTier3(_ref3) {
      var address = _ref3.address,
          accountId = _ref3.accountId;
      return this.prepare('tier3', {
        address: address,
        account_id: accountId
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
  }, {
    key: "upgradeToTier3",
    value: function upgradeToTier3(_ref4) {
      var accountId = _ref4.accountId,
          ssn = _ref4.ssn,
          signature = _ref4.signature,
          prepareId = _ref4.prepareId;
      return this.post('tier3', {
        account_id: accountId,
        social_security_number: ssn,
        auth_signature: signature,
        prepare_id: prepareId
      });
    } // ----------------------------------------------
    // Tier 3 Upgrade

  }, {
    key: "prepareUpgradeToTier4",
    value: function prepareUpgradeToTier4(_ref5) {
      var address = _ref5.address,
          accountId = _ref5.accountId;
      return this.prepare('tier4', {
        address: address,
        account_id: accountId
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
    /*
     * Unlike other routes that require a user signature, this one needs it "flattened",
     * as in not as { v, r, s } but as a single hexadecimal (0x...). This is because this
     * route uses multipart form data, and that does not support nested params
     */

  }, {
    key: "upgradeToTier4",
    value: function upgradeToTier4(_ref6) {
      var accountId = _ref6.accountId,
          plaidToken = _ref6.plaidToken,
          primaryImage = _ref6.primaryImage,
          secondaryImage = _ref6.secondaryImage,
          flatSignature = _ref6.flatSignature,
          prepareId = _ref6.prepareId;
      return this.formDataRequest('post', 'tier4', {
        account_id: accountId,
        plaid_public_token: plaidToken,
        primary_identification_document: primaryImage,
        secondary_identification_document: secondaryImage,
        flattened_auth_signature: flatSignature,
        prepare_id: prepareId
      });
    } // ----------------------------------------------
    // Phone Verification

  }, {
    key: "verifyPhoneNumber",
    value: function verifyPhoneNumber(_ref7) {
      var phoneNumber = _ref7.phoneNumber,
          extensionNumber = _ref7.extensionNumber;
      return this.post('verifyPhone', {
        phone_number: phoneNumber,
        extension_number: parseInt(extensionNumber)
      }).then(function (body) {
        return body.data;
      });
    }
  }, {
    key: "verifyPhoneNumberCode",
    value: function verifyPhoneNumberCode(_ref8) {
      var phoneNumber = _ref8.phoneNumber,
          extensionNumber = _ref8.extensionNumber,
          verificationCode = _ref8.verificationCode;
      return this.post('verifyPhoneCode', {
        phone_number: phoneNumber,
        extension_number: parseInt(extensionNumber),
        code: verificationCode
      }).then(function (body) {
        return body.data;
      });
    } // ----------------------------------------------
    // Change Email

  }, {
    key: "prepareChangeEmail",
    value: function prepareChangeEmail(_ref9) {
      var address = _ref9.address,
          accountId = _ref9.accountId;
      return this.prepare('changeEmail', {
        address: address,
        account_id: accountId
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
  }, {
    key: "changeEmail",
    value: function changeEmail(_ref10) {
      var address = _ref10.address,
          accountId = _ref10.accountId,
          email = _ref10.email,
          signature = _ref10.signature,
          prepareId = _ref10.prepareId;
      return this.post('changeEmail', {
        account_id: accountId,
        email: email,
        auth_signature: signature,
        prepare_id: prepareId
      });
    } // ----------------------------------------------
    // Resend Email

  }, {
    key: "resendVerificationEmail",
    value: function resendVerificationEmail(_ref11) {
      var address = _ref11.address,
          accountId = _ref11.accountId;
      return this.requiresAuth.post('resendEmail', {
        wallet_address: address,
        account_id: accountId
      });
    }
  }]);

  return VerificationService;
}(_AuthService2["default"]);

exports["default"] = VerificationService;

_defineProperty(VerificationService, "routes", {
  verifyPhone: {
    post: '/v1/accounts/verify-phone'
  },
  verifyPhoneCode: {
    post: '/v1/accounts/verify-phone/:code'
  },
  tier2: {
    post: '/v1/accounts/:account_id/upgrade/tier2',
    prepare: '/v1/accounts/:account_id/upgrade/tier2/prepare/:address'
  },
  tier3: {
    post: '/v1/accounts/:account_id/upgrade/tier3',
    prepare: '/v1/accounts/:account_id/upgrade/tier3/prepare/:address'
  },
  tier4: {
    post: '/v1/accounts/:account_id/upgrade/tier4',
    prepare: '/v1/accounts/:account_id/upgrade/tier4/prepare/:address'
  },
  resendEmail: {
    post: '/v1/accounts/:account_id/verify-email/resend'
  },
  changeEmail: {
    post: '/v1/accounts/:account_id/change-email',
    prepare: '/v1/accounts/:account_id/change-email/prepare/:address'
  }
});

_defineProperty(VerificationService, "exports", {
  AuthToken: _AuthToken["default"],
  PHONE_COUNTRY_CODES: _PhoneCountryCodes["default"],
  COUNTRY_REGIONS: _CountryRegions["default"]
});