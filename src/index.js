"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BroadcastChannel = typeof window !== 'undefined' ? window.BroadcastChannel : null;

class MemoryState {
    constructor() {
        this.state = {};
        this.listeners = {};
        this.channel = BroadcastChannel ? new BroadcastChannel('memory-state-channel') : null;

        if (this.channel) {
            this.channel.addEventListener('message', (event) => {
                const { key, value } = event.data;
                this.setState(key, value);
            });
        }
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

    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
        // Immediately call the callback with current value
        callback(this.state[key]);
    }

    unsubscribe(key, callback) {
        if (this.listeners[key]) {
            this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
        }
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
}

// Create a singleton instance
const memoryState = new MemoryState();
Object.freeze(memoryState);
exports.default = memoryState;
