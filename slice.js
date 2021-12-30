let {bingoStarted,bingoDone, Bingo} = require('./src/command/cmd-bingo');
const message = "!bingo 1000"
const rep = "564"
const false_rep = "ljo"


let b = bingoStarted(message);

let message2 = "██████████████████████████████ alesky13 GAGNE le bingo avec le nombre 835. ██████████████████████████████ Tentatives: 2170 / Durée du bingo: 152s Abonné depuis 1 an"

console.log(message2.includes("GAGNE le bingo avec le nombre"))

b.addVal(1);
b.addVal(4);
b.addVal(978);
b.addVal(978);
b.addVal(2);
let tags = {
    username : "wizebot",
}
let messages = "alesky13 GAGNE le bingo avec le nombre 835.";

bingoDone(message2,tags,b);


// function read(){
//     rl.question("What is your name ? ", function(val) {
//         b.addVal(val)
//         read();

//     });
// }

// const t = setInterval( () =>{
//     b.getNextVal();
//     console.log(b.getValArray());
// },50)

// clearInterval(t);

// read();



// let bingo = new Bingo(1000);
// console.log(bingo.getVal());
// bingoStarted(message);

