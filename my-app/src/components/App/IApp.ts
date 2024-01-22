export enum IAppActionTypes {
  JOINED = "JOINED",
  SET_USERS = "SET_USERS",
  NEW_MESSAGE = "NEW_MESSAGE",
  SET_DATA = "SET_DATA",
}

type JOINED = {
  type: IAppActionTypes.JOINED;
  payload: { roomId: string; userName: string };
};

type SET_USERS = {
  type: IAppActionTypes.SET_USERS;
  payload: string[];
};

type NEW_MESSAGE = {
  type: IAppActionTypes.NEW_MESSAGE;
  payload: IAppMessage;
};

type SET_DATA = {
  type: IAppActionTypes.SET_DATA;
  payload: { users: string[]; messages: IAppMessage[] };
};

export type AppActions = JOINED | SET_USERS | NEW_MESSAGE | SET_DATA;

export type IAppState = {
  joined: boolean;
  roomId: null | string;
  userName: null | string;
  users: string[];
  messages: IAppMessage[];
};

export interface IAppMessage {
  userName: string;
  text: string;
}
