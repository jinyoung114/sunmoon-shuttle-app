import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import StudentScreen from "./screens/StudentScreen";
import DriverScreen from "./screens/DriverScreen";

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "student") {
    return <StudentScreen setScreen={setScreen} />;
  }

  if (screen === "driver") {
    return <DriverScreen setScreen={setScreen} />;
  }

  return <HomeScreen setScreen={setScreen} />;
}