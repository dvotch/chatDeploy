import * as React from "react";
import { IAppState } from "../App/IApp";

export interface IChatProps {
  state: IAppState;
}

export default function Chat(props: IChatProps) {
  const [text, setText] = React.useState("");
  return (
    <div className="flex align-center w-1/2 h-1/2 border-2 font-sans">
      <div className="flex flex-col w-1/4 bg-gray-200 p-2 gap-1 ">
        <b>Users ({props.state.users.length}):</b>
        {props.state.users.map((user) => (
          <li className="p-1 font-medium bg-white rounded-sm list-none">
            {user}
          </li>
        ))}
      </div>
      <div className="flex flex-col w-3/4 p-4 gap-2">
        <div className="flex flex-col h-3/5 gap-2 border-b-2">
          <div>
            <p className="fle p-2 rounded-md bg-indigo-400 text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
            <span className="text-gray-400">Test User</span>
          </div>
          <div>
            <p className="fle p-2 rounded-md bg-indigo-400 text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
            <span className="text-gray-400">Test User</span>
          </div>
        </div>
        <textarea
          className="h-1/3 border-2"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="flex align-center justify-center text-white bg-blue-600 w-1/5 p-2">
          Send
        </button>
      </div>
    </div>
  );
}
