import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './store/reducers/RootReducer';
import {HttpInterceptor} from "./HttpInterceptor";

export const middlewares = [thunk];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export const store = createStoreWithMiddleware(RootReducer)

  HttpInterceptor(store);

