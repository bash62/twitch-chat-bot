let {bingoStarted , bingoDone , Bingo} = require('../src/command/cmd-bingo');



test('Bingo init full test',()=>{
    let res = []
    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    expect(bing.isActive()).toBe(true);
    expect(bing.getValArray()).toStrictEqual(res)
    expect(bing.getNextVal()).toBe(1);
    res = [1]

    expect(bing.getValArray()).toStrictEqual(res)

})

test('Bingo get val',() => {
    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    expect(bing.getVal()).toBe(1000);
    expect(bing.isActive()).toBe(true);
    expect(typeof bing == Bingo);

})

test('Bingo empty array',() => {
    const res = [];
    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    let array = bing.getValArray();
    expect(array.length).toBe(0);
    expect(bing.getValArray()).toStrictEqual(res)


})

test('Bingo array add',() => {
    const res = [1]
    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    bing.addVal(1);
    let array = bing.getValArray();
    expect(array.length).toBe(1);
    expect(bing.getValArray()).toStrictEqual(res)

})

test('Bingo array sortAsc',() => {
    let res = [1,2,4,978]
    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    bing.addVal(1);
    bing.addVal(4);
    bing.addVal(978);
    bing.addVal(2);
    let array = bing.getValArray();
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(bing.getValArray()).toStrictEqual(res)

})

test('Bingo array not added because not in range',() => {
    let res = [1,2,4,978]
    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    bing.addVal(1);
    bing.addVal(4);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(2);

    let array = bing.getValArray();
    expect(array.length).toBe(4);
    expect(bing.getValArray()).toStrictEqual(res)

})

test('Bingo array duplicate not added',() => {

    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    bing.addVal(1);
    bing.addVal(4);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(2);

    let array = bing.getValArray();
    expect(array.length).toBe(4);
})

test('Bingo getNextValue after',() => {

    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    bing.addVal(1);
    bing.addVal(4);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(2);

    expect(bing.getNextVal()).toBe(3);
    expect(bing.getNextVal()).toBe(5);
    expect(bing.getNextVal()).toBe(6);
    expect(bing.getValArray().length).toBe(7);
})

test('Bingo getNextValue before ',() => {

    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);

    bing.addVal(4);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(3);

    expect(bing.getNextVal()).toBe(1);
    expect(bing.getNextVal()).toBe(2);
    expect(bing.getNextVal()).toBe(5);
    expect(bing.getValArray().length).toBe(6);
})


test('Bingo getNextValue all tested ',() => {
    const res = [1,2,3,4,5]
    const message_bingo = "!bingo 5";
    let bing = bingoStarted(message_bingo);
    bing.addVal(1);
    bing.addVal(2);
    bing.addVal(3);


    expect(bing.getNextVal()).toBe(4);
    expect(bing.getNextVal()).toBe(5);
    expect(bing.getNextVal()).toBe(-1);
    expect(bing.getNextVal()).toBe(-1);
    expect(bing.getNextVal()).toBe(-1);
    expect(bing.getNextVal()).toBe(-1);



    expect(bing.getValArray().length).toBe(5);
    expect(bing.getValArray()).toStrictEqual(res)
})



test('Bingo add string(number) addArray',() => {

    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    bing.addVal(1);
    bing.addVal(4);
    bing.addVal(978);
    bing.addVal("14");
    bing.addVal(978);
    bing.addVal(2);

    expect(bing.getNextVal()).toBe(3);
    expect(bing.getNextVal()).toBe(5);
    expect(bing.getNextVal()).toBe(6);
    expect(bing.getValArray().length).toBe(8);
})

test('Bingo string badly formated `505 55 `',() => {

    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    bing.addVal(1);
    bing.addVal(4);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(2);

    expect(bing.addVal("500 5")).toBe(false);
    expect(bing.getNextVal()).toBe(3);
    expect(bing.getNextVal()).toBe(5);
    expect(bing.getNextVal()).toBe(6);
    expect(bing.getValArray().length).toBe(7);
})

test('Bingo addVal out of bounds',() => {

    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    bing.addVal(1);
    bing.addVal(4);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(2);

    expect(bing.addVal("1001")).toBe(false);
    expect(bing.addVal(1001)).toBe(false);
    expect(bing.addVal(0)).toBe(false);

    expect(bing.getNextVal()).toBe(3);
    expect(bing.getNextVal()).toBe(5);
    expect(bing.getNextVal()).toBe(6);
    expect(bing.getValArray().length).toBe(7);
})

test('Bingo add string without number',() => {

    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    bing.addVal(1);
    bing.addVal(4);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(2);

    expect(bing.addVal("kbjvhdssj")).toBe(false);
    expect(bing.getNextVal()).toBe(3);
    expect(bing.getNextVal()).toBe(5);
    expect(bing.getNextVal()).toBe(6);
    expect(bing.getValArray().length).toBe(7);
})


test('Bingo not initialised',() => {
    const message_bingo = "!bingo dazdaz";
    let bing = bingoStarted(message_bingo);
    expect(bing).toBe(null);
})

test('Bingo done',() => {
    const message_bingo = "!bingo 1000";
    let bing = bingoStarted(message_bingo);
    bing.addVal(1);
    bing.addVal(4);
    bing.addVal(978);
    bing.addVal(978);
    bing.addVal(2);
    let tags = {
        username : "wizebot",
    }
    let message = "alesky13 GAGNE le bingo avec le nombre 835.";
    expect(bing.addVal("kbjvhdssj")).toBe(false);
    expect(bing.getNextVal()).toBe(3);
    expect(bing.getNextVal()).toBe(5);
    expect(bing.getNextVal()).toBe(6);
    expect(bing.getValArray().length).toBe(7);
    bingoDone(message,tags);


})



