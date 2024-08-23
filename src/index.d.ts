type MemoryStateListenerCallback = (value: any) => void;

declare class MemoryState {
  private static instance: MemoryState | null;
  private state: { [key: string]: any };
  private listeners: { [key: string]: MemoryStateListenerCallback[] };
  private channel: BroadcastChannel | null;

  private constructor();

  public static getInstance(): MemoryState;

  public setState(key: string, value: any): void;

  public getState(key: string): any;

  public clearState(key: string): void;

  public clearAll(): void;

  public subscribe(key: string, callback: MemoryStateListenerCallback): () => void;

  public on(key: string, callback: MemoryStateListenerCallback): () => void;
}

declare const memoryState: MemoryState;

export default memoryState;