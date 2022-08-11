"use strict";
class EventData {
    name;
    cb;
    once;
    constructor(name, cb, once = false) {
        this.name = name;
        this.cb = cb;
        this.once = once;
    }
}
class EventEmitter {
    events = [];
    on(type, cb) {
        if (typeof cb != "function")
            throw new Error("Callback must be a function");
        this.events.push(new EventData(type, cb));
    }
    once(type, cb) {
        if (typeof cb != "function")
            throw new Error("Callback must be a function");
        this.events.push(new EventData(type, cb, true));
    }
    emit(type, ...args) {
        this.events.filter(evt => {
            if (evt.name != type)
                return true;
            evt.cb(args);
            return !evt.once;
        });
    }
    removeEvent(type, cb) {
        this.events.forEach(e => {
            if (e.name == type && e.cb == cb) {
                e.once = true;
            }
        });
    }
}
module.exports = EventEmitter;
