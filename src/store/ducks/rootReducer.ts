import { combineReducers } from "redux";

import NavReducer from "./Nav";

export default combineReducers({
  navBar: NavReducer,
});
