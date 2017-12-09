Convert = require("../Convert.js");

try {
    let testConvert = new Convert("/app/convert/tests/test.eps", "test.eps");
    let result = testConvert.getEPStoPNG(1000,false);
    console.log("result: "+ result);
} catch (exception) {
    console.log(" - Error: " + exception.message);
}
