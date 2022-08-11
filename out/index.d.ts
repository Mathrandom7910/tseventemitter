declare class EventEmitter<Map = any> {
    private events;
    on<K extends keyof Map>(type: K, cb: (event: Map[K]) => any): void;
    once<K extends keyof Map>(type: K, cb: (event: Map[K]) => any): void;
    emit<K extends keyof Map>(type: K, arg: Map[K]): void;
    removeEvent<K extends keyof Map>(type: K, cb: Function): void;
}
export = EventEmitter;
//# sourceMappingURL=index.d.ts.map