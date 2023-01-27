import { Reducer } from "redux";
import { NavData, NavActionsTypes, IOptions } from "./types";

const INITIAL_STATE: NavData = {
  active: IOptions["about"],
};

const reducer: Reducer<NavData> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NavActionsTypes.GET_NAV:
      return state;
    case NavActionsTypes.SET_NAV:
      return { ...state, active: action.active };
    default:
      return state;
  }
};

export default reducer;
