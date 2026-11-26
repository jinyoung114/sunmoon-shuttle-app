import { getRouteArrival } from "../utils/eta";
import useEtaClock from "../hooks/useEtaClock";
import FavoriteStar from "./FavoriteStar";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getBusIcon } from "../data/routes";
import styles, { sheetMotion } from "../styles/StopBottomSheet.styles";

export default function StopBottomSheet({ stop, routes, buses, loading, error, locationError,
  refreshing, refreshError, height, onClose, onSchedule, onRefresh, isFavorite, favoriteBusy, favoriteError, onToggleFavorite }) {
  const progress = useRef(new Animated.Value(0)).current;
  const focused = useIsFocused();
  const now = useEtaClock(focused);

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.timing(progress, { toValue: 1, duration: 240, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [progress, stop.id]);

  useEffect(() => {
    if (!focused) return;
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => { onClose(); return true; });
    return () => subscription.remove();
  }, [focused, onClose]);

  return (
    <Animated.View style={[styles.sheet, sheetMotion(height, progress)]}>
      <View style={styles.handle} />
      <View style={styles.header}>
        <TouchableOpacity onPress={onToggleFavorite} disabled={favoriteBusy} style={styles.favoriteButton}
          accessibilityRole="button" accessibilityLabel={`${stop.name || stop.id} 즐겨찾기 ${isFavorite ? "해제" : "추가"}`}
          accessibilityState={{ selected: isFavorite, disabled: favoriteBusy, busy: favoriteBusy }}>
          <FavoriteStar selected={isFavorite} />
        </TouchableOpacity>
        <Text accessibilityRole="header" style={styles.stopName} numberOfLines={2}>{stop.name || stop.id}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton} accessibilityRole="button" accessibilityLabel="정류장 정보 닫기">
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {favoriteError && <Text accessibilityLiveRegion="polite" style={styles.error}>{favoriteError}</Text>}
        {loading && <Text style={styles.message}>경유 노선을 불러오는 중입니다.</Text>}
        {error && <Text style={styles.error}>일부 정류장 경유 정보를 불러오지 못했습니다.</Text>}
        {!loading && !error && routes.length === 0 && <Text style={styles.message}>등록된 경유 노선이 없습니다.</Text>}
        {routes.map((route) => {
          const count = buses.filter((bus) => bus.route_id === route.id).length;
          const arrival = locationError ? { label: "위치 수신 오류", estimated: false }
            : getRouteArrival(buses, route.id, stop.id, now);
          return (
            <View key={route.id} style={styles.routeRow}>
              <Image source={getBusIcon(route.id)} style={styles.busIcon} resizeMode="contain" />
              <View style={styles.routeInfo}>
                <Text style={styles.routeName}>{route.label}</Text>
                <Text style={styles.busCount}>{locationError ? "위치 정보를 불러오지 못했습니다" : count > 0 ? `노선 운행 중 ${count}대` : "현재 운행 버스 없음"}</Text>
              </View>
              <View style={styles.arrivalInfo}>
                <Text style={[styles.arrivalPending, arrival.estimated && styles.arrivalTime]}>{arrival.label}</Text>
                {arrival.stopsRemaining != null && <Text style={styles.stopsRemaining}>{arrival.stopsRemaining}개 정류장 전</Text>}
              </View>
            </View>
          );
        })}
        <Text style={styles.note}>최근 이동 속도 기준 추정입니다. 추가 정차·교통 지연은 반영되지 않습니다.</Text>
        {refreshError && <Text style={styles.error}>위치를 새로 불러오지 못했습니다. 다시 시도해 주세요.</Text>}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={onSchedule} style={styles.scheduleButton} accessibilityRole="button" accessibilityLabel="운행 시간표 보기">
          <Text style={styles.scheduleText}>◷ 시간표</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRefresh} disabled={refreshing} style={styles.refreshButton}
          accessibilityRole="button" accessibilityLabel="버스 위치 새로고침" accessibilityState={{ disabled: refreshing, busy: refreshing }}>
          {refreshing ? <ActivityIndicator color={styles.refreshText.color} /> : <Text style={styles.refreshText}>↻</Text>}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
