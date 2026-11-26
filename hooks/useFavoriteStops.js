import { useCallback, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAVORITE_STOPS_KEY, parseFavoriteStops, toggleFavoriteId } from "../utils/favoriteStops";

export default function useFavoriteStops() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState(null);
  const idsRef = useRef([]);
  const ready = useRef(false);
  const pending = useRef(false);
  const request = useRef(0);
  const mounted = useRef(false);

  const load = useCallback(async () => {
    const token = ++request.current;
    setBusy(true);
    setError(null);
    try {
      const ids = parseFavoriteStops(await AsyncStorage.getItem(FAVORITE_STOPS_KEY));
      if (!mounted.current || token !== request.current) return;
      idsRef.current = ids;
      ready.current = true;
      setFavoriteIds(ids);
    } catch {
      if (mounted.current && token === request.current) {
        setError("즐겨찾기를 불러오지 못했습니다. 별을 눌러 다시 시도해 주세요.");
      }
    } finally {
      if (mounted.current && token === request.current) setBusy(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => { mounted.current = false; request.current += 1; };
  }, [load]);

  const toggleFavorite = useCallback(async (id) => {
    if (!id || pending.current) return;
    if (!ready.current) { await load(); return; }
    pending.current = true;
    setBusy(true);
    setError(null);
    const next = toggleFavoriteId(idsRef.current, id);
    try {
      await AsyncStorage.setItem(FAVORITE_STOPS_KEY, JSON.stringify(next));
      idsRef.current = next;
      if (mounted.current) setFavoriteIds(next);
    } catch {
      if (mounted.current) setError("즐겨찾기를 저장하지 못했습니다. 다시 눌러 주세요.");
    } finally {
      pending.current = false;
      if (mounted.current) setBusy(false);
    }
  }, [load]);

  return { favoriteIds, busy, error, toggleFavorite };
}
