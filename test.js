const EventEmitter = require("./out/index");

// const evEm = new EventEmitter();
// evEm.on("someevent", (arg) => {
//     console.log("running some event! Argument is " + arg);
// });


// setTimeout(() => evEm.emit("someevent", "this is an argument"), 1e3);
(async function () {
    const em = new EventEmitter();
    console.log(em);
    setTimeout(() => {
        em.emit("a", "this is the result");
    }, 1e3);
    const r = await em.await("a");
    console.log(r);
    em.removeEvent("a");
    setTimeout(() => {
        console.log(em);
    }, 500);
    
})();
