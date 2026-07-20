import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";

export default function DriverScreen({ setScreen }) {
  const [isDriving, setIsDriving] = useState(false);
  const [location, setLocation] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const subscriptionRef = useRef(null);

  // 컴포넌트 언마운트 시 위치 추적 구독 해제
  useEffect(() => {
    return () => {
      stopLocationTracking();
    };
  }, []);

  const stopLocationTracking = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.remove();
      subscriptionRef.current = null;
    }
  };

  const handleStartDriving = async () => {
    setErrorMsg(null);

    // 1. 위치 정보 권한 요청
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      const msg = "위치 정보 접근 권한이 거부되었습니다.";
      setErrorMsg(msg);
      Alert.alert("권한 오류", msg);
      return;
    }

    setIsDriving(true);

    // 2. 실시간 위치 추적 시작 (최고 신뢰도 네비게이션 모드 및 거리제한 0m)
    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation, // 네비게이션용 최고 정밀도 모드
          timeInterval: 1000, // 1초(1000ms) 간격 수신 시도
          distanceInterval: 0, // 0m (이동하지 않아도 매초 수신)
        },
        (newLocation) => {
          setLocation(newLocation.coords);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      );
      subscriptionRef.current = subscription;
    } catch (error) {
      console.error("위치 추적 오류:", error);
      setErrorMsg("위치 정보를 가져오는 중 오류가 발생했습니다.");
    }
  };

  const handleStopDriving = () => {
    stopLocationTracking();
    setIsDriving(false);
  };

  const handleGoHome = () => {
    stopLocationTracking();
    if (setScreen) {
      setScreen("home");
    }
  };

  // 속도(m/s -> km/h 변환, 음수일 경우 0 처리)
  const formatSpeed = (speed) => {
    if (speed === null || speed === undefined || speed < 0) return "0.0 km/h";
    return `${(speed * 3.6).toFixed(1)} km/h`;
  };

  // 방위각(Heading) 표시 텍스트
  const formatHeading = (heading) => {
    if (heading === null || heading === undefined || heading < 0) return "N/A";
    return `${heading.toFixed(1)}°`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>기사 운행 화면</Text>

      {/* 운행 상태 표시 */}
      <View style={styles.statusBadgeContainer}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: isDriving ? "#10B981" : "#9CA3AF" },
          ]}
        />
        <Text style={styles.statusText}>
          {isDriving ? "운행 중 (GPS 추적 활성화)" : "운행 대기"}
        </Text>
      </View>

      {/* 에러 메시지 표시 */}
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      {/* GPS 데이터 실시간 표시 카드 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 실시간 GPS 정보</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>위도 (Latitude)</Text>
          <Text style={styles.infoValue}>
            {location?.latitude ? location.latitude.toFixed(6) : "-"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>경도 (Longitude)</Text>
          <Text style={styles.infoValue}>
            {location?.longitude ? location.longitude.toFixed(6) : "-"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>속도 (Speed)</Text>
          <Text style={styles.infoValue}>{formatSpeed(location?.speed)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>방향 (Heading)</Text>
          <Text style={styles.infoValue}>
            {formatHeading(location?.heading)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>마지막 갱신</Text>
          <Text style={styles.infoValue}>{lastUpdated || "-"}</Text>
        </View>
      </View>

      {/* 컨트롤 버튼 그룹 */}
      <TouchableOpacity
        style={[styles.startButton, isDriving && styles.buttonDisabled]}
        onPress={handleStartDriving}
        disabled={isDriving}
      >
        <Text style={styles.buttonText}>
          {isDriving ? "운행 중..." : "운행 시작"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.stopButton, !isDriving && styles.buttonDisabled]}
        onPress={handleStopDriving}
        disabled={!isDriving}
      >
        <Text style={styles.buttonText}>운행 종료</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleGoHome}>
        <Text style={styles.backText}>홈으로</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1F2937",
    textAlign: "center",
  },
  statusBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "600",
  },
  errorText: {
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "700",
  },
  startButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  stopButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
  },
  backButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  backText: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 15,
  },
});