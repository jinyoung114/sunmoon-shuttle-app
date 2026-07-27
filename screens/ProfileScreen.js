import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function ProfileScreen({ route }) {
  const setScreen = route?.params?.setScreen;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>선</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>홍길동 (학생)</Text>
          <Text style={styles.userDetail}>컴퓨터공학부 | 202612345</Text>
        </View>
      </View>

      <View style={styles.menuGroup}>
        <Text style={styles.groupTitle}>셔틀 서비스 설정</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>자주 타는 노선 설정</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>실시간 하차 알림 설정</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>알림 푸시 (푸시 알림 ON)</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuGroup}>
        <Text style={styles.groupTitle}>지원 및 안내</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>자주 묻는 질문 (FAQ)</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>건의사항 및 피드백</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <View style={[styles.menuItem, styles.noBorder]}>
          <Text style={styles.menuText}>앱 버전 정보</Text>
          <Text style={styles.versionText}>v1.0.0</Text>
        </View>
      </View>

      {setScreen && (
        <TouchableOpacity
          style={styles.backHomeButton}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.backHomeButtonText}>🚪 역할 선택 화면으로 (홈으로)</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  profileCard: {
    backgroundColor: "#003D7C", // 선문대 네이비색 상징
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  userDetail: {
    fontSize: 13,
    color: "#E2E8F0",
    marginTop: 4,
  },
  menuGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#94A3B8",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingHorizontal: 4,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: 15,
    color: "#334155",
    fontWeight: "500",
  },
  menuArrow: {
    fontSize: 20,
    color: "#CBD5E1",
  },
  versionText: {
    fontSize: 14,
    color: "#94A3B8",
  },
  backHomeButton: {
    backgroundColor: "#EF4444",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 30,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  backHomeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
