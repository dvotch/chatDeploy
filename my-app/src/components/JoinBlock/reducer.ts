import { AppActions, IAppState } from "../App/IApp";

export default (state: IAppState, action: AppActions): IAppState => {
  switch (action.type) {
    case "JOINED":
      return {
        ...state,
        joined: true,
        userName: action.payload.userName,
        roomId: action.payload.roomId,
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "NEW_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "SET_DATA":
      return {
        ...state,
        messages: action.payload.messages,
        users: action.payload.users,
      };
    default:
      return state;
  }
};
