import { createStore, Store } from "redux";
import { NavData } from "./ducks/Nav/types";
import rootReducer from "./ducks/rootReducer";

export interface ApplicationState {
  navBar: NavData;
}

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;
