import { createStore, combineReducers } from "redux";
import authReducer from "./authReducer";

export default createStore(
  authReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
