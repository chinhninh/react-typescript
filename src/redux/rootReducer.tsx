import { combineReducers } from "redux";

import counterReducer from "./Counter/counter.reducer";

import loginReducer from "./Login/login.reducer"

import workspacesReducer from "./Workspaces/workspaces.reducer"

import storesReducer from "./Stores/stores.reducer"

const rootReducer = combineReducers({
  counter: counterReducer,
  loginReducer,
  workspacesReducer,
  storesReducer,
});

export default rootReducer;
