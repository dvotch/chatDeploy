import React from "react";
import JoinBlock from "../JoinBlock/joinBlock";
import reducer from "../JoinBlock/reducer";
import { IAppActionTypes, IAppMessage, IAppState } from "./IApp";
import socket from "../../socket";
import Chat from "../Chat/Chat";
import axios from "axios";

function App() {
  const initialState: IAppState = {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  };

  const setUsers = (users: string[]) => {
    dispatch({
      type: IAppActionTypes.SET_USERS,
      payload: users,
    });
  };

  const addMessage = (message: IAppMessage) => {
    dispatch({
      type: IAppActionTypes.NEW_MESSAGE,
      payload: message,
    });
  };

  const onLogin = (obj: { roomId: string; userName: string }) => {
    dispatch({
      type: IAppActionTypes.JOINED,
      payload: obj,
    });
    socket.emit("ROOM:JOIN", obj);
    axios.get(`api/rooms/${obj.roomId}`).then((res) => {
      dispatch({
        type: IAppActionTypes.SET_DATA,
        payload: res.data,
      });
    });
  };
  React.useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", addMessage);
  }, []);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div className="flex justify-center items-center h-screen">
      {!state.joined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Chat state={state} onAddMessage={addMessage} />
      )}
    </div>
  );
}

export default App;
