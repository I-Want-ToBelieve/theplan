export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

export interface ClientToServerEvents {
  hello: () => void
  ping: (cb: any) => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  auth: any
}
