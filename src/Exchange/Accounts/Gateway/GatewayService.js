import AuthService from '../../../common/AuthService';

import PaymentMethod from './PaymentMethod';
import FiatTransfer from './FiatTransfer';
import SRN from './SRN';

export default class VerificationService extends AuthService {

  static routes = {
    paymentMethods: {
      get: '/v1/accounts/:account_id/payment-methods'
    },
    transferHistory: {
      get: '/v1/accounts/:account_id/transfers'
    },
    transferPreview: {
      post: '/v1/accounts/:account_id/transfers/deposits/preview'
    },
  };

  static exports = {
    PaymentMethod,
    FiatTransfer,
    SRN,
  };

  /////////////////////////
  
  // ----------------------------------------------
  // Payment Methods

  getPaymentMethods(accountId) {
    return this.requiresAuth.get('paymentMethods', { account_id: accountId })
      .then(body => PaymentMethod.build(body.data));
  }

  // ----------------------------------------------
  // Fiat Transfers

  getTransferHistory(accountId) {
    return this.requiresAuth.get('transferHistory', { account_id: accountId })
      .then(body => FiatTransfer.build(body.data));
  }

  getDepositPreview({ accountId, address, amount, paymentMethodId, depositTicker }) {
    return this.requiresAuth.post('transferPreview', {
      account_id: accountId,
      amount: amount,
      amount_ticker: 'USD',
      wallet_address: address,
      payment_method_id: paymentMethodId,
      deposit_asset_ticker: depositTicker
    }).then(body => new FiatTransfer(body.data));
  }
}
