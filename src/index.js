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
                this.setState(key, value, false); // false to avoid double notifications
            });
        }
    }

    static getInstance() {
        if (!MemoryState.instance) {
            MemoryState.instance = new MemoryState();
        }
        return MemoryState.instance;
    }

    setState(key, value, notify = true) {
        this.state[key] = value;

        if (this.channel && notify) {
            this.channel.postMessage({ key, value });
        }

        if (notify && this.listeners[key]) {
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

    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);

        // Call the callback with the current state value immediately
        if (this.state.hasOwnProperty(key)) {
            callback(this.state[key]);
        }

        // Return an unsubscribe function
        return () => {
            if (this.listeners[key]) {
                this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
                if (this.listeners[key].length === 0) {
                    delete this.listeners[key];
                }
            }
        };
    }
}

MemoryState.instance = null;
const memoryState = MemoryState.getInstance();
Object.freeze(memoryState);
exports.default = memoryState;