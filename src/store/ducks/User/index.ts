import { Reducer } from "redux";
import { IUser, UserActionsTypes } from "./types";

const INITIAL_STATE: IUser = {};

const reducer: Reducer<IUser> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.GET_USER:
      return state;
    case UserActionsTypes.SET_USER:
      return { ...state, ...action.user };
    default:
      return state;
  }
};

export default reducer;
