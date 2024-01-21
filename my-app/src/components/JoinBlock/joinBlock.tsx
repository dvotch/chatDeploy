import axios from "axios";
import React from "react";

export interface IJoinBlockProps {
  onLogin: Function;
}

export default function JoinBlock(props: IJoinBlockProps) {
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert("Введете данные");
    }
    setLoading(true);
    const obj = {
      roomId,
      userName,
    };
    await axios.post("/api/rooms", obj);
    props.onLogin(obj);
  };

  return (
    <div className="flex items-center flex-col gap-2 w-[300px]">
      <input
        className="border-2 w-full h-10 indent-1"
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        className="border-2 w-full h-10 indent-1"
        type="text"
        placeholder="Ваше имя"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        className="btn btn-success text-white bg-green-700 w-full h-[40px] "
        onClick={onEnter}
      >
        {isLoading ? "ВХОД..." : "ВОЙТИ"}
      </button>
    </div>
  );
}
