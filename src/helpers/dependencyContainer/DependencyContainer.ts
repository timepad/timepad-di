import EE from 'eventemitter3';

export type ConstructorValue<T> = T extends new (...args: any) => infer U ? U : never;

/*
 * ATTENTION! Для корректного использования данного класса в production build.
 * Необходимо в настройки вашей сборки билда добавить свойство keep_classnames
 * Из-за того, что при сборке все именна классов называются "с", а мы сохраняем и получаем доступ к классу по его имени!
 * */

/** Класс контейнер зависимостей */
export class DependencyContainer extends EE {
    private readonly elements: Record<string, Record<string, any>>;

    constructor() {
        super();
        this.elements = {};
    }

    /**
     * Получить экземпляр типа T из указанной области видимости scope.
     * @param {T} cons - Конструктор класса.
     * @param {string} scope - Область где искать.
     * @return {ConstructorValue<T>} - Возвращает экземпляр класса T из области, если экземпляра в контейнере нет, то создать и вернуть.
     */
    get<T extends new (...args: any) => any>(cons: T, scope = 'default'): ConstructorValue<T> {
        if (this.elements[scope] && this.elements[scope][cons.name]) {
            return this.elements[scope][cons.name];
        } else {
            return this.register(cons, scope);
        }
    }

    /**
     * Подписаться и создать экземпляр класса типа T в указанную область видимости scope.
     * @param {T} cons - Конструктор класса.
     * @param {string} scope - Область видимости, куда зарегистировать экземпляр класса типа T
     * @return {ConstructorValue<T>} - Возвращает экземпляр класса T
     */
    register<T extends new () => any>(cons: T, scope = 'default'): ConstructorValue<T> {
        if (this.elements[scope] && this.elements[scope][cons.name]) {
            return this.elements[scope][cons.name];
        }

        if (!this.elements[scope]) {
            this.elements[scope] = {};
        }

        const instance = new cons();
        this.elements[scope][cons.name] = instance;

        this.emit('registered', {scope, cons});

        return instance;
    }

    factoryRegister<T extends new () => any>(factory: () => ConstructorValue<T>, consName: string, scope = 'default') {
        if (this.elements[scope] && this.elements[scope][consName]) {
            return this.elements[scope][consName];
        }

        const instance = factory();

        if (!this.elements[scope]) {
            this.elements[scope] = {};
        }

        this.elements[scope][consName] = instance;

        this.emit('registered', {scope, instance: instance.constructor});

        return instance;
    }

    /**
     * Отписаться и удалить экземпляр класса T из указанной области видимости
     * @param {T} cons - Конструктор класса.
     * @param {string} scope - Область видимости, откуда отписаться и удалить экземпляр класса типа T
     */
    unregister<T extends new () => any>(cons: T, scope = 'default'): void {
        this.emit('unregistered', {scope, cons});
        delete this.elements[scope][cons.name];
    }
}

export const diContainer = new DependencyContainer();
