export interface IHTTPClient {
  POST(url: string, body?: Request): Promise<any>
}

export interface IEvent {
}

export interface IEventBus {
  on: <T extends IEvent>(type: string, fn: (T) => void) => this
  off: <T extends IEvent>(type: string, fn: (T) => void) => this
  emit: <T extends IEvent>(type: string, value: T) => boolean
}

export function Enum<V extends string>(...values: V[]): { [K in V]: K } {
    const result: any = {};
    values.forEach((value) => result[value] = value);
    return result;
}

export type Enum<T> = T[keyof T];

export interface IFluxAction<P> {
    type: string
    payload?: P
    error?: boolean
    cid?: string
}

export interface IGetAllService<Query> {
  getAll(query: Query): Promise<{
    value: string[]
    entities: any
    errors: any
  }>
}

export interface IGetService {
  get(id: string): {
    value: string,
    entities: any
    errors: any
  }
}