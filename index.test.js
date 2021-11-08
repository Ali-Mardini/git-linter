const packageFile = require('./package.json');
const fs = require('fs');
// const preCommit = require('./.git/hooks/pre-commit');
// const commitMsg = require('./hooks/commit-msg');

// check if lint added to package.json
test('Check if lint added to package.json', () => {

    // get lint value from package.json
    var lintScript = packageFile.scripts.lint;

    // lint value should not be undefined
    expect(lintScript).not.toBeUndefined();
});


// check if pre-commit file created
test('check if pre-commit file created', () => {

    // check if pre commit file is exist
    var fileStauts = fileExistsSync('./.git/hooks/pre-commit');

    expect(fileStauts).toBeTruthy();
});

// check if commit msg file created
test('check if commit-msg file created', () => {

    // check if commit msg file is exist
    var fileStauts = fileExistsSync('./.git/hooks/commit-msg');

    expect(fileStauts).toBeTruthy();
});

// helper function to check if the file is exist or not
const fileExistsSync = (file) => {
    try {
        fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (err) {
        return false;
    }
}