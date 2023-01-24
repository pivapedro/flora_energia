/**
 * Action types
 */
export enum NavActionsTypes {
  SET_NAV = "@nav/SET_OPTION",
  GET_NAV = "@nav/LOAD_OPTION",
 }

/**
 * Data types
 */
export enum IOptions {
  about,
  proposal,
  signature,
}

export interface NavData {
  active: IOptions
}
 
 
