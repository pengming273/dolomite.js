import Service from '../../common/Service';

import Order from './Order';
import DepthChart from './DepthChart';
import OrderFill from './OrderFill';

export default class OrderService extends Service {

  static routes = {
    orders: {
      get: '/v1/orders/markets/:pair',
      post: '/v1/orders/create'
    },
    orderFills: {
      get: '/v1/orders/markets/:pair/fills',
    },
    depth: {
      get: '/v1/orders/markets/:pair/depth/merged'
    },
    dependentOrders: {
      post: '/v1/orders/create/after-tx'
    },
    cancelOrders: {
      post: '/v1/orders/:dolomite_order_id_param/cancel'
    },
    prepareOrders: {
      post: '/v1/orders/prepare'
    }
  };

  static exports = {
    Order,
    OrderDepthChart: DepthChart,
    OrderFill
  };

  /////////////////////////

  // ----------------------------------------------
  // Order Management

  prepareOrder(order) {
    return this.post('prepareOrders', order);
  }

  createOrder(order) {
    return this.post('orders', order)
  }

  // Send up transaction hash which the order depends on
  // - Order won't be submitted until transaction is confirmed
  createDependentOrder(order) {
    return this.post('dependentOrders', order)
  }

  cancelOrder({ orderHash, dolomiteOrderId, owner, v, r, s, timestamp }) {
    return this.post('cancelOrders', {
      dolomite_order_id_param: dolomiteOrderId,
      owner_address: owner, 
      ecdsa_signature: { v, r, s },
      timestamp: timestamp
    });
  }

  // ----------------------------------------------
  // Market Depth Chart

  getDepthChart(primaryTicker, secondaryTicker) {
    const pair = `${primaryTicker}-${secondaryTicker}`;
    return this.get('depth', { pair })
      .then(body => DepthChart.build(body.data));
  }

  watchDepthChart(market) {
    return this.send('/v1/orders/markets/-market-/depth/merged', 'subscribe', {
      market: market
    });
  }

  onDepthChartUpdate(callback) {
    this.on('/v1/orders/markets/-market-/depth/merged', 'update')
      .build(data => DepthChart.build(data))
      .then(callback);
  }

  // ----------------------------------------------
  // Order Fills

  getFills(primaryTicker, secondaryTicker, { status, side, type, page, pageSize }) {
    return this.get('orderFills', { 
      pair: `${primaryTicker}-${secondaryTicker}`,
      status,
      side,
      type,
      page,
      page_size: pageSize
    }).then(body => OrderFill.build(body.data));
  }

  watchFills(market) {
    return this.send('/v1/orders/markets/-market-/fills', 'subscribe', {
      market: market
    });
  }

  onFillsUpdate(callback) {
    this.on('/v1/orders/markets/-market-/fills', 'update')
      .build(data => OrderFill.build(data))
      .then(callback);
  }
}
