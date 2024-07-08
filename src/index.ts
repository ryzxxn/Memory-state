const BroadcastChannel = typeof window !== 'undefined' ? window.BroadcastChannel : null;

class MemoryState {
  private static instance: MemoryState | null;
  private state: { [key: string]: any };
  private listeners: { [key: string]: Array<(value: any) => void> };
  private channel: BroadcastChannel | null;

  constructor() {
    if (!MemoryState.instance) {
      this.state = {};
      this.listeners = {};
      this.channel = BroadcastChannel ? new BroadcastChannel('memory-state-channel') : null;
      if (this.channel) {
        this.channel.addEventListener('message', (event) => {
          const { key, value } = event.data;
          this.setState(key, value);
        });
      }
      MemoryState.instance = this;
    }
    return MemoryState.instance;
  }

  setState(key: string, value: any) {
    this.state[key] = value;
    if (this.channel) {
      this.channel.postMessage({ key, value });
    }
    if (this.listeners[key]) {
      this.listeners[key].forEach((callback) => callback(value));
    }
  }

  getState(key: string) {
    return this.state[key] || null;
  }

  clearState(key: string) {
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
}

const memoryState = new MemoryState();
Object.freeze(memoryState);

export default memoryState;
