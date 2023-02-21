# timepad-di — Библиотека для работы со сторами-синглтонами в React.

## Описание

Для подключения стора используем `useContainer`:
```tsx
useContainer<T extends new () => any>(cons: T, scope: string = 'default');

const [store, on, dispose] = useContainer(MyStore);
```

`store` – ссылка на ваш Store.

`on` – это функция, который принимает 2 аргумента:

- "register" / "unregister"
- callback - вызывается в том случае, когда происходит register/unregister стора

`dispose` - это функция, которая делает unregister стора (удаляет его из контейнера)

Для получения доступа к стору из класса (другого стора) используем `diContainer`:
```tsx
diContaner.get<T extends new (...args: any) => any>(cons: T, scope = 'default');

store = diContaner.get(MyStore);
```

`cons` – Класс стора.

`scope` – Область видимости.