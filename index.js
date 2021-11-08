const { exec } = require('child_process');
const fs = require('fs');
const packageFile = require('../../package.json');
const inquirer = require('inquirer');


// create a question list
inquirer
    .prompt([
        {
            type: 'list',
            name: 'packageManager',
            message: 'Which package manage are you using?',
            choices: [
                'npm',
                'yarn'
            ],
        }
    ])
    .then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));
        if (answers.packageManager == 'npm') {
            // create hooks with npm configurations
            createHooks('npm');
        } else {

            // create hooks with yarn configurations
            createHooks('yarn');
        }
    });


const createHooks = (option) => {
    //lint script
    var lintScript = "eslint --fix";

    // check if lint script exist
    if (packageFile.scripts.lint == '' || packageFile.scripts.lint == undefined) {
        // add to package.json
        packageFile.scripts.lint = lintScript;

        // write to the file
        fs.writeFileSync('../../package.json', JSON.stringify(packageFile));
        console.log("JSON data is saved.");
    }

    // check if the test scripts exist in package.json
    if (packageFile.scripts.test == '' || packageFile.scripts.test == undefined) {
        console.log('No Test Script is specified!');
    }

    // bash script to run it as commit msg
    var commitMsg =
        '#!/bin/bash \n' +

        '# Color variables \n' +
        "red='\033[0;31m' \n" +
        '# Clear the color after that \n' +
        "clear='\033[0m' \n" +

        'if ! head -1 "$1" | grep -qE "^(feat|fix|chore|docs|test|style|refactor|perf|build|ci|revert)(\(.+?\))?: .{1,}$"; then \n' +

        '    echo -e "${red}Aborting commit. Your commit message is invalid. Please follow this format e.g: feat(scope): Initial commit${clear}" >&2 \n' +
        '    exit 1 \n' +
        'fi \n' +
        'if ! head -1 "$1" | grep -qE "^.{1,88}$"; then \n' +
        '    echo "Aborting commit. Your commit message is too long." >&2 \n' +
        '    exit 1 \n' +
        'fi \n';

    // create commit msg file in hooks folder 
    fs.writeFileSync('../../.git/hooks/commit-msg', commitMsg);

    // make hook file executable
    exec("chmod +x ../../.git/hooks/commit-msg", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    });

    // bash script run as pre commit hook
    var preCommit = '';

    // check if the package manager is npm or yarn
    if (option == 'npm') {
        preCommit = '#!/bin/sh \n' +
            'npm run lint && npm test';
    } else {
        preCommit = '#!/bin/sh \n' +
            'yarn lint && yarn test';
    }

    // create commit msg file in hooks folder 
    fs.writeFileSync('../../.git/hooks/pre-commit', preCommit);

    // make hook file executable
    exec("chmod +x ../../.git/hooks/pre-commit", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message} `);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr} `);
            return;
        }
    });
};