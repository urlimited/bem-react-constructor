import {TemplateBuilder} from "../../src/templateBuilder";
import React from "react";
import ReactDOMServer from "react-dom/server";

const assert = require('assert');
const fs = require('fs');

const execSync = require('child_process').execSync;
const output = execSync('npm run extract --path=./test/templateBuilder/cases/directoryStructure', {encoding: 'utf-8'});

const elementsDeclaration = JSON.parse(fs.readFileSync('./test/templateBuilder/cases/elementsDeclaration.json', {encoding: 'utf-8'}));

const toCheck = [
    require('./cases/elementWithChildren.ucase'),
    require('./cases/singleElement.ucase')
    //TemplateBuilder.getInstance(require('./cases/elementWithChildren.js').useCase, elementsDeclaration).build()),
    //TemplateBuilder.getInstance(require('./cases/singleElement.js').useCase, elementsDeclaration).build())
]

//console.log(ReactDOMServer.renderToString(htmlRendered))

describe('Template builder', () => {
    toCheck.forEach(tc => {
        it(tc.description, () => {
            return assert.strictEqual(
                ReactDOMServer.renderToString(TemplateBuilder.getInstance(elementsDeclaration).build(tc.useCase)),
                tc.check
            );
        });
    });
});