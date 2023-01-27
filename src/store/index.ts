import { createStore, Store } from "redux";
import { NavData } from "./ducks/Nav/types";
import rootReducer from "./ducks/rootReducer";
import { IUser } from "./ducks/User/types";

export interface ApplicationState {
  navBar: NavData;
  user: IUser
}

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;
