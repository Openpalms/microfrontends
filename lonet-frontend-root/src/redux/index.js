import { combineReducers, createStore, compose } from 'redux';

import { reducer } from './reducer';

const staticReducers = {
    host: reducer,
};

/**
 * Cf. redux docs:
 * https://redux.js.org/recipes/code-splitting/#defining-an-injectreducer-function
 */
export default function configureStore(initialState) {
    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

    const enhancer = composeEnhancers();
    const store = createStore(createReducer(), enhancer);

    store.asyncReducers = {};

    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
    };

    return store;
}

function createReducer(asyncReducers) {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    });
}

export const store = configureStore();
