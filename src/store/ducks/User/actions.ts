import { IUser, UserActionsTypes } from "./types";
import { action } from "typesafe-actions";

export const setUserData = (data: IUser) => {
  return action(UserActionsTypes.SET_USER, { user: data });
};
