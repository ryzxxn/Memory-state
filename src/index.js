"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BroadcastChannel = typeof window !== 'undefined' ? window.BroadcastChannel : null;
class MemoryState {
    constructor() {
        this.state = {};
        this.listeners = {};
        this.channel = null;
        this.channel = BroadcastChannel ? new BroadcastChannel('memory-state-channel') : null;
        if (this.channel) {
            this.channel.addEventListener('message', (event) => {
                const { key, value } = event.data;
                this.setState(key, value);
            });
        }
    }
    static getInstance() {
        if (!MemoryState.instance) {
            MemoryState.instance = new MemoryState();
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
}
MemoryState.instance = null;
const memoryState = MemoryState.getInstance();
Object.freeze(memoryState);
exports.default = memoryState;
