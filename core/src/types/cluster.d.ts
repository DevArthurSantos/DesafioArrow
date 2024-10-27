/* eslint-disable @typescript-eslint/method-signature-style */
declare module 'cluster' {
  interface Cluster {
    isMaster: boolean;
    fork(): Worker;
    on(event: 'exit', listener: (worker: Worker, code: number, signal: string) => void): this;
  }

  export const isMaster: boolean;
  export function fork(): Worker;
  export function on(event: 'exit', listener: (worker: Worker, code: number, signal: string) => void): void;
}
