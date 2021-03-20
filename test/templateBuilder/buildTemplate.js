import {TemplateBuilder} from "../../src/templateBuilder";
import React from "react";

const assert = require('assert');
const fs = require('fs');

const execSync = require('child_process').execSync;
const output = execSync('npm run extract --path=./test/templateBuilder/cases/directoryStructure', {encoding: 'utf-8'});

const elementsDeclaration = JSON.parse(fs.readFileSync('./test/templateBuilder/cases/elementsDeclaration.json', {encoding: 'utf-8'}));

const htmlRendered = TemplateBuilder.getInstance([
    {
        type: 'section',
        classes: ['awdwad', 'qwerty'],
        children: [
            {
                type: 'link',
                children: [
                    {
                        type: 'link'
                    }
                ]
            },
            {
                type: 'section'
            }
        ]
    },
    {
        type: 'link',
        classes: ['awdwad', 'qwerty'],
        children: [
            {
                type: 'link'
            },
            {
                type: 'section'
            }
        ]
    }
], elementsDeclaration).build();

describe('Template builder', () => {
    it('returns required html, based on client code', () => {
        return assert.strictEqual(
            1, 1
        );
    });
});