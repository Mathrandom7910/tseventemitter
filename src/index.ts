type defaultFn = (...args: any) => any;

class EventData {
    constructor(public name: string | number | symbol, public cb: defaultFn, public once = false) {
        
    }
}


class EventEmitter<EventMap extends Record<string, defaultFn> = any> {
    private events: EventData[] = [];

    on<K extends keyof EventMap>(type: K, cb: EventMap[K]) {
        if(typeof cb != "function") throw new Error("Callback must be a function");
        this.events.push(new EventData(type, cb));
    }

    once<K extends keyof EventMap>(type: K, cb: EventMap[K]) {
        if(typeof cb != "function") throw new Error("Callback must be a function");
        this.events.push(new EventData(type, cb, true));
    }

    emit<K extends keyof EventMap>(type: K, ...args: Parameters<EventMap[K]>) {
        this.events.filter(evt => {
            if(evt.name != type) return true;
            evt.cb(args);
            return !evt.once;
        });
    }

    removeEvent<K extends keyof EventMap>(type: K, cb: Function) {
        this.events.forEach(e => {
            if(e.name == type && e.cb == cb) {
                e.once = true;
            }
        });
    }
}

export = EventEmitter;