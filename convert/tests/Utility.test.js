let Utility = require("../Utility");

test('Generates a random number between X..Y', () => {
    let result = Utility.getRand(30,50);
    console.log("Result: " + result);
    expect((result>=30&&result<=50)).toBe(true);
});

test('Generates a random string of 10char', () => {
    let result = Utility.getRandomString(10);
    console.log("Result: " + result);
    expect(result.length==10).toBe(true);
});
