# MemoryState Library

The MemoryState library provides a simple in-memory state management solution for JavaScript applications. It allows you to store and manage state data within the memory of your application.

## Installation

You can install the MemoryState library via npm:

```bash
npm install memory-state
```

## Usage
To use the MemoryState library in your JavaScript application, follow these steps:

Import the library into your code:
```bash
import memoryState from 'memory-state';

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

## Limitations:
- Data Persistence: Unlike browser storage mechanisms like localStorage or sessionStorage, the data stored in MemoryState is transient and exists only within the current execution context of the JavaScript application. It is lost when the application is closed or refreshed.

- Memory Consumption: Storing state data in memory can consume memory resources, especially for large or complex applications. This could potentially lead to memory issues if not managed properly.

- Single Instance: The MemoryState class is implemented as a singleton, meaning there is only one instance of the class throughout the application. While this ensures consistency in state management, it may not be suitable for scenarios where multiple independent state management instances are needed.

## Pros:
- Simplicity: The MemoryState class provides a simple and straightforward API for managing state data in-memory. It's easy to understand and use, making it suitable for small to medium-sized applications.

- Performance: Accessing state data from memory is generally faster compared to accessing it from browser storage mechanisms like localStorage or sessionStorage. This can lead to better performance, especially for frequently accessed state data.

- Security: Since the data stored in MemoryState is transient and exists only within the current session, it may provide better security for sensitive information compared to storing it in browser storage mechanisms that persist across sessions.

- Predictable Behavior: Being a singleton instance, the behavior of MemoryState is predictable and consistent throughout the application. This makes it easier to reason about and debug state-related issues.