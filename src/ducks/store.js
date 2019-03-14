import { createStore, combineReducers } from "redux";
import authReducer from "./authReducer";
import symptomsReducer from './symptomsReducer';

export default createStore(
  combineReducers({
    authReducer, 
    symptomsReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
