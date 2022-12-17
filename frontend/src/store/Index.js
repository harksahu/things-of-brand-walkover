import {  combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createStore} from 'redux'


import searchBrandReducer from './reducers/Search-Brands.js'


const rootReducer = combineReducers({searchBrandReducer})

const composeEnhancers =
  typeof window === 'object' && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    ? window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export default store;