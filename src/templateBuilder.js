export class templateBuilder {
    static _instance = null;

    //TODO: рекурсивный метод, чтобы каждый блок сам себя мог рендерить. Передавать туда все, что попадает под content свойство конфигураций
    //TODO: проверку, что конфигурации сформированы корректно
    //TODO: подобие мемоизации, чтобы 2 раза не пробегаться по одному и тому же конфигу с рекурсией, ?? можно даже сохранять в локальный storage клиент ??

    elementsToBuild = [];

    _elementsDeclaration = {}

    constructor(elementsToBuild, elementsDeclarationPath) {
        this.elementsToBuild = elementsToBuild;

        this._elementsDeclaration = elementsDeclarationPath;
    }

    static getInstance(elementsToBuild, elementsDeclarationPath) {
        if (this._instance === null)
            this._instance = new this(elementsToBuild, elementsDeclarationPath);

        return this._instance;
    }

    build() {
        this.checkData(this.elementsToBuild);

        this.elementsToBuild.map(e => e);
    }

    checkData(data) {
        if (!Array.isArray(data))
            throw new Error('Data should contain array of blocks');

        return data;
    }
}