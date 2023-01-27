/**
 * Action types
 */
export enum UserActionsTypes {
  SET_USER = "@user/SET_USER",
  GET_USER = "@user/LOAD_OPTION",
}

/**
 * Data types
 */
export interface IUser {
  hasPDF?: boolean;
  CEP?: string;
  complete?: boolean;
  email?: string;
  invoiceAmount?: number;
  name?: string;
  number?: string;
  phone?: string;
  terms?: boolean;
  documentSize?: number;
  documentName?: string;
  document?: string;
  complement?: string;
}
