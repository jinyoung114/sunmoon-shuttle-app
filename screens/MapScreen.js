import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import roadNetwork from "../data/road_network.json";
import { STOPS } from "../data/stops";
import { ref, onValue } from "firebase/database";
import { database } from "../services/firebase";

export default function MapScreen() {
  const navigation = useNavigation();
  const [busData, setBusData] = useState(null);
  const [selectedStopId, setSelectedStopId] = useState(null);
  
  const roadLines = useMemo(() => {
    return roadNetwork.features
      .filter((feature) => feature.geometry?.type === "LineString")
      .map((feature) =>
        feature.geometry.coordinates.map(([lng, lat]) => ({
          latitude: lat,
          longitude: lng,
        }))
      );
  }, []);

    // Firebase에서 bus_001 위치 실시간 구독
  useEffect(() => {
    const busRef = ref(database, "busLocations/bus_001");

    const unsubscribe = onValue(busRef, (snapshot) => {
      const data = snapshot.val();

      if (data && data.lat != null && data.lon != null) {
        setBusData(data);
        console.log("[FIREBASE BUS LOCATION]", data);
      } else {
        setBusData(null);
        console.log("[FIREBASE] bus_001 is not operating");
      }
    });

    return () => unsubscribe();
  }, []);

  const busPosition = busData
    ? {
        latitude: busData.lat,
        longitude: busData.lon,
      }
    : null;
  

  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.7955,
          longitude: 127.0875,
          latitudeDelta: 0.035,
          longitudeDelta: 0.035,
        }}
        onPress={() => setSelectedStopId(null)} // 지도 빈 곳 클릭 시 선택 해제
      >
        {roadLines.map((line, index) => (
          <Polyline
            key={`road-${index}`}
            coordinates={line}
            strokeWidth={2}
            strokeColor="#D1D5DB"
          />
        ))}


        {STOPS.map((stop) => (
          <Marker
            key={`${stop.id}-${selectedStopId === stop.id ? "active" : "inactive"}`}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            title={stop.name}
            description={stop.id}
            onPress={() => setSelectedStopId(stop.id)}
            pinColor={selectedStopId === stop.id ? "#EF4444" : "#003D7C"}
          />
        ))}

        {busPosition && (
          <Marker
            coordinate={busPosition}
            title="셔틀버스"
            description={busData?.route_id || "운행 중"}
          >
            <Text style={styles.busIcon}>🚌</Text>
          </Marker>
        )}
      </MapView>

      <View style={styles.infoBox}>
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
              {busData ? "운행중" : "운행 정보 없음"}
            </Text>
          </View>
          <Text style={styles.gpsText}>
            {busData?.route_id || "현재 운행 중인 버스 없음"}
          </Text>
        </View>

        {busPosition && (
          <Text style={styles.coordText}>
            위도: {busPosition.latitude.toFixed(6)} | 경도:{" "}
            {busPosition.longitude.toFixed(6)}
          </Text>
        )}

        {/* 선택된 정류장 정보 동적 표시 카드 */}
        {selectedStopId && (
          <View style={styles.selectedStopContainer}>
            <View style={styles.selectedStopBadge}>
              <Text style={styles.selectedStopLabel}>선택됨</Text>
            </View>
            <Text style={styles.selectedStopName}>
              {STOPS.find((s) => s.id === selectedStopId)?.name || selectedStopId}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  map: {
    flex: 1,
  },
  infoBox: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  scheduleButton: {
    backgroundColor: "#003D7C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scheduleButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0284C7",
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    color: "#0284C7",
    fontWeight: "bold",
  },
  gpsText: {
    fontSize: 12,
    color: "#4B5563",
  },
  coordText: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 4,
  },
  selectedStopContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  selectedStopBadge: {
    backgroundColor: "#003D7C",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  selectedStopLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  selectedStopName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#334155",
    flex: 1,
  },
  clearButton: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  clearButtonText: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "600",
  },
  busIcon: {
    fontSize: 34,
  },
});
