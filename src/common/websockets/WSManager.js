import WSConnection from './WSMockedConnection';
import WSMockedConnection from './WSMockedConnection';

/*
 * 
 */
export default class WSManager {
  constructor() {
    this.mocks = {};
    this.connection = WSConnection.none;
  }

  mock() {
    this.setConnection(new WSMockedConnection({
      getMocks: () => this.mocks
    }));
  }

  registerMocks(mocks) {
    Object.keys(mocks).forEach(route => {
      if (!this.mocks[route]) this.mocks[route] = mocks[route];
      else Object.keys(mocks[route]).forEach(action => {
        this.mocks[route][action] = mocks[route][action];
      });
    })
  }

  onReconnect(callback) {
    this.connection.onReconnect(callback);
  }

  subscribe(route, action, callback) {
    this.connection.subscribe(route, action, callback);
  }

  send(route, action, payload) {
    return this.connection.send(route, action, payload);
  }

  setConnection(connection) {
    const previousConnection = this.connection;
    previousConnection.disconnect();
    connection.addSubscriptions(previousConnection.getSubscriptions());
    this.connection = connection;
  }

  disconnect() {
    this.connection.disconnect();
    this.connection = WSConnection.none;
  }

  isConnected() {
    const conn = this.connection || { isConnected: () => false };
    return conn.isConnected() || false;
  }
}
