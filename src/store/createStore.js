import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { seamlessImmutableReconciler } from 'redux-persist-seamless-immutable';
import rootSagas from './rootSagas';
import appReducers from './rootReducers';

// import RootSagas from './rootSagas';

// creates the store
export default () => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: seamlessImmutableReconciler,
    whitelist: ['accountReducer']
  };

  // eslint-disable-next-line no-underscore-dangle
  const __DEV__ = process.env.NODE_ENV !== 'production';

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- Logger Middleware ------------- */

  if (__DEV__) {
    // create the logger
    const logger = createLogger();
    middleware.push(logger);
  }

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  /** ------------ Redux devtool --------------------- */
  const composeEnhancers =
    __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          name: 'meatbox'
        })
      : compose;

  /* ------------- AutoRehydrate Enhancer ------------- */
  const persistedReducer = persistReducer(persistConfig, appReducers);

  const store = createStore(persistedReducer, composeEnhancers(...enhancers));
  const persistor = persistStore(store);

  // kick off root saga
  sagaMiddleware.run(rootSagas);

  return { store, persistor };
};
