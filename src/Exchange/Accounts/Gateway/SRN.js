
class SRN {
  constructor({ type, identifier }) {
    this.type = type;
    this.identifier = identifier;
  }
}

SRN.Type = {
  PAYMENT_METHOD: 'PAYMENT_METHOD',
  ETHEREUM_ADDRESS: 'ETHEREUM_ADDRESS',
};

export default SRN;
