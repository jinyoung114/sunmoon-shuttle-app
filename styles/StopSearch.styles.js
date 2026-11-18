import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  field: { minHeight: 44, borderRadius: 22, backgroundColor: "#F0F3F4", flexDirection: "row", alignItems: "center", paddingLeft: 16 },
  searchIcon: { width: 13, height: 13, borderRadius: 7, borderWidth: 1.5, borderColor: "#687E82", marginRight: 12 },
  searchHandle: { position: "absolute", width: 6, height: 1.5, backgroundColor: "#687E82", right: -4, bottom: -2, transform: [{ rotate: "45deg" }] },
  input: { flex: 1, minHeight: 44, color: "#19383C", fontSize: 14, paddingVertical: 10 },
  close: { width: 44, minHeight: 44, alignItems: "center", justifyContent: "center" },
  closeText: { color: "#687E82", fontSize: 25 },
  results: { position: "absolute", top: 50, left: 0, right: 0, backgroundColor: "#FFFFFF", borderRadius: 16, paddingVertical: 8, elevation: 10, shadowColor: "#163B40", shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  caption: { color: "#7A9093", fontSize: 11, marginHorizontal: 16, marginVertical: 8 },
  list: { maxHeight: 220 },
  result: { flexDirection: "row", alignItems: "center", minHeight: 48, paddingHorizontal: 16, paddingVertical: 10, gap: 10 },
  dot: { width: 8, height: 8, borderWidth: 2, borderColor: "#007D89", borderRadius: 4 },
  name: { flex: 1, color: "#19383C", fontSize: 14 },
  arrow: { color: "#8AA0A3", fontSize: 22 },
  message: { padding: 16, color: "#687E82", fontSize: 13 },
});

export default styles;
