import { combineReducers } from "redux";

import NavReducer from "./Nav";
import UserReducer from "./User";

export default combineReducers({
  navBar: NavReducer,
  user: UserReducer,
});
