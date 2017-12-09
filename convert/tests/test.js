Convert = require("../Convert.js");

try {
    let testConvert = new Convert("test.eps");

    testConvert.getEPStoPNG(1000,false);
} catch (exception) {
    console.log(" - Error: " + exception.message);
}
