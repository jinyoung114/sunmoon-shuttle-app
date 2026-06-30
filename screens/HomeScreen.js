import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ setScreen }) {
  return (
    <View style={styles.container}>
      <Text style={styles.bus}>🚌</Text>
      <Text style={styles.title}>SunMoon Shuttle</Text>
      <Text style={styles.subtitle}>실시간 셔틀버스 위치 서비스</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setScreen("student")}
      >
        <Text style={styles.buttonText}>학생 화면</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.driverButton]}
        onPress={() => setScreen("driver")}
      >
        <Text style={styles.buttonText}>기사 화면</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f7fb",
  },
  bus: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    marginTop: 8,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#2f6fed",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  driverButton: {
    backgroundColor: "#111827",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});