import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { STOPS } from "../data/stops";

export default function RouteScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>셔틀 운행 노선</Text>
        <Text style={styles.headerSubtitle}>선문대 캠퍼스 ↔ 천안아산역 구간</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>천안아산역 순환 노선</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>평일 운행</Text>
          </View>
        </View>

        <Text style={styles.cardDescription}>
          학교에서 출발하여 중간 경유역을 지나 천안아산역까지 왕복하는 기본 순환 노선입니다.
        </Text>

        <View style={styles.timelineContainer}>
          {STOPS.map((stop, index) => {
            const isFirst = index === 0;
            const isLast = index === STOPS.length - 1;

            return (
              <View key={stop.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={[
                    styles.node,
                    isFirst && styles.startNode,
                    isLast && styles.endNode
                  ]}>
                    <Text style={styles.nodeText}>{index + 1}</Text>
                  </View>
                  {isLast ? null : <View style={styles.line} />}
                </View>

                <View style={styles.timelineRight}>
                  <Text style={styles.stopName}>{stop.name}</Text>
                  <Text style={styles.stopDetail}>정류장 ID: {stop.id}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Schedule")}
        >
          <Text style={styles.actionButtonText}>📅 전체 운행 시간표 확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>💡 이용 안내</Text>
        <Text style={styles.infoText}>• 교통 사정에 따라 도착 시간이 다소 변동될 수 있습니다.</Text>
        <Text style={styles.infoText}>• 셔틀버스는 정해진 정류장에서만 승하차가 가능합니다.</Text>
        <Text style={styles.infoText}>• 문의사항: 선문대학교 학생지원팀 (041-530-xxxx)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1E293B",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  badge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "700",
  },
  cardDescription: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 20,
  },
  timelineContainer: {
    marginVertical: 10,
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: "row",
    minHeight: 65,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 16,
  },
  node: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#94A3B8",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  startNode: {
    backgroundColor: "#2563EB",
  },
  endNode: {
    backgroundColor: "#003D7C",
  },
  nodeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#E2E8F0",
    position: "absolute",
    top: 26,
    bottom: 0,
  },
  timelineRight: {
    flex: 1,
    paddingTop: 2,
  },
  stopName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },
  stopDetail: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  actionButton: {
    backgroundColor: "#003D7C",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  infoCard: {
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 4,
  },
});
