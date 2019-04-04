import Service from '../../../common/Service';

import Account from '../Account';
import AuthToken from './AuthToken';
import SignatureData from './SignatureData';
import PrepareMessage from './PrepareMessage';

import CountryRegions from './res/CountryRegions';
import PhoneCountryCodes from './res/PhoneCountryCodes';

export default class VerificationService extends Service {

  static routes = {
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
    resendEmail: {
      post: '/v1/accounts/:account_id/verify-email/resend'
    },
    changeEmail: {
      post: '/v1/accounts/:account_id/change-email',
      prepare: '/v1/accounts/:account_id/change-email/prepare/:address',
    }
  };

  static exports = {
    AuthToken,
    PHONE_COUNTRY_CODES: PhoneCountryCodes,
    COUNTRY_REGIONS: CountryRegions
  };

  /////////////////////////
  
  // ----------------------------------------------
  // Tier 2 Upgrade

  prepareUpgradeToTier2({ address, accountId }) {
    return this.prepare('tier2', { address, account_id: accountId })
      .then(body => new PrepareMessage(body.data));
  }

  upgradeToTier2({ address, accountId, phoneNumber, extensionNumber, verificationCode, phoneVerificationSignature,
    streetAddress, secondaryStreetAddress, city, zip, stateCode, countryCode, signature, prepareId }) {

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
      prepare_id: prepareId,
    });
  }

  // ----------------------------------------------
  // Tier 3 Upgrade

  prepareUpgradeToTier3({ address, accountId }) {
    return this.prepare('tier3', { address, account_id: accountId })
      .then(body => new PrepareMessage(body.data));
  }

  upgradeToTier3({ address, accountId, ssn, signature, prepareId }) {
    return this.post('tier3', {
      account_id: accountId,
      social_security_number: ssn,
      auth_signature: signature,
      prepare_id: prepareId,
    });
  }

  // ----------------------------------------------
  // Phone Verification

  verifyPhoneNumber({ phoneNumber, extensionNumber }) {
    return this.post('verifyPhone', {
      phone_number: phoneNumber,
      extension_number: parseInt(extensionNumber)
    }).then((body) => body.data)
  }

  verifyPhoneNumberCode({ phoneNumber, extensionNumber, verificationCode }) {
    return this.post('verifyPhoneCode', {
      phone_number: phoneNumber,
      extension_number: parseInt(extensionNumber),
      code: verificationCode
    }).then(body => body.data);
  }

  // ----------------------------------------------
  // Change Email

  prepareChangeEmail({ address, accountId }) {
    return this.prepare('changeEmail', { address, account_id: accountId })
      .then(body => new PrepareMessage(body.data));
  }

  changeEmail({ address, accountId, email, signature, prepareId }) {
    return this.post('changeEmail', {
      account_id: accountId,
      email: email,
      auth_signature: signature,
      prepare_id: prepareId,
    });
  }

  // ----------------------------------------------
  // Resend Email

  resendVerificationEmail({ address, timestamp, signature, accountId }) {
    return this.post('resendEmail', { 
      wallet_address: address,
      timestamp: timestamp,
      auth_signature: signature,
      account_id: accountId
    })
  }

}
