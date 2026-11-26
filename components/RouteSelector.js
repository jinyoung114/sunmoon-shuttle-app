import styles from "../styles/RouteSelector.styles";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { ALL_ROUTES_ID, ROUTE_OPTIONS, getRouteLabel, getBusIcon } from "../data/routes";

export default function RouteSelector({ selectedRouteId, onSelect, open, onToggle, buses = [], locationError }) {
  const countFor = (id) => id === ALL_ROUTES_ID ? buses.length : buses.filter((bus) => bus.route_id === id).length;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.trigger} onPress={onToggle} accessibilityRole="button"
        accessibilityLabel={`노선 선택, ${getRouteLabel(selectedRouteId)}`} accessibilityState={{ expanded: open }}>
        <Image source={getBusIcon(selectedRouteId)} resizeMode="contain"
          style={styles.busIcon} />
        <View style={styles.labelArea}>
          <Text style={styles.label} numberOfLines={1}>{getRouteLabel(selectedRouteId)}</Text>
          <Text style={styles.count}>{locationError ? "위치 수신 오류" : `${countFor(selectedRouteId)}대 운행 중`}</Text>
        </View>
        <Text style={styles.chevron}>{open ? "⌃" : "⌄"}</Text>

      </TouchableOpacity>
      {open && <ScrollView style={styles.menu} keyboardShouldPersistTaps="handled">
        {ROUTE_OPTIONS.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.option, item.id === selectedRouteId && styles.active]}
            onPress={() => onSelect(item.id)} accessibilityRole="button"
            accessibilityLabel={item.label} accessibilityState={{ selected: item.id === selectedRouteId }}>
            <Image source={getBusIcon(item.id)} resizeMode="contain"
              style={styles.busIcon} />
            <Text style={styles.optionLabel}>{item.label}</Text>
            {item.id === selectedRouteId && <Text style={styles.check}>✓</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>}
    </View>
  );
}
