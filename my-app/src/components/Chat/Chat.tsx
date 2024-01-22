import * as React from "react";
import { IAppState } from "../App/IApp";
import socket from "../../socket";

export interface IChatProps {
  state: IAppState;
  onAddMessage: Function;
}

export default function Chat(props: IChatProps) {
  const [messageValue, setMessageValue] = React.useState("");
  const messagesRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesRef.current!.scrollTo(0, 99999);
  }, [props.state.messages]);

  const onSendMessage = () => {
    if (messageValue) {
      socket.emit("ROOM:NEW_MESSAGE", {
        userName: props.state.userName,
        text: messageValue,
        roomId: props.state.roomId,
      });
      props.onAddMessage({
        userName: props.state.userName,
        text: messageValue,
      });
      setMessageValue("");
    }
  };

  return (
    <div className="flex align-center w-1/2 h-1/2 border-2 font-sans">
      <div className="flex flex-col w-1/4 bg-gray-200 p-2 gap-1 ">
        <h1 className="font-bold border-b-2 border-black">
          Комната: {props.state.roomId}
        </h1>
        <h2 className="font-medium">Users ({props.state.users.length}):</h2>
        {props.state.users.map((user) => (
          <li className="p-1 indent-2 font-medium bg-white rounded-sm list-none">
            {user}
          </li>
        ))}
      </div>
      <div className="flex flex-col w-3/4 p-4 gap-2">
        <div
          className="flex flex-col h-4/6 gap-2 border-b-2 overflow-auto"
          ref={messagesRef}
        >
          {props.state.messages.map((message) => (
            <div>
              <span className=" p-2 rounded-md bg-indigo-400 text-white inline-flex text-lg">
                {message.text}
              </span>
              <p className="text-gray-400">{message.userName}</p>
            </div>
          ))}
        </div>
        <textarea
          className="h-1/6 border-2"
          rows={3}
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
        ></textarea>
        <button
          className="flex align-center justify-center text-white bg-blue-600 w-1/5 p-2"
          onClick={onSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
