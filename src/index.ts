const BroadcastChannel = typeof window !== 'undefined' ? window.BroadcastChannel : null;

class MemoryState {
  private static instance: MemoryState | null = null;
  private state: { [key: string]: any } = {};
  private listeners: { [key: string]: Array<(value: any) => void> } = {};
  private channel: BroadcastChannel | null = null;

  private constructor() {
    this.channel = BroadcastChannel ? new BroadcastChannel('memory-state-channel') : null;

    if (this.channel) {
      this.channel.addEventListener('message', (event) => {
        const { key, value, persist } = event.data;
        this.setState(key, value, persist);
      });
    }

    // Load persisted state from localStorage on initialization
    const persistedState = localStorage.getItem('memory-state');
    if (persistedState) {
      this.state = JSON.parse(persistedState);
    }
  }

  public static getInstance(): MemoryState {
    if (!MemoryState.instance) {
      MemoryState.instance = new MemoryState();
    }
    return MemoryState.instance;
  }

  public setState(key: string, value: any, persist: boolean = false) {
    this.state[key] = value;
    if (this.channel) {
      this.channel.postMessage({ key, value, persist });
    }
    if (this.listeners[key]) {
      this.listeners[key].forEach((callback) => callback(value));
    }
    if (persist) {
      localStorage.setItem('memory-state', JSON.stringify(this.state));
    }
  }

  public getState(key: string) {
    return this.state[key] || null;
  }

  public clearState(key: string) {
    delete this.state[key];
    if (this.listeners[key]) {
      this.listeners[key].forEach((callback) => callback(null));
    }
    localStorage.setItem('memory-state', JSON.stringify(this.state));
  }

  public clearAll() {
    this.state = {};
    Object.keys(this.listeners).forEach((key) => {
      this.listeners[key].forEach((callback) => callback(null));
    });
    localStorage.removeItem('memory-state');
  }

  // Subscribe to state changes for a specific key
  public subscribe(key: string, callback: (value: any) => void): () => void {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);

    // Return unsubscribe function
    return () => {
      if (this.listeners[key]) {
        this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
      }
    };
  }

  // Syntax-friendly subscribe method
  public on(key: string, callback: (value: any) => void): () => void {
    return this.subscribe(key, callback);
  }
}

const memoryState = MemoryState.getInstance();
Object.freeze(memoryState);

export default memoryState;
