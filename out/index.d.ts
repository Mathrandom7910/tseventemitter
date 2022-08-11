declare type defaultFn = (...args: any) => any;
declare class EventEmitter<EventMap extends Record<string, defaultFn> = any> {
    private events;
    on<K extends keyof EventMap>(type: K, cb: EventMap[K]): void;
    once<K extends keyof EventMap>(type: K, cb: EventMap[K]): void;
    emit<K extends keyof EventMap>(type: K, ...args: Parameters<EventMap[K]>): void;
    removeEvent<K extends keyof EventMap>(type: K, cb: Function): void;
}
export = EventEmitter;
//# sourceMappingURL=index.d.ts.map