
export default class Package {
  constructor({ url, websocketUrl, services }) {
    const serviceNames = Object.keys(services);
    serviceNames.forEach(name => { 
      const ServiceType = services[name];
      this[name] = new ServiceType(url);
    });
    this.services = serviceNames.map(name => this[name]);
  }

  configure({ apiKey, mockDelay, shouldMock }) {
    if (apiKey) 
      this.services.forEach(service => service.configure(apiKey));
    else if (mockDelay != null || shouldMock != null)
      this.services.forEach(service => service.configureOptions({ mockDelay, shouldMock }));
  }
}
