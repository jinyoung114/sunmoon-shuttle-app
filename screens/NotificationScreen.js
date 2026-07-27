import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";

const INITIAL_NOTIFICATIONS = [
  {
    id: "1",
    type: "EMERGENCY",
    title: "기상 악화로 인한 우회 운행 안내",
    content: "현재 폭설로 인해 천안아산역 방면 도로 교통이 극심하게 정체되어, 일부 정류장 진입이 지연될 수 있습니다.",
    time: "방금 전",
    isRead: false,
  },
  {
    id: "2",
    type: "NOTICE",
    title: "2026학년도 2학기 학기 중 운행 시간표 변경",
    content: "개강일 기준(9월 1일)으로 일부 셔틀버스 시간표가 개편되오니 이용에 차질 없으시길 바랍니다.",
    time: "3시간 전",
    isRead: false,
  },
  {
    id: "3",
    type: "SYSTEM",
    title: "선문대 셔틀 앱 피드백 이벤트",
    content: "셔틀버스 위치 서비스 만족도 설문에 참여해 주세요. 추첨을 통해 스타벅스 기프티콘을 드립니다.",
    time: "어제",
    isRead: true,
  },
  {
    id: "4",
    type: "NOTICE",
    title: "하계 방학 기간 단축 운행 실시 안내",
    content: "방학 기간(6월 22일 ~ 8월 31일) 동안은 오전 9시부터 오후 5시까지 감축하여 운행하오니 참고바랍니다.",
    time: "3일 전",
    isRead: true,
  },
];

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case "EMERGENCY":
        return styles.emergencyBadge;
      case "NOTICE":
        return styles.noticeBadge;
      default:
        return styles.systemBadge;
    }
  };

  const getBadgeText = (type) => {
    switch (type) {
      case "EMERGENCY":
        return "긴급";
      case "NOTICE":
        return "공지";
      default:
        return "안내";
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.badge, getBadgeStyle(item.type)]}>
          <Text style={styles.badgeText}>{getBadgeText(item.type)}</Text>
        </View>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text style={[styles.cardTitle, !item.isRead && styles.unreadTitle]}>
        {item.title}
      </Text>
      <Text style={styles.cardContent}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>실시간 알림</Text>
        <Text style={styles.headerSubtitle}>셔틀버스 관련 공지와 긴급 안내사항입니다.</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>도착한 알림이 없습니다.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1E293B",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  unreadCard: {
    borderColor: "#BFDBFE",
    backgroundColor: "#EFF6FF",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  emergencyBadge: {
    backgroundColor: "#FEE2E2",
  },
  noticeBadge: {
    backgroundColor: "#EFF6FF",
  },
  systemBadge: {
    backgroundColor: "#F1F5F9",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1E293B",
  },
  timeText: {
    fontSize: 11,
    color: "#94A3B8",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 6,
  },
  unreadTitle: {
    fontWeight: "800",
    color: "#1E3A8A",
  },
  cardContent: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 14,
  },
});
