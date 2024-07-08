declare module 'memory-state' {
    class MemoryState {
      setState(key: string, value: any): void;
      getState(key: string): any;
      clearState(key: string): void;
      clearAll(): void;
    }
  
    const memoryState: MemoryState;
    export default memoryState;
  }