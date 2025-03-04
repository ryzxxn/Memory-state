type MemoryStateListenerCallback = (value: any) => void;

declare class MemoryState {
  private static instance: MemoryState | null;
  private state: { [key: string]: any };
  private listeners: { [key: string]: MemoryStateListenerCallback[] };
  private channel: BroadcastChannel | null;

  private constructor();

  public static getInstance(): MemoryState;

  /**
   * Sets the state for a given key.
   * @param key - The key for the state.
   * @param value - The value to set.
   * @param persist - Whether to persist the state to localStorage. Default is false.
   */
  public setState(key: string, value: any, persist?: boolean): void;

  /**
   * Gets the state for a given key.
   * @param key - The key for the state.
   * @returns The state value or null if not found.
   */
  public getState(key: string): any;

  /**
   * Clears the state for a given key.
   * @param key - The key for the state.
   */
  public clearState(key: string): void;

  /**
   * Clears all state.
   */
  public clearAll(): void;

  /**
   * Subscribes to state changes for a given key.
   * @param key - The key for the state.
   * @param callback - The callback to invoke when the state changes.
   * @returns A function to unsubscribe from state changes.
   */
  public subscribe(key: string, callback: MemoryStateListenerCallback): () => void;

  /**
   * Alias for the subscribe method.
   * @param key - The key for the state.
   * @param callback - The callback to invoke when the state changes.
   * @returns A function to unsubscribe from state changes.
   */
  public on(key: string, callback: MemoryStateListenerCallback): () => void;
}

declare const memoryState: MemoryState;

export default memoryState;
