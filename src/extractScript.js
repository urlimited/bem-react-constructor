const fs = require('fs');
const path = require('path');

const basePath = path.resolve('.');

const buildFileStructure = (curDir, result = [], parentDir = '', config = {blockExt: '.jsx'}) => {
    const dirContent = fs.readdirSync(curDir);

    dirContent.forEach(d => {
        const dPath = curDir + "/" + d;

        if (fs.lstatSync(dPath).isDirectory())
            if (_isDirHasBlockFile(dPath, d, config.blockExt))
                buildFileStructure(dPath, result, d);
            else
                throw new Error('Directory ' + dPath + ' does not have required block file ' + d
                    + '.jsx. Add the required file and re-run script again');
        else {
            if (d.substr(d.length - config.blockExt.length) === config.blockExt && _isBlockHasCorrectFilename(parentDir, d, config.blockExt))
                result.push({
                    type: parentDir,
                    path: "./" + parentDir + "/" + d
                });
        }
    });

    return result;
}

const _isBlockHasCorrectFilename = (dirName, fileName, ext) => {
    return dirName === fileName.substr(0, fileName.length - ext.length);
}

const _isDirHasBlockFile = (dirPath, dirName, ext) => {
    if(dirName[0] === "_")
        return true;

    return fs.readdirSync(dirPath).includes(dirName + ext);
}

try {
    console.log(process.argv[2]);

    const structure = buildFileStructure(process.argv[2]);

    let jsContent = "////////////////////////////////////////\n"
        jsContent += "// ATTENTION ! \n"
        jsContent += "// THIS FILE IS GENERATED DYNAMICALLY \n"
        jsContent += "// DO NOT TOUCH IT \n"
        jsContent += "////////////////////////////////////////\n\n"

        jsContent += "module.exports = (name) => {\n" +
        "\tswitch(name){\n"

    structure.forEach(d => {
        jsContent += `\t\tcase '${d.type}':\n`;
        jsContent += `\t\t\treturn require('${d.path}');\n`;
    })

    jsContent += "\t}\n" +
        "}";

    /*if(!fs.existsSync(process.argv[2] + '/../configs/'))
        fs.mkdirSync(process.argv[2] + '/../configs/');*/

    fs.writeFileSync(process.argv[2] + '/dynamicRequire.js', jsContent);

    fs.writeFileSync(process.argv[2] + '/elementsDeclaration.json', JSON.stringify(buildFileStructure(process.argv[2])));
    console.log('\x1b[32m%s\x1b[0m', "Created file in " + fs.realpathSync(process.argv[2] + '/elementsDeclaration.json'));
} catch (e) {
    console.log('\x1b[31m%s\x1b[0m', e.message);
}

