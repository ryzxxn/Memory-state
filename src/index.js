class MemoryState {
    constructor() {
      if (!MemoryState.instance) {
        this.state = {};
        MemoryState.instance = this;
      }
      return MemoryState.instance;
    }
  
    setState(key, value) {
      this.state[key] = value;
    }
  
    getState(key) {
      return this.state[key] || null;
    }
  
    clearState(key) {
      delete this.state[key];
    }
  
    clearAll() {
      this.state = {};
    }
  }
  
  const instance = new MemoryState();
  Object.freeze(instance);
  
  
  // Export for ES Modules (Browsers, React)
  if (typeof exports !== 'undefined') {
    exports.default = instance;
  }
  