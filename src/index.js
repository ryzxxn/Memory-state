const BroadcastChannel = typeof window !== 'undefined' ? window.BroadcastChannel : null;
class MemoryState {
    constructor() {
        this.state = {};
        this.listeners = {};
        this.channel = null;
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
    static getInstance() {
        if (!MemoryState.instance) {
            MemoryState.instance = new MemoryState();
        }
        return MemoryState.instance;
    }
    setState(key, value, persist = false) {
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
    getState(key) {
        return this.state[key] || null;
    }
    clearState(key) {
        delete this.state[key];
        if (this.listeners[key]) {
            this.listeners[key].forEach((callback) => callback(null));
        }
        localStorage.setItem('memory-state', JSON.stringify(this.state));
    }
    clearAll() {
        this.state = {};
        Object.keys(this.listeners).forEach((key) => {
            this.listeners[key].forEach((callback) => callback(null));
        });
        localStorage.removeItem('memory-state');
    }
    // Subscribe to state changes for a specific key
    subscribe(key, callback) {
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
    on(key, callback) {
        return this.subscribe(key, callback);
    }
}
MemoryState.instance = null;
const memoryState = MemoryState.getInstance();
Object.freeze(memoryState);
export default memoryState;
//# sourceMappingURL=index.js.map