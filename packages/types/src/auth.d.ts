import { IUser } from "./user";

export interface StateType {
  user?: IUser | null;
  isAuthenticated: boolean;
  isClassicSignUp?: boolean;
}

export interface PayloadType {
  type: string;
  payload?: any;
}

export interface AuthType {
  state: StateType;
  dispatch: React.Dispatch<PayloadType>
}