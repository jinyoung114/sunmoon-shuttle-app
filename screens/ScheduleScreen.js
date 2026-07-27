import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WEEKDAY_SCHEDULE = {
  toStation: [
    { id: "1", departure: "08:10", arrival: "08:30", note: "등교 집중" },
    { id: "2", departure: "09:00", arrival: "09:20", note: "일반" },
    { id: "3", departure: "10:00", arrival: "10:20", note: "일반" },
    { id: "4", departure: "11:30", arrival: "11:50", note: "점심" },
    { id: "5", departure: "13:00", arrival: "13:20", note: "일반" },
    { id: "6", departure: "14:30", arrival: "14:50", note: "일반" },
    { id: "7", departure: "16:00", arrival: "16:20", note: "하교 집중" },
    { id: "8", departure: "17:30", arrival: "17:50", note: "하교 집중" },
  ],
  toCampus: [
    { id: "1", departure: "08:40", arrival: "09:00", note: "등교 집중" },
    { id: "2", departure: "09:30", arrival: "09:50", note: "일반" },
    { id: "3", departure: "10:30", arrival: "10:50", note: "일반" },
    { id: "4", departure: "12:00", arrival: "12:20", note: "점심" },
    { id: "5", departure: "13:30", arrival: "13:50", note: "일반" },
    { id: "6", departure: "15:00", arrival: "15:20", note: "일반" },
    { id: "7", departure: "16:30", arrival: "16:50", note: "하교 집중" },
    { id: "8", departure: "18:00", arrival: "18:20", note: "막차" },
  ]
};

export default function ScheduleScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("toStation"); // toStation or toCampus

  const currentData = WEEKDAY_SCHEDULE[activeTab];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>셔틀 운행 시간표</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "toStation" && styles.activeTab]}
          onPress={() => setActiveTab("toStation")}
        >
          <Text style={[styles.tabText, activeTab === "toStation" && styles.activeTabText]}>
            학교 ➔ 천안아산역
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "toCampus" && styles.activeTab]}
          onPress={() => setActiveTab("toCampus")}
        >
          <Text style={[styles.tabText, activeTab === "toCampus" && styles.activeTabText]}>
            천안아산역 ➔ 학교
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        <View style={styles.tableHeader}>
          <Text style={[styles.columnHeader, styles.colFlex]}>출발 시간</Text>
          <Text style={[styles.columnHeader, styles.colFlex]}>도착 예정</Text>
          <Text style={[styles.columnHeader, styles.colNote]}>비고</Text>
        </View>

        {currentData.map((item, index) => (
          <View
            key={item.id}
            style={[styles.tableRow, index % 2 === 1 && styles.alternateRow]}
          >
            <Text style={[styles.timeText, styles.colFlex]}>{item.departure}</Text>
            <Text style={[styles.timeText, styles.colFlex, styles.arrivalTime]}>{item.arrival}</Text>
            <View style={[styles.colNote, styles.noteContainer]}>
              <Text style={[
                styles.noteText,
                item.note.includes("집중") && styles.highNote,
                item.note === "막차" && styles.lastBusNote
              ]}>
                {item.note}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.noticeBox}>
          <Text style={styles.noticeTitle}>⚠️ 안내사항</Text>
          <Text style={styles.noticeContent}>
            • 본 시간표는 학기 중 평일 기준 운행 시간표입니다.{"\n"}
            • 방학 기간 및 주말/공휴일은 운행하지 않거나 별도 감축 시간표가 적용됩니다.{"\n"}
            • 도로 정체 상황에 따라 도착 시간이 약 5~10분 정도 지연될 수 있습니다.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#003D7C", // 선문대 테마
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  listContent: {
    padding: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  columnHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    textAlign: "center",
  },
  colFlex: {
    flex: 1,
  },
  colNote: {
    width: 100,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  alternateRow: {
    backgroundColor: "#F8FAFC",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    textAlign: "center",
  },
  arrivalTime: {
    color: "#2563EB",
  },
  noteContainer: {
    alignItems: "center",
  },
  noteText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  highNote: {
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
  },
  lastBusNote: {
    backgroundColor: "#FEE2E2",
    color: "#EF4444",
  },
  noticeBox: {
    marginTop: 24,
    backgroundColor: "#FFFBEB",
    borderColor: "#FEF3C7",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B45309",
    marginBottom: 6,
  },
  noticeContent: {
    fontSize: 12,
    color: "#D97706",
    lineHeight: 18,
  },
});
