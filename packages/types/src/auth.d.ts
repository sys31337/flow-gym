import { User } from 'firebase/auth';
import { IUser } from "./user";

export interface StateType {
  user?: User | null;
  currentUser?: IUser | null;
}

export interface PayloadType {
  type: string;
  payload?: any;
}

export interface AuthType {
  state: StateType;
  dispatch: React.Dispatch<PayloadType>
  loading: boolean;
}