import useFavoriteStops from "../hooks/useFavoriteStops";
import styles, { headerInset, fitButtonOffset } from "../styles/MapScreen.styles";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Keyboard, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import StopBottomSheet from "../components/StopBottomSheet";
import { getSheetHeight } from "../styles/StopBottomSheet.styles";
import { getStopRoutes, readActiveBuses } from "../utils/stopInfo";
import StopSearch from "../components/StopSearch";
import RouteSelector from "../components/RouteSelector";
import { ALL_ROUTES_ID, ROUTES, normalizeRouteId, getRouteLabel, getBusIcon } from "../data/routes";
import { ref, onValue, get } from "firebase/database";
import { database } from "../services/firebase";

export default function MapScreen({ route }) {
  const navigation = useNavigation();
  const { favoriteIds, busy: favoriteBusy, error: favoriteError, toggleFavorite } = useFavoriteStops();
  const [fontsLoaded, fontError] = useFonts({
    "ShuttleTitle-Bold": require("../assets/ShuttleTitle-Bold.ttf"),
  });
  useEffect(() => {
    if (fontError) console.warn("[HEADER FONT]", fontError.message);
  }, [fontError]);
  const [buses, setBuses] = useState([]);
  const [locationError, setLocationError] = useState(false);
  const [firebaseStops, setFirebaseStops] = useState([]);
  const [routeStopsById, setRouteStopsById] = useState({});
  const [routeStopsErrors, setRouteStopsErrors] = useState({});
  const [selectedRouteId, setSelectedRouteId] = useState(() =>
    normalizeRouteId(route?.params?.routeId)
  );
  const [selectedStopId, setSelectedStopId] = useState(null);
  const insets = useSafeAreaInsets();
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [stopsLoaded, setStopsLoaded] = useState(false);
  const [stopsError, setStopsError] = useState(false);
  const [mapHeight, setMapHeight] = useState(0);
  const sheetHeight = getSheetHeight(mapHeight);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState(false);
  const refreshPending = useRef(false);
  const busRevision = useRef(0);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  const bottomOverlayHeightRef = useRef(0);
  bottomOverlayHeightRef.current = selectedStopId ? sheetHeight : 0;

  useEffect(() => {
    setSelectedRouteId(normalizeRouteId(route?.params?.routeId));
    setSelectedStopId(null);
  }, [route?.params?.routeId]);

  const visibleRoutes = useMemo(
    () => selectedRouteId === ALL_ROUTES_ID
      ? ROUTES
      : ROUTES.filter((item) => item.id === selectedRouteId),
    [selectedRouteId]
  );

  const roadLines = useMemo(() => visibleRoutes.flatMap((item) =>
    item.roadNetwork.features
      .filter((feature) => feature.geometry?.type === "LineString")
      .map((feature, index) => ({
        id: `${item.id}-${index}`,
        color: item.color,
        coordinates: feature.geometry.coordinates.map(([lng, lat]) => ({
          latitude: lat,
          longitude: lng,
        })),
      }))
  ), [visibleRoutes]);

  // Firebase에서 전체 버스 위치를 실시간 구독합니다.
  useEffect(() => {
    const busRef = ref(database, "busLocations");
    const unsubscribe = onValue(
      busRef,
      (snapshot) => {
        busRevision.current += 1;
        setBuses(readActiveBuses(snapshot));
        setLocationError(false);
      },
      (error) => {
        busRevision.current += 1;
        setBuses([]);
        setLocationError(true);
        console.warn("[FIREBASE BUS LOCATIONS]", error.code);
      }
    );

    return () => unsubscribe();
  }, []);

  // Firebase에서 전체 정류장 정보를 실시간 구독합니다.
  useEffect(() => {
    const stopsRef = ref(database, "stops");

    const unsubscribe = onValue(stopsRef, (snapshot) => {
      const nextStops = [];

      snapshot.forEach((child) => {
        const data = child.val();

        if (
          Number.isFinite(data?.latitude) &&
          Number.isFinite(data?.longitude) &&
          Math.abs(data.latitude) <= 90 && Math.abs(data.longitude) <= 180
        ) {
          nextStops.push({
            id: child.key,
            name: data.name,
            latitude: data.latitude,
            longitude: data.longitude,
          });
        }
      });

      setFirebaseStops(nextStops);
      setStopsLoaded(true);
      setStopsError(false);
    }, (error) => {
      setFirebaseStops([]);
      setStopsLoaded(true);
      setStopsError(true);
      console.warn("[FIREBASE STOPS]", error.code);
    });

    return () => unsubscribe();
  }, []);

  // 기존 RTDB 경로를 유지하고 노선별로 결과를 보관합니다.
  useEffect(() => {
    const unsubscribes = ROUTES.map((item) => onValue(
      ref(database, `routes/${item.id}/directions/outbound/stops`),
      (snapshot) => {
        const stopIds = [];
        snapshot.forEach((child) => {
          const stopId = child.val();
          if (typeof stopId === "string") stopIds.push(stopId);
        });
        setRouteStopsById((previous) => ({ ...previous, [item.id]: stopIds }));
        setRouteStopsErrors((previous) => ({ ...previous, [item.id]: false }));
      },
      (error) => {
        setRouteStopsById((previous) => ({ ...previous, [item.id]: [] }));
        setRouteStopsErrors((previous) => ({ ...previous, [item.id]: true }));
        console.warn("[FIREBASE ROUTE STOPS]", item.id, error.code);
      }
    ));
    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, []);

  const visibleStops = useMemo(() => {
    const stopById = new Map(firebaseStops.map((stop) => [stop.id, stop]));
    const stopIds = new Set(visibleRoutes.flatMap((item) => routeStopsById[item.id] ?? []));
    return [...stopIds].map((id) => stopById.get(id)).filter(Boolean);
  }, [firebaseStops, routeStopsById, visibleRoutes]);

  useEffect(() => {
    if (selectedStopId && !visibleStops.some((stop) => stop.id === selectedStopId)) {
      setSelectedStopId(null);
    }
  }, [visibleStops, selectedStopId]);

  const visibleBuses = useMemo(
    () => selectedRouteId === ALL_ROUTES_ID
      ? buses
      : buses.filter((bus) => bus.route_id === selectedRouteId),
    [buses, selectedRouteId]
  );
  const routeStopsError = visibleRoutes.some((item) => routeStopsErrors[item.id]);

  const selectedStop = firebaseStops.find((stop) => stop.id === selectedStopId);
  const stopRoutes = useMemo(() => getStopRoutes(selectedStopId, ROUTES, routeStopsById), [selectedStopId, routeStopsById]);
  const stopRoutesLoading = ROUTES.some((item) => !(item.id in routeStopsById));
  const stopRoutesError = ROUTES.some((item) => routeStopsErrors[item.id]);
  const closeStop = useCallback(() => setSelectedStopId(null), []);

  const refreshBusLocations = async () => {
    if (refreshPending.current) return;
    refreshPending.current = true;
    setRefreshing(true);
    setRefreshError(false);
    const revision = busRevision.current;
    try {
      const snapshot = await get(ref(database, "busLocations"));
      // Do not overwrite a newer realtime event with an older refresh result.
      if (mounted.current && busRevision.current === revision) {
        setBuses(readActiveBuses(snapshot));
        setLocationError(false);
      }
    } catch (error) {
      if (mounted.current) setRefreshError(true);
      console.warn("[FIREBASE REFRESH]", error.code);
    } finally {
      refreshPending.current = false;
      if (mounted.current) setRefreshing(false);
    }
  };

  const handleRouteSelect = (routeId) => {
    setSelectedRouteId(routeId);
    setSelectedStopId(null);
    setMenuOpen(false);
    setSearchQuery("");
    setSearchFocused(false);
    Keyboard.dismiss();
  };

  const fitRoute = useCallback(() => {
    const coordinates = roadLines.flatMap((line) => line.coordinates);
    if (!mapReady || coordinates.length === 0) return;
    mapRef.current?.fitToCoordinates(coordinates, {
      edgePadding: { top: 90, right: 36, bottom: bottomOverlayHeightRef.current + 36, left: 36 },
      animated: true,
    });
  }, [mapReady, roadLines]);

  // GPS 갱신 때마다 카메라를 이동하지 않고, 노선 변경 시에만 전체 경로를 맞춥니다.
  useEffect(() => { fitRoute(); }, [fitRoute]);

  const selectStop = (stop) => {
    setSelectedStopId(stop.id);
    setSearchQuery("");
    setSearchFocused(false);
    setMenuOpen(false);
    Keyboard.dismiss();
  };

  // Position the selected stop above the sheet after its size is known.
  useEffect(() => {
    if (!selectedStop || !mapReady || mapHeight <= 0) return;
    mapRef.current?.fitToCoordinates([selectedStop], {
      edgePadding: { top: 80, right: 40, bottom: sheetHeight + 20, left: 40 },
      animated: true,
    });
  }, [selectedStop, mapReady, mapHeight, sheetHeight]);

  const dismissOverlays = () => {
    setMenuOpen(false);
    setSearchFocused(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.brandHeader, headerInset(insets.top)]}>
        <View style={styles.brandContent}>
        <Image
          source={require("../assets/school-symbol-fixed.png")}
          style={styles.schoolSymbol}
          resizeMode="contain"
        />
        <Text style={[styles.schoolTitle, fontsLoaded && styles.schoolTitleFont]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
          선문대학교 셔틀버스
        </Text>
        </View>
      </View>
      <View style={styles.mapContainer}>
      <View style={styles.searchArea}>
        <StopSearch
          favoriteIds={favoriteIds}
          stops={visibleStops}
          query={searchQuery}
          focused={searchFocused}
          loading={!stopsLoaded || visibleRoutes.some((item) => !(item.id in routeStopsById))}
          error={stopsError || routeStopsError}
          onChange={setSearchQuery}
          onFocus={() => { setSearchFocused(true); setMenuOpen(false); }}
          onClose={() => { setSearchFocused(false); Keyboard.dismiss(); }}
          onSelect={selectStop}
        />
      </View>
      <View style={styles.mapArea} onLayout={(event) => setMapHeight(event.nativeEvent.layout.height)}>
      <MapView
        ref={mapRef}
        onMapReady={() => setMapReady(true)}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsBuildings={false}
        style={styles.map}
        initialRegion={{
          latitude: 36.799,
          longitude: 127.072,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        onPress={(event) => {
          if (event.nativeEvent?.action === "marker-press") return;
          dismissOverlays(); closeStop();
        }}
      >
        {roadLines.map((line) => (
          <Polyline
            key={line.id}
            coordinates={line.coordinates}
            strokeWidth={4}
            strokeColor={line.color}
          />
        ))}



        {visibleStops.map((stop) => (
          <Marker
            key={`${stop.id}-${selectedStopId === stop.id ? "active" : "inactive"}`}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            title={stop.name}
            description={stop.id}
            onPress={(event) => {
              event.stopPropagation?.();
              selectStop(stop);
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Image
              source={require("../assets/bus-stop.png")}
              style={[styles.stopIcon, selectedStopId === stop.id && styles.selectedStopIcon]}
              resizeMode="contain"
            />
          </Marker>
        ))}


        {visibleBuses.map((bus) => (
          <Marker
            key={`bus-${bus.bus_id}`}
            coordinate={{ latitude: bus.lat, longitude: bus.lon }}
            title={`셔틀버스 ${bus.bus_id}`}
            description={getRouteLabel(bus.route_id)}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Image source={getBusIcon(bus.route_id)} resizeMode="contain"
              style={styles.busMarker} />
          </Marker>
        ))}
      </MapView>

      {menuOpen && (
        <TouchableOpacity style={styles.menuBackdrop} activeOpacity={1}
          accessibilityLabel="노선 목록 닫기" accessibilityRole="button" onPress={() => setMenuOpen(false)} />
      )}
      <View style={styles.routeSelector}>
        <RouteSelector selectedRouteId={selectedRouteId} onSelect={handleRouteSelect}
          open={menuOpen} buses={buses} locationError={locationError}
          onToggle={() => { setMenuOpen(!menuOpen); setSearchFocused(false); Keyboard.dismiss(); }} />
      </View>
      <TouchableOpacity style={[styles.fitButton, fitButtonOffset(selectedStop ? sheetHeight : 0)]}
        accessibilityRole="button" accessibilityLabel="선택 노선 전체 보기"
        onPress={() => { dismissOverlays(); fitRoute(); }}>
        <Text style={styles.fitIcon}>⌖</Text>
      </TouchableOpacity>

      {selectedStop && <StopBottomSheet
        stop={selectedStop} routes={stopRoutes} buses={buses}
        isFavorite={favoriteIds.includes(selectedStop.id)} favoriteBusy={favoriteBusy} favoriteError={favoriteError}
        onToggleFavorite={() => toggleFavorite(selectedStop.id)}
        loading={stopRoutesLoading} error={stopRoutesError || stopsError}
        locationError={locationError} refreshing={refreshing} refreshError={refreshError}
        height={sheetHeight} onClose={closeStop}
        onSchedule={() => navigation.navigate("Schedule")} onRefresh={refreshBusLocations}
      />}
      </View>
      </View>
    </View>
  );
}
