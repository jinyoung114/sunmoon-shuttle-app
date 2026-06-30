import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

import roadNetwork from "../data/road_network.json";
import { STOPS } from "../data/stops";
import { GPS_POINTS } from "../data/gpsRoute";

export default function StudentScreen({ setScreen }) {
  const [gpsIndex, setGpsIndex] = useState(0);

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

  const passedGpsPath = useMemo(() => {
    return GPS_POINTS.slice(0, gpsIndex + 1).map((point) => ({
      latitude: point.latitude,
      longitude: point.longitude,
    }));
  }, [gpsIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setGpsIndex((prev) => {
        if (prev >= GPS_POINTS.length - 1) return 0;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const busPosition = {
    latitude: GPS_POINTS[gpsIndex].latitude,
    longitude: GPS_POINTS[gpsIndex].longitude,
  };

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
      >
        {roadLines.map((line, index) => (
          <Polyline
            key={`road-${index}`}
            coordinates={line}
            strokeWidth={2}
            strokeColor="#999999"
          />
        ))}

        {passedGpsPath.length > 1 && (
          <Polyline
            coordinates={passedGpsPath}
            strokeWidth={4}
            strokeColor="#000000"
          />
        )}

        {STOPS.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            title={stop.name}
            description={stop.id}
          />
        ))}

        <Marker
          coordinate={busPosition}
          title="셔틀버스"
          description={`GPS ${gpsIndex + 1} / ${GPS_POINTS.length}`}
        >
          <Text style={styles.busIcon}>🚌</Text>
        </Marker>
      </MapView>

      <View style={styles.infoBox}>
        <Text style={styles.title}>학생 화면</Text>
        <Text>GPS 재생: {gpsIndex + 1} / {GPS_POINTS.length}</Text>
        <Text>위도: {busPosition.latitude.toFixed(6)}</Text>
        <Text>경도: {busPosition.longitude.toFixed(6)}</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.backText}>홈으로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoBox: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 30,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  busIcon: {
    fontSize: 34,
  },
  backButton: {
    marginTop: 12,
    backgroundColor: "#111827",
    padding: 10,
    borderRadius: 10,
  },
  backText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});