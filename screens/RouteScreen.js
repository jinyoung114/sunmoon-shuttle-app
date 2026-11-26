import styles from "../styles/RouteScreen.styles";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
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
