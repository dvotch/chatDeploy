import { trimStr } from "../utils.js";

const users = [];

export const addUser = (user) => {
  console.log(user);
  const userName = trimStr(user.username);
  const userRoom = trimStr(user.room);

  const isExist = users.find(
    (user) =>
      trimStr(user.username) === userName && trimStr(user.room) === userRoom
  );

  !isExist && users.push(user);

  const currentUser = isExist || user;

  return { isExist: !!isExist, user: currentUser };
};
