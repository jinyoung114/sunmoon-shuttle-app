import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { onValue, ref } from "firebase/database";
import { database } from "../services/firebase";

export default function useEtaClock(focused) {
  const [now, setNow] = useState(Date.now);
  const [offset, setOffset] = useState(0);
  useEffect(() => onValue(ref(database, ".info/serverTimeOffset"), (snapshot) => {
    const value = snapshot.val();
    if (Number.isFinite(value)) setOffset(value);
  }, () => setOffset(0)), []);
  useEffect(() => {
    if (!focused) return;
    const tick = () => setNow(Date.now());
    tick();
    const timer = setInterval(tick, 1000);
    const listener = AppState.addEventListener("change", (state) => { if (state === "active") tick(); });
    return () => { clearInterval(timer); listener.remove(); };
  }, [focused]);
  return now + offset;
}
