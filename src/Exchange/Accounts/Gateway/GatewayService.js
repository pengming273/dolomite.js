import AuthService from '../../../common/AuthService';

import PaymentMethod from './PaymentMethod';
import FiatTransfer from './FiatTransfer';
import FiatTransferLimit from './FiatTransferLimit';
import SRN from './SRN';

export default class VerificationService extends AuthService {

  static routes = {
    paymentMethods: {
      get: '/v1/accounts/:account_id/payment-methods'
    },
    transferHistory: {
      get: '/v1/accounts/:account_id/transfers'
    },
    depositPreview: {
      post: '/v1/accounts/:account_id/transfers/deposits/preview'
    },
    withdrawalPreview: {
      post: '/v1/accounts/:account_id/transfers/withdraws/preview'
    }
  };

  static exports = {
    PaymentMethod,
    FiatTransfer,
    FiatTransferLimit,
    SRN,
  };

  /////////////////////////
  
  // ----------------------------------------------
  // Payment Methods

  getPaymentMethods(accountId) {
    return this.requiresAuth.get('paymentMethods', { account_id: accountId })
      .then(body => PaymentMethod.build(body.data));
  }

  getLimits(accountId) {
    // TODO: replace with actual network call
    return new Promise((resolve, _) => {
      resolve(FiatTransferLimit.HARD_CODED);
    });
  }

  // ----------------------------------------------
  // Fiat Transfers

  getTransferHistory(accountId) {
    return this.requiresAuth.get('transferHistory', { account_id: accountId })
      .then(body => FiatTransfer.build(body.data.transfers));
  }

  getDepositPreview({ accountId, address, amount, paymentMethodId, depositTicker }) {
    return this.requiresAuth.post('depositPreview', {
      account_id: accountId,
      amount: amount,
      amount_ticker: 'USD',
      wallet_address: address,
      payment_method_id: paymentMethodId,
      deposit_asset_ticker: depositTicker
    }).then(body => new FiatTransfer(body.data));
  }

  getWithdrawalPreview({ accountId, address, amount, paymentMethodId, withdrawalTicker }) {
    return this.requiresAuth.post('withdrawalPreview', {
      account_id: accountId,
      amount_ticker: withdrawalTicker,
      amount: amount,
      wallet_address: address,
      payment_method_id: paymentMethodId,
      destination_ticker: 'USD'
    }).then(body => new FiatTransfer(body.data));
  }
}
