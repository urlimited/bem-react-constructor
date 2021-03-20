import React from "react";

export class TemplateBuilder {
    static _instance = null;

    //TODO: проверку, что конфигурации сформированы корректно
    //TODO: подобие мемоизации, чтобы 2 раза не пробегаться по одному и тому же конфигу с рекурсией, ?? можно даже сохранять в локальный storage клиент ??

    elementsToBuild = [];

    _elementsDeclaration = {}

    constructor(elementsDeclarationPath) {
        this._elementsDeclaration = elementsDeclarationPath;
    }

    static getInstance(elementsDeclarationPath) {
        if (this._instance === null)
            this._instance = new this(elementsDeclarationPath);

        return this._instance;
    }

    build(elementsToBuild) {
        this._checkData(elementsToBuild);

        this.elementsToBuild = elementsToBuild;

        return this.elementsToBuild.map(etb => this._buildElement(etb));
    }

    _buildElement(elementToBuild, result = "") {
        const RenderedElement = require('../' + this._elementsDeclaration.find(ed => ed.type === elementToBuild.type)
            ?.path ?? throw new Error('Element ' + elementToBuild.name + ' does not have type attribute')).default

        const props = {
            classes: [],
            id: [],
            children: []
        };

        if (elementToBuild.classes !== undefined){
            props.classes = elementToBuild.classes;
        }

        if (elementToBuild.id !== undefined)
            props.id = elementToBuild.id;

        if (elementToBuild.children !== undefined && Array.isArray(elementToBuild.children)) {
            elementToBuild.children.forEach(ctb => {
                props.children.push(this._buildElement(ctb))
            })

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