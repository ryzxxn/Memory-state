# MemoryState Library

The MemoryState library provides a simple in-memory state management solution for JavaScript applications. It allows you to store and manage state data within the memory of your application.

## Installation

You can install the MemoryState library via npm:

```bash
npm install memory-state-lib
```

## Usage
To use the MemoryState library in your JavaScript application, follow these steps:

Import the library into your code:
```bash
import memoryState from 'memory-state-lib';

```

Set state data:
```bash
// Set state data
memoryState.setState('user', { name: 'John', age: 30 });
```

Get state data:
```bash
// Get state data
const user = memoryState.getState('user');
console.log(user); // Output: { name: 'John', age: 30 }
```

Clear specific state data:
```bash
// Clear specific state data
memoryState.clearState('user');
```

Clear all state data:
```bash
// Clear all state data
memoryState.clearAll();
```