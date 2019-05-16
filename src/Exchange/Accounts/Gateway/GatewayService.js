import AuthService from '../../../common/AuthService';

import PaymentMethod from './PaymentMethod';

export default class VerificationService extends AuthService {

  static routes = {
    paymentMethods: {
      get: '/v1/accounts/:account_id/gateway/payment-methods'
    },
  };

  static exports = {
    PaymentMethod,
    // FiatTransfer
  };

  /////////////////////////
  
  // ----------------------------------------------
  // Payment Methods

  getPaymentMethods(accountId) {
    return this.requiresAuth.get('paymentMethods', { account_id: accountId })
      .then(body => PaymentMethod.build(body.data));
  }
}
