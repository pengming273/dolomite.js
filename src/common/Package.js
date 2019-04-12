import WSManager from './websockets/WSManager';
import WSConnection from './websockets/WSConnection';

export default class Package {
  constructor({ url, websocketUrl, services }) {
    this.url = url;
    this.wsUrl = websocketUrl;
    this.wsManager = new WSManager();

    this.services = this.setupServicesFor((k, v) => this[k] = v, services);
    this.serviceTypes = Object.keys(services).map(name => services[name]);
  }

  setupServicesFor(setParent, services) {
    let allServices = [];

    Object.keys(services).forEach(serviceName => {
      const ServiceType = services[serviceName];
      const service = new ServiceType(this.url, () => this.wsManager, ServiceType.routes);
      
      const subServices = ServiceType.services || [];
      this.setupServicesFor((k, v) => service[k] = v, subServices).forEach(s => allServices.push(s));
      setParent(serviceName, service);
      allServices.push(service);
    });

    return allServices;
  }

  configure({ apiKey, getAuthToken }) {
    this.getAuthToken = getAuthToken || (() => Promise.reject('getAuthToken not defined on package'));

    this.services.forEach(service => {
      service.configure(apiKey);
      service.getAuthToken = this.getAuthToken;
    });
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
