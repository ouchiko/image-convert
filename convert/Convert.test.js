let Convert = require("./Convert.js");
let fs = require("fs");

test('Converts EPS file to PNG with return ID', () => {
    let testConvert = new Convert("/app/convert/tests/test.eps", "test.eps");
    let result = testConvert.getEPStoPNG(1000,false);
    expect(result).toBe('8c18ecc500de49027f0ed1df1bec10b8');
});

test('Ensures we have three counts of file', () => {
    let basepath = "/app/webapp/static/assets/processed/";
    let result =
        fs.existsSync(basepath+"8c18ecc500de49027f0ed1df1bec10b8-trans.png") &&
        fs.existsSync(basepath+"8c18ecc500de49027f0ed1df1bec10b8-black.png") &&
        fs.existsSync(basepath+"8c18ecc500de49027f0ed1df1bec10b8-white.png");
    expect(result).toBe(true);
});
