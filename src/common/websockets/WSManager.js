import WSConnection from './WSMockedConnection';
import WSMockedConnection from './WSMockedConnection';

/*
 * 
 */
export default class WSManager {

  static registerMocks(mocks) {
    Object.keys(mocks).forEach(route => {
      if (!WSManager.mocks[route]) WSManager.mocks[route] = mocks[route];
      else Object.keys(mocks[route]).forEach(action => {
        WSManager.mocks[route][action] = mocks[route][action];
      });
    })
  }

  static subscribe(route, action, callback) {
    WSManager.connection.subscribe(route, action, callback);
  }

  static send(route, action, payload) {
    return WSManager.connection.send(route, action, payload);
  }

  static setConnection(connection) {
    const previousConnection = WSManager.connection;
    previousConnection.disconnect();
    connection.addSubscriptions(previousConnection.getSubscriptions());
    WSManager.connection = connection;
  }

  static disconnect() {
    WSManager.connection.disconnect();
    WSManager.connection = WSConnection.interface;
  }
}

WSManager.mocks = {};
WSManager.connection = new WSMockedConnection({
  getMocks: () => WSManager.mocks
});
