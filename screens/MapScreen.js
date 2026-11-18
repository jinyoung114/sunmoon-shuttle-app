import styles, { headerInset, fitButtonOffset } from "../styles/MapScreen.styles";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Keyboard, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import StopSearch from "../components/StopSearch";
import RouteSelector from "../components/RouteSelector";
import { ALL_ROUTES_ID, ROUTES, normalizeRouteId, getRouteLabel, getBusIcon } from "../data/routes";
import { ref, onValue } from "firebase/database";
import { database } from "../services/firebase";

export default function MapScreen({ route }) {
  const navigation = useNavigation();
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
  const [infoHeight, setInfoHeight] = useState(140);
  const infoHeightRef = useRef(infoHeight);
  infoHeightRef.current = infoHeight;

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
        const nextBuses = [];
        snapshot.forEach((child) => {
          const data = child.val();
          if (
            data?.trip_active === true &&
            Number.isFinite(data.lat) &&
            Number.isFinite(data.lon) &&
            Math.abs(data.lat) <= 90 &&
            Math.abs(data.lon) <= 180
          ) {
            nextBuses.push({ ...data, bus_id: child.key });
          }
        });
        setBuses(nextBuses);
        setLocationError(false);
      },
      (error) => {
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
  const routeLabel = getRouteLabel(selectedRouteId);
  const routeStopsError = visibleRoutes.some((item) => routeStopsErrors[item.id]);

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
      edgePadding: { top: 90, right: 36, bottom: infoHeightRef.current + 36, left: 36 },
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
    mapRef.current?.fitToCoordinates([stop], {
      edgePadding: { top: 90, right: 48, bottom: infoHeightRef.current + 80, left: 48 },
      animated: true,
    });
  };

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
      <View style={styles.searchArea}>
        <StopSearch
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
      <View style={styles.mapArea}>
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
        onPress={() => { dismissOverlays(); setSelectedStopId(null); }}
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
              style={{
                width: selectedStopId === stop.id ? 40 : 30,
                height: selectedStopId === stop.id ? 40 : 30,
              }}
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
      <TouchableOpacity style={[styles.fitButton, fitButtonOffset(infoHeight)]}
        accessibilityRole="button" accessibilityLabel="선택 노선 전체 보기"
        onPress={() => { dismissOverlays(); fitRoute(); }}>
        <Text style={styles.fitIcon}>⌖</Text>
      </TouchableOpacity>

      <View style={styles.infoBox} onLayout={(event) => setInfoHeight(event.nativeEvent.layout.height)}>
        <View style={styles.header}>
          <Text style={styles.title}>실시간 셔틀 위치</Text>
          <TouchableOpacity
            style={styles.scheduleButton}
            onPress={() => navigation.navigate("Schedule")}
          >
            <Text style={styles.scheduleButtonText}>📅 시간표</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusContainer}>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>
              {locationError ? "위치 수신 오류" : visibleBuses.length > 0 ? `운행중 ${visibleBuses.length}대` : "운행 정보 없음"}
            </Text>
          </View>
          <Text style={styles.gpsText} numberOfLines={1}>
            {locationError ? "위치를 불러오지 못했습니다" : routeLabel || "현재 표시할 버스 위치 없음"}
          </Text>
        </View>

        {routeStopsError && (
          <Text style={styles.dataErrorText}>일부 노선의 정류장을 불러오지 못했습니다.</Text>
        )}

        {visibleBuses.length === 1 && (
          <Text style={styles.coordText}>
            위도: {visibleBuses[0].lat.toFixed(6)} | 경도:{" "}
            {visibleBuses[0].lon.toFixed(6)}
          </Text>
        )}

        {/* 선택된 정류장 정보 동적 표시 카드 */}
        {selectedStopId && (
          <View style={styles.selectedStopContainer}>
            <View style={styles.selectedStopBadge}>
              <Text style={styles.selectedStopLabel}>선택됨</Text>
            </View>
            <Text style={styles.selectedStopName}>
              {firebaseStops.find((s) => s.id === selectedStopId)?.name || selectedStopId}
            </Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSelectedStopId(null)}
            >
              <Text style={styles.clearButtonText}>선택 해제</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      </View>
    </View>
  );
}
