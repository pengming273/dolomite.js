import WSManager from './websockets/WSManager';
import WSConnection from './websockets/WSConnection';

export default class Package {
  constructor({ url, websocketUrl, services }) {
    this.url = url;
    this.wsUrl = websocketUrl;
    this.wsManager = new WSManager();

    Object.keys(services).forEach(name => { 
      const ServiceType = services[name];
      this[name] = new ServiceType(url, () => this.wsManager, ServiceType.routes);
    });

    this.serviceTypes = Object.keys(services).map(name => services[name]);
    this.services = Object.keys(services).map(name => this[name]);
  }

  configure({ apiKey }) {
    this.services.forEach(service => service.configure(apiKey));
  }

  connectToWebsocket() {
    const connection = new WSConnection(this.wsUrl);
    
    return connection.establish()
      .then((data) => {
        this.wsManager.setConnection(connection);
        return data;
      }).catch(error => {
        this.wsManager.disconnect();
        throw error;
      });
  }

  onReconnect(callback) {
    this.wsManager && this.wsManager.onReconnect(callback);
  }

  get isConnected() {
    return this.wsManager ? this.wsManager.isConnected() : false;
  }

  get exports() {
    let classes = {};

    this.serviceTypes.forEach(ServiceType => {
      classes = {
        ...classes,
        ...(ServiceType.exports || {})
      };
    });

    return classes;
  }
}
