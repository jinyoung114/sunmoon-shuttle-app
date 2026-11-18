import styles from "../styles/HomeScreen.styles";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

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
