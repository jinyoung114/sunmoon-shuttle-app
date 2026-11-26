import styles from "../styles/ProfileScreen.styles";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

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
