import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFFFFF", borderRadius: 16, shadowColor: "#163B40", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 6 },
  trigger: { minHeight: 54, flexDirection: "row", alignItems: "center", paddingHorizontal: 12, gap: 9 },
  busIcon: { width: 20, height: 24 },
  labelArea: { flex: 1, paddingVertical: 8 },
  label: { color: "#19383C", fontSize: 13, fontWeight: "700" },
  count: { color: "#007D89", fontSize: 10, marginTop: 3 },
  chevron: { color: "#19383C", fontSize: 21 },
  menu: { maxHeight: 230, borderTopWidth: 1, borderTopColor: "#EEF2F3" },
  option: { minHeight: 48, padding: 12, flexDirection: "row", alignItems: "center", gap: 9 },
  active: { backgroundColor: "#EAF6F6" },
  optionLabel: { flex: 1, color: "#334A4D", fontSize: 13 },
  check: { color: "#007D89", fontWeight: "800" },
});

export default styles;
