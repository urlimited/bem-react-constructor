const assert = require('assert');
const fs = require('fs');

const execSync = require('child_process').execSync;
const output = execSync('npm run extract ./test/extractScript/cases/directoryStructure', {encoding: 'utf-8'});

describe('Extract script', () => {
    it('returns required file structure', () => {
        assert.strictEqual(
            JSON.parse(fs.readFileSync('./test/extractScript/cases/directoryStructure/elementsDeclaration.json', 'utf8')).toString(),
            JSON.parse(fs.readFileSync('./test/extractScript/cases/directoryStructure/elementsDeclarationCorrect.json', 'utf8')).toString()
        );
    });
});