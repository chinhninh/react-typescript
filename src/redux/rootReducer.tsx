import { combineReducers } from "redux";

import counterReducer from "./Counter/counter.reducer";

import loginReducer from "./Login/login.reducer"

import workspacesReducer from "./Workspaces/workspaces.reducer"

const rootReducer = combineReducers({
  counter: counterReducer,
  loginReducer,
  workspacesReducer
});

export default rootReducer;
