import { createStore, applyMiddleware, compose } from 'redux';

//saga middle ware to handle async actions instead of 'redux-thunk'
import createSagaMiddleware from 'redux-saga';

import  logger  from 'redux-logger';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if(process.env.NODE_ENV !== 'production'){
    middleWares.push(logger);  
} 

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWares)));

sagaMiddleware.run(rootSaga);//pass every saga events here to be listened by redux saga

export default store;