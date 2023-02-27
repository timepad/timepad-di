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

constructor (private readonly store = diContainer.get(MyStore)) {},
```

`cons` – Класс стора.

`scope` – Область видимости.

**
ATTENTION! Для корректного использования данного класса в production build.
Необходимо в настройки вашей сборки билда добавить свойство keep_classnames
Из-за того, что при сборке все именна классов называются "с", а мы сохраняем и получаем доступ к классу по его имени!
**