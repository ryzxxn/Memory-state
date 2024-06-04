const BroadcastChannel = typeof window !== 'undefined' ? window.BroadcastChannel : null;

class MemoryState {
  constructor() {
    if (!MemoryState.instance) {
      this.state = {};
      this.listeners = {};
      if (BroadcastChannel) {
        this.channel = new BroadcastChannel('memory-state-channel');
        this.channel.addEventListener('message', (event) => {
          const { key, value } = event.data;
          this.setState(key, value);
        });
      }
      MemoryState.instance = this;
    }
    return MemoryState.instance;
  }

  setState(key, value) {
    this.state[key] = value;
    if (this.channel) {
      this.channel.postMessage({ key, value });
    }
    if (this.listeners[key]) {
      this.listeners[key].forEach((callback) => callback(value));
    }
  }

  getState(key) {
    return this.state[key] || null;
  }

  clearState(key) {
    delete this.state[key];
    if (this.listeners[key]) {
      this.listeners[key].forEach((callback) => callback(null));
    }
  }

  clearAll() {
    this.state = {};
    Object.keys(this.listeners).forEach((key) => {
      this.listeners[key].forEach((callback) => callback(null));
    });
  }

  onChange(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
    return () => {
      this.listeners[key] = this.listeners[key].filter((cb) => cb !== callback);
    };
  }
}

const memoryState = new MemoryState();
Object.freeze(memoryState);

export default memoryState;
