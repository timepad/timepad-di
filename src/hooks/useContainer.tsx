import React, {useCallback, useContext} from 'react';
import {ConstructorValue, DependencyContainer, diContainer} from '../helpers/dependencyContainer';

/** Контейнер зависимотей
 * @param cons - Класс зависимости
 * @param scope - Область видимости в которой доступен экземпляр зависимости
 */
interface IContainerEvent<T extends new () => any> {
    scope: string;
    cons: T;
}

/** Обработчик события */
interface IContainerEventHandler<T extends new () => any> {
    (event: IContainerEvent<T>): void;
}

/** Адаптер обработчика подписки и отписки на события контейнера */
interface IContainerEventAdapter<T extends new () => any> {
    (eventName: 'registered' | 'unregistered', fn: IContainerEventHandler<T>): void;
}

type UseContainerHookResult<T extends new () => any> = [ConstructorValue<T>, IContainerEventAdapter<T>, () => void];

export const ContainerContext = React.createContext<DependencyContainer>(diContainer);

/**
 * Возвращает кортеж из 3 элементов
 * @param {T} cons - Класс зависимости
 * @param {string} scope - Область видимости в которой доступен экземпляр зависимости
 * @return {UseContainerHookResult<T>}.
 *
 * Первый элемент это экземпляр зависимости.
 *
 * Второй элемент это функция, которая позволяет контролировать подписку/отписку экземпляра класса в контейнер
 *
 * Третий элемент это dispose функция, которая позволяет отписаться и удалить экземпляр класса из контейнера
 */

export function useContainer<T extends new (...args: any) => any>(
    cons: T,
    scope = 'default',
): UseContainerHookResult<T> {
    const ctx = useContext(ContainerContext);

    const on: IContainerEventAdapter<T> = useCallback((eventName, fn) => ctx.on(eventName, fn), [ctx]);

    return [ctx.get(cons, scope), on, () => ctx.unregister(cons, scope)];
}
