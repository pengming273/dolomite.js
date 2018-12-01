import WSConnection from './WSConnection';

/*
 * 
 */
export default class WSMockedConnection extends WSConnection {
  constructor({ getMocks }) {
    super(null);
    this.getMocks = getMocks;
    this.startMocking();
  }

  get mocks() { return this.getMocks() }

  findMock(route, action) {
    const routeLevel = this.mocks[route];
    if (routeLevel) {
      const actionLevel = routeLevel[action];
      if (actionLevel) return actionLevel;
    }
    return {};
  }

  mock(route, action, givenData = null) {
    let data = givenData;
    if (!data) {
      const mock = this.findMock(route, action);
      if (mock.down) data = mock.down();
    }

    if (this.subscribers[route] && this.subscribers[route][action] && !!data)
      this.subscribers[route][action].forEach(callback => setTimeout(() => callback(data), 0))
  }

  mockAll() {
    Object.keys(this.mocks).forEach(route => {
      Object.keys(this.mocks[route]).forEach(action => {
        this.mock(route, action);
      })
    })
  }

  startMocking() {
    setTimeout(() => this.mockAll(), 100)
    this.interval = setInterval(() => this.mockAll(), 10000);
  }

  // Overridden
  disconnect() {
    if (this.interval) clearInterval(this.interval);
  }

  // Overridden
  isConnected() {
    return true;
  }

  // Overridden
  send(route, action, payload) {
    return new Promise((resolve, reject) => {
      const mock = this.findMock(route, action);
      if (!mock.up) reject(new Error('Mocks not implemented'))
      else {
        setTimeout(() => {
          mock.up(payload, (route, action, data) => this.mock(route, action, data));
        }, 300);
        resolve(null);
      }
    });
  }
}
