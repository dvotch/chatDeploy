export enum IAppActionTypes {
  JOINED = "JOINED",
  SET_USERS = "SET_USERS",
  SET_MESSAGES = "SET_MESSAGES",
}

type JOINED = {
  type: IAppActionTypes.JOINED;
  payload: { roomId: string; userName: string };
};

type SET_USERS = {
  type: IAppActionTypes.SET_USERS;
  payload: string[];
};

type SET_MESSAGES = {
  type: IAppActionTypes.SET_MESSAGES;
  payload: string[];
};

export type AppActions = JOINED | SET_USERS | SET_MESSAGES;

export interface IAppState {
  joined: boolean;
  roomId: null | string;
  userName: null | string;
  users: string[];
  messages: string[];
}
