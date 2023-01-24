import { NavData, NavActionsTypes } from "./types";
import { action } from "typesafe-actions";

export const setNavData = (data: NavData) =>
  action(NavActionsTypes.SET_NAV, { data });
