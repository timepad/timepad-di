import React from 'react';
import {useContainer} from './hooks';

class Store1 {
    isAuth = false;
    setAuth() {
        this.isAuth = true;
    }
    clearAuth() {
        this.isAuth = false;
    }
}

const App = () => {
    const [store] = useContainer(Store1);
    return <div>{store.isAuth}</div>;
};

export default App;
