import React from "react";

export class TemplateBuilder {
    static _instance = null;

    //TODO: проверку, что конфигурации сформированы корректно
    //TODO: подобие мемоизации, чтобы 2 раза не пробегаться по одному и тому же конфигу с рекурсией, ?? можно даже сохранять в локальный storage клиент ??

    elementsToBuild = [];

    _elementsDeclaration = {};
    _dynamicRequire = null;

    constructor({elementsDeclarationFile, dynamicRequireFile}) {
        this._elementsDeclaration = elementsDeclarationFile;
        this._dynamicRequire = dynamicRequireFile;
    }

    static getInstance({elementsDeclarationFile, dynamicRequireFile}) {
        if (this._instance === null)
            this._instance = new this({elementsDeclarationFile, dynamicRequireFile});

        return this._instance;
    }

    build(elementsToBuild) {
        this._checkData(elementsToBuild);

        this.elementsToBuild = elementsToBuild;

        //TODO: this is issue, since key is not best param to use as a unique key
        return this.elementsToBuild.map((etb, key) => {
            etb.key = key;
            return this._buildElement(etb)
        });
    }

    _buildElement(elementToBuild, result = "") {
        /*const tmpPath = this._elementsDeclaration.find(ed => ed.type === elementToBuild.type)
            ?.path ?? throw new Error('Element ' + elementToBuild.name + ' does not have type attribute')*/

        const RenderedElement = this._dynamicRequire(elementToBuild.type).default

        const props = {
            classes: [],
            id: [],
            children: [],
        };

        Object.keys(elementToBuild)
            .filter(k => ![
                'type',
                'children'
            ].includes(k))
            .forEach(k => props[k] = elementToBuild[k])

        if (elementToBuild.classes !== undefined){
            props.classes = elementToBuild.classes;
        }

        if (elementToBuild.id !== undefined)
            props.id = elementToBuild.id;

        if (elementToBuild.children !== undefined && Array.isArray(elementToBuild.children)) {
            elementToBuild.children.forEach(ctb => {
                props.children.push(this._buildElement(ctb))
            });

            return <RenderedElement {...props} />;
        }

        return <RenderedElement {...props} />;
    }

    _checkData(data) {
        if (!Array.isArray(data))
            throw new Error('Data should contain array of blocks');

        return data;
    }
}

export default TemplateBuilder;