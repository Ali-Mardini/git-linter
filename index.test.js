const packageFile = require('./package.json');

test('Check if lint added to package.json', () => {

    // get lint value from package.json
    var lintScript = packageFile.scripts.lint;

    // lint value should not be undefined
    expect(lintScript).not.toBeUndefined();
});