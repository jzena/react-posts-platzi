import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';


// podemos usar middleware para registrar errores, utilizar google analitics
// manejar acciones asincronas
// consumo de apis
const logger = store => next => (action) => {
    console.group('loguer');
    console.log('estado actual', store.getState());
    console.log('accion', action);
    const result = next(action);
    console.log('estado nuevo', store.getState());
    console.groupEnd('logger');
    return result;
};

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            logger,
            thunk,
        ),
    ),
);

export default store;