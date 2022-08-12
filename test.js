const EventEmitter = require("./out/index");

// const evEm = new EventEmitter();
// evEm.on("someevent", (arg) => {
//     console.log("running some event! Argument is " + arg);
// });


// setTimeout(() => evEm.emit("someevent", "this is an argument"), 1e3);

const em = new EventEmitter();
em.on("ev2", (num) => {
    console.log(num);
});

em.emit("ev1", "test");
em.emit("ev2", 1);