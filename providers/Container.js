class Container {
  constructor() {
    this.bindings = {};
    this.singletons = {};
  }

  bind(name, factory) {
    this.bindings[name] = factory;
  }

  singleton(name, factory) {
    this.singletons[name] = factory();
  }

  make(name) {
    if (this.singletons[name]) return this.singletons[name];
    const factory = this.bindings[name];
    if (!factory) throw new Error(`Service '${name}' not bound.`);
    return factory();
  }
}

module.exports = new Container();
