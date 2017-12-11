let Convert = require("../Convert.js");
let fs = require("fs");

test('Converts EPS file to PNG with return ID', () => {
    let testConvert = new Convert("convert/tests/test.eps", "test.eps");
    let result = testConvert.convertFileToPNG(1000,false);
    expect(result).toBe('8c18ecc500de49027f0ed1df1bec10b8');
});

test('Invalid file sent', () => {
    let testConvert = new Convert("foo", "test.eps");
    let result = testConvert.convertFileToPNG(1000,false);
    expect(result).toBe(false);
});

test('Is the file extension valid', () => {
    let testConvert = new Convert("convert/tests/test.eps", "test.eps");
    let result = testConvert.isValidFile();
    expect(result).toBe(true);
});

test('Do the generated files exist', () => {
    let file_sync = 0;
    let status = false;
    let root_path = 'webapp/static/assets/processed/8c18ecc500de49027f0ed1df1bec10b8-';
    let files = [root_path+'trans.png',root_path+'black.png',root_path+'white.png'];
    let interval = setInterval(()=> {
        if (status||file_sync==5) {
            clearInterval(interval);
            expect(status).toBe(true);
        }

        status = fs.existsSync(files[0])
            && fs.existsSync(files[1])
            && fs.existsSync(files[2]);

    },3000);
});
