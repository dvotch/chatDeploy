export type IUser = {
  username: string;
  room: string;
};
export type EntriesType =
  | [PropertyKey, unknown][]
  | ReadonlyArray<readonly [PropertyKey, unknown]>;
