import Token from '../../../Exchange/Tokens/Token';

export default class MockToken {
  static get All() {
    return {
      ETH: {
        ticker: 'ETH',
        name: {
          singular: 'Ethereum',
          plural: null
        },
        identifier: null,
        precision: 18,
        display_precision: 5,
        token_type: Token.Type.ETH,
        description: ``,
        image_url: null,
        thumbnail_url: null,
        date_added: 1528675200000
      },
      WETH: {
        ticker: 'WETH',
        name: {
          singular: 'Wrapped Ethereum',
          plural: null
        },
        identifier: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        precision: 18,
        display_precision: 5,
        token_type: Token.Type.ERC20,
        description: `Converts Ether into an ERC20 Compliant Token.`,
        image_url: null,
        thumbnail_url: null,
        date_added: 1528675200000
      },
      LRC: {
        ticker: 'LRC',
        name: {
          singular: 'Loopring',
          plural: null
        },
        identifier: '0xEF68e7C694F40c8202821eDF525dE3782458639f',
        precision: 18,
        display_precision: 5,
        token_type: Token.Type.ERC20,
        description: `Loopring is not only a protocol but also a decentralized automated execution system that trades across the crypto-token exchanges.`,
        image_url: null,
        thumbnail_url: null,
        date_added: 1528675200000
      },
      APPC: {
        ticker: 'APPC',
        name: {
          singular: 'AppCoin',
          plural: null
        },
        identifier: '0x1a7a8bd9106f2b8d977e08582dc7d24c723ab0db',
        precision: 18,
        display_precision: 5,
        token_type: Token.Type.ERC20,
        description: `AppCoins is meant for use in the AppCoins blockchain platform to perform transactions in the app store ecosystem.`,
        image_url: null,
        thumbnail_url: null,
        date_added: 1528675200000
      },
      BAT: {
        ticker: 'BAT',
        name: {
          singular: 'Basic Attention Token',
          plural: null
        },
        identifier: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
        precision: 18,
        display_precision: 5,
        token_type: Token.Type.ERC20,
        description: `The Basic Attention Token is the new token for the digital advertising industry`,
        image_url: null,
        thumbnail_url: null,
        date_added: 1528675200000
      },
      BNB: {
        ticker: 'BNB',
        name: {
          singular: 'Binance Token',
          plural: null
        },
        identifier: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
        precision: 18,
        display_precision: 5,
        token_type: Token.Type.ERC20,
        description: `Binance aims to build a world-class crypto exchange, powering the future of crypto finance.`,
        image_url: null,
        thumbnail_url: null,
        date_added: 1528675200000
      },
      OMG: {
        ticker: 'OMG',
        name: {
          singular: 'OmiseGo',
          plural: null
        },
        identifier: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
        precision: 18,
        display_precision: 5,
        token_type: Token.Type.ERC20,
        description: `OmiseGO (OMG) is a public Ethereum-based financial technology for use in mainstream digital wallets`,
        image_url: null,
        thumbnail_url: null,
        date_added: 1528675200000
      },
      MKR: {
        ticker: 'MKR',
        name: {
          singular: 'Maker',
          plural: null
        },
        identifier: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        precision: 18,
        display_precision: 5,
        token_type: Token.Type.ERC20,
        description: `Maker is a Decentralized Autonomous Organization that creates and insures the dai stablecoin on the Ethereum blockchain`,
        image_url: null,
        thumbnail_url: null,
        date_added: 1528675200000
      },
      WTC: {
        ticker: 'WTC',
        name: {
          singular: 'Walton Chain',
          plural: null
        },
        identifier: '0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74',
        precision: 18,
        display_precision: 5,
        token_type: Token.Type.ERC20,
        description: `Value Internet of Things (VIoT) constructs a perfect commercial ecosystem via the integration of the real world and the blockchain.`,
        image_url: null,
        thumbnail_url: null,
        date_added: 1528675200000
      },
    };
  }
}
