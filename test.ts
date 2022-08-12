import EventEmitter from "./src";

interface EventMap {
    
    ev1: string;
    ev2: number;
}

const em = new EventEmitter<EventMap>();
em.on("ev2", (num) => {
    console.log(num);
});

em.emit("ev1", "test");
em.emit("ev2", 1);