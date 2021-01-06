const {writeTerrafile} = require("../utils/addModules");

it("Check if it returns code 200", async () => {
     expect(await writeTerrafile("nameTest","sourceTest", "versionTest",[])).toEqual({status: 200, function: "writeTerrafile"});
});
