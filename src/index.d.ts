declare module 'memory-state' {
  interface MemoryState {
    setState(key: string, value: any): void;
    getState(key: string): any;
    clearState(key: string): void;
    clearAll(): void;
    subscribe(key: string, callback: (value: any) => void): () => void;
  }

  const memoryState: MemoryState;
  export default memoryState;
}