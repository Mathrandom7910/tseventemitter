import EventEmitter from "./src";

interface EventMap {
    [event: string]: (...args: any[]) => void;
    ev1: (...args: any) => any;
    ev2: (testStr: string, testNum: number) => any;
}

const em = new EventEmitter<EventMap>();
em.on("ev2", (str, num) => {

});