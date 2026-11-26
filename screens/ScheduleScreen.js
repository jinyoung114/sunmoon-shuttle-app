import styles from "../styles/ScheduleScreen.styles";
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
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
        <View style={styles.headerSpacer} />
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
