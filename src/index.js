"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BroadcastChannel = typeof window !== 'undefined' ? window.BroadcastChannel : null;
var MemoryState = /** @class */ (function () {
    function MemoryState() {
        var _this = this;
        this.state = {};
        this.listeners = {};
        this.channel = null;
        this.channel = BroadcastChannel ? new BroadcastChannel('memory-state-channel') : null;
        if (this.channel) {
            this.channel.addEventListener('message', function (event) {
                var _a = event.data, key = _a.key, value = _a.value;
                _this.setState(key, value);
            });
        }
    }
    MemoryState.getInstance = function () {
        if (!MemoryState.instance) {
            MemoryState.instance = new MemoryState();
        }
        return MemoryState.instance;
    };
    MemoryState.prototype.setState = function (key, value) {
        this.state[key] = value;
        if (this.channel) {
            this.channel.postMessage({ key: key, value: value });
        }
        if (this.listeners[key]) {
            this.listeners[key].forEach(function (callback) { return callback(value); });
        }
    };
    MemoryState.prototype.getState = function (key) {
        return this.state[key] || null;
    };
    MemoryState.prototype.clearState = function (key) {
        delete this.state[key];
        if (this.listeners[key]) {
            this.listeners[key].forEach(function (callback) { return callback(null); });
        }
    };
    MemoryState.prototype.clearAll = function () {
        var _this = this;
        this.state = {};
        Object.keys(this.listeners).forEach(function (key) {
            _this.listeners[key].forEach(function (callback) { return callback(null); });
        });
    };
    // Subscribe to state changes for a specific key
    MemoryState.prototype.subscribe = function (key, callback) {
        var _this = this;
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
        // Return unsubscribe function
        return function () {
            if (_this.listeners[key]) {
                _this.listeners[key] = _this.listeners[key].filter(function (cb) { return cb !== callback; });
            }
        };
    };
    // Syntax-friendly subscribe method
    MemoryState.prototype.on = function (key, callback) {
        return this.subscribe(key, callback);
    };
    MemoryState.instance = null;
    return MemoryState;
}());
var memoryState = MemoryState.getInstance();
Object.freeze(memoryState);
exports.default = memoryState;
