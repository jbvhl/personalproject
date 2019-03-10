import {createStore, combineReducers} from 'redux';
import authReducer from './authReducer';

export default createStore(authReducer);