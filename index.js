const { exec } = require('child_process');
const fs = require('fs');
const packageFile = require(__dirname + '/package.json');


// lint script
var lintScript = "eslint --fix";

// check if lint script exist
if (packageFile.scripts.lint != '' || packageFile.scripts.lint == undefined) {
    // add to package.json
    packageFile.scripts.lint = lintScript;

    // write to the file
    fs.writeFileSync(__dirname + '/package.json', JSON.stringify(packageFile));
    console.log("JSON data is saved.");
}

// check if the test scripts exist in package.json
if (packageFile.scripts.test != '' || packageFile.scripts.test == undefined) {
    console.log('No Test Script is specified!');
}

// run bash command to copy git hook to the hooks folder
exec("cp bashScripts/commit-msg .git/hooks/commit-msg", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});


// make hook file executable
exec("chmod +x .git/hooks/commit-msg", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});


// run bash command to copy git hook to the hooks folder
exec("cp bashScripts/pre-commit .git/hooks/pre-commit", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

// make hook file executable
exec("chmod +x .git/hooks/pre-commit", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});