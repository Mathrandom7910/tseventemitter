class EventData {
    constructor(public name: string | number | symbol, public cb: Function, public once = false) {
        
    }
}


class EventEmitter<Map = any> {
    private events: EventData[] = [];

    on<K extends keyof Map>(type: K, cb: (event: Map[K]) => any) {
        this.events.push(new EventData(type, cb));
    }

    once<K extends keyof Map>(type: K, cb: (event: Map[K]) => any) {
        this.events.push(new EventData(type, cb, true));
    }

    emit<K extends keyof Map>(type: K, arg: Map[K]) {
        this.events.filter(evt => {
            if(evt.name != type) return true;
            evt.cb(arg);
            return !evt.once;
        });
    }

    removeEvent<K extends keyof Map>(type: K, cb: Function) {
        this.events.forEach(e => {
            if(e.name == type && e.cb == cb) {
                e.once = true;
            }
        });
    }
}

export = EventEmitter;