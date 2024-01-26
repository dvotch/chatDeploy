import * as React from "react";
import socket from "../../socket";
import { useLocation } from "react-router-dom";
import { IMessage, IUseLocation } from "./IChat";

export interface IChatProps {}

export default function Chat(props: IChatProps) {
  const [state, setState] = React.useState<IMessage[]>([]);
  const { search } = useLocation();
  const [params, setParams] = React.useState<IUseLocation>();

  React.useEffect(() => {
    const searchParams = Object.fromEntries(
      new URLSearchParams(search)
    ) as IUseLocation;
    setParams(searchParams);
    socket.emit("ROOM:JOIN", searchParams);
  }, [search]);

  React.useEffect(() => {
    socket.on("ROOM:MESSAGE", (data: IMessage) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  console.log(state);

  return (
    <div className="flex align-center w-1/2 h-1/2 border-2 font-sans">
      <div className="flex flex-col w-1/4 bg-gray-200 p-2 gap-1 ">
        <h1 className="font-bold border-b-2 border-black">
          Комната:{params?.room}
        </h1>
        <h2 className="font-medium">Users :</h2>
      </div>
      <div className="flex flex-col w-3/4 p-4 gap-2">
        <div className="flex flex-col h-4/6 gap-2 border-b-2 overflow-auto">
          {state.map((date) => (
            <div>
              <span className="inline-flex p-2 bg-indigo-200">
                {date.data.message}
              </span>
              <p className="">{date.data.user.username}</p>
            </div>
          ))}
        </div>
        <textarea className="h-1/6 border-2" rows={3}></textarea>
        <button className="flex align-center justify-center text-white bg-blue-600 w-1/5 p-2">
          Send
        </button>
      </div>
    </div>
  );
}
