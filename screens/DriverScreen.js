import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DriverScreen({ setScreen }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>기사 화면</Text>
      <Text style={styles.desc}>여기에 운행 시작 / GPS 전송 기능을 붙일 예정</Text>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.buttonText}>운행 시작</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.stopButton}>
        <Text style={styles.buttonText}>운행 종료</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setScreen("home")}
      >
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
    backgroundColor: "#f5f7fb",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  desc: {
    color: "#666",
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: "#2f6fed",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  stopButton: {
    backgroundColor: "#ef4444",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  backButton: {
    padding: 14,
  },
  backText: {
    textAlign: "center",
    color: "#111827",
    fontWeight: "bold",
  },
});