import React, { BaseSyntheticEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

export interface IJoinBlockProps {}

const FIELDS = {
  USERNAME: "username",
  ROOM: "room",
};

export default function JoinBlock(props: IJoinBlockProps) {
  const { USERNAME, ROOM } = FIELDS;
  const [values, setValues] = React.useState({ [USERNAME]: "", [ROOM]: "" });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e: BaseSyntheticEvent<MouseEvent>) => {
    const isDisabled = Object.values(values).some((value) => !value);
    if (isDisabled) e.preventDefault();
  };

  console.log(values);

  return (
    <div className="flex items-center flex-col gap-2 w-[300px]">
      <input
        className="border-2 w-full h-10 indent-1"
        type="text"
        name="room"
        placeholder="Room ID"
        value={values[ROOM]}
        onChange={handleChange}
      />
      <input
        className="border-2 w-full h-10 indent-1"
        type="text"
        name="username"
        placeholder="Ваше имя"
        value={values[USERNAME]}
        onChange={handleChange}
      />
      <Link
        to={`/chat?username=${values[USERNAME]}&room=${values[ROOM]}`}
        className="text-white bg-green-700 w-full flex justify-center text-center p-2 "
        onClick={handleClick}
      >
        ВОЙТИ
      </Link>
    </div>
  );
}
