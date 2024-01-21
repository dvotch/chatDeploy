import React from "react";
import JoinBlock from "../JoinBlock/joinBlock";
import reducer from "../JoinBlock/reducer";
import { IAppActionTypes, IAppState } from "./IApp";
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

  const onLogin = (obj: { roomId: string; userName: string }) => {
    dispatch({
      type: IAppActionTypes.JOINED,
      payload: obj,
    });
    socket.emit("ROOM:JOIN", obj);
    axios
      .get(`api/rooms/${obj.roomId}`)
      .then((res) => setUsers(res.data.users));
  };
  React.useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
  }, []);

  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state);

  return (
    <div className="flex justify-center items-center h-screen">
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat state={state} />}
    </div>
  );
}

export default App;
