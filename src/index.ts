class EventData {
    constructor(public name: string | number | symbol, public cb: Function, public once = false) {
        
    }
}


class EventEmitter<Map = any> {
    private events: EventData[] = [];

    /**
     * Registers an event that will be called when emit with the same type is called.
     * @param type Type of event to register to.
     * @param cb Callback function that is called when the given event is emitted.
     * @returns The callback function.
     */

    on<K extends keyof Map>(type: K, cb: (event: Map[K]) => any) {
        this.events.push(new EventData(type, cb));
        return cb;
    }

    /**
     * Registers an event that will be called once when emit with the same type is called.
     * @param type Type of event to register to.
     * @param cb Callback function that is called when the given event is emitted.
     * @returns The callback function.
     */

    once<K extends keyof Map>(type: K, cb: (event: Map[K]) => any) {
        this.events.push(new EventData(type, cb, true));
        return cb;
    }

    /**
     * Emits an event to all registered events.
     * @param type Type of event to emit.
     * @param arg Event argument to emit.
     */

    emit<K extends keyof Map>(type: K, arg: Map[K]) {
        for(let i = 0; i < this.events.length; i++) {
            const evt = this.events[i];
            if(evt.name != type) continue;
            evt.cb(arg);
            if(evt.once) {
                this.events.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * "Unregisters" an event - doesn't prevent from event being called again, event will only be called once after this method is called.
     * @param type Type of event to unregister.
     * @param cb Callback of the event type to unregister
     */

    removeEvent<K extends keyof Map>(type: K, cb: Function) {
        this.events.forEach(e => {
            if(e.name == type && e.cb == cb) {
                e.once = true;
            }
        });
    }

    /**
     * "Unregisters" an event - doesn't prevent from event being called again, event will only be called once after this method is called.
     * @param type Type of event to unregister.
     * @param cb Callback of the event type to unregister
     */

    off<K extends keyof Map>(type: K, cb: Function) {
        this.events.forEach(e => {
            if(e.name == type && e.cb == cb) {
                e.once = true;
            }
        });
    }

    /**
     * Creates a promise that is resolved once the specified event is emitted.
     * @param type Type of event to wait for.
     * @returns Promise that is resolved once the specified event is emitted.
     */

    await<K extends keyof Map>(type: K) {
        return new Promise<Map[K]>((res) => {
            const fn = (e: Map[K]) => {
                res(e);
            }
            this.on(type, fn);
            this.off(type, fn)
        });
    }
}

export = EventEmitter;