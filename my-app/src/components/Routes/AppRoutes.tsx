import * as React from "react";
import { Routes, Route } from "react-router-dom";
import JoinBlock from "../JoinBlock/joinBlock";
import Chat from "../Chat/Chat";

export interface IAppRoutesProps {}

export default function AppRoutes(props: IAppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<JoinBlock />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}
