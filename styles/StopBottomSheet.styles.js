import { StyleSheet } from "react-native";

export const getSheetHeight = (mapHeight) => Math.min(360, mapHeight * 0.55);
export const sheetMotion = (height, progress) => ({
  height,
  transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }) }],
});

export default StyleSheet.create({
  sheet: { position: "absolute", left: 0, right: 0, bottom: 0, backgroundColor: "#FFFFFF", borderTopLeftRadius: 40, borderTopRightRadius: 40, elevation: 12, shadowColor: "#163B40", shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.13, shadowRadius: 10, zIndex: 10 },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: "#DCE5E6", alignSelf: "center", marginTop: 9, marginBottom: 3 },
  header: { flexDirection: "row", alignItems: "center", paddingLeft: 7, paddingRight: 8, minHeight: 52, borderBottomWidth: 1, borderBottomColor: "#E8EEEE", gap: 9 },
  favoriteButton: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  stopName: { flex: 1, color: "#19383C", fontSize: 22, fontWeight: "700", paddingVertical: 8 },
  closeButton: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  closeText: { color: "#7D8C8F", fontSize: 28 },
  list: { flex: 1 },
  listContent: { paddingHorizontal: 18, paddingBottom: 8 },
  routeRow: { minHeight: 68, flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#EDF1F2" },
  busIcon: { width: 20, height: 24 },
  routeInfo: { flex: 1 },
  routeName: { color: "#243B3F", fontSize: 17, fontWeight: "600" },
  busCount: { color: "#7B8B8E", fontSize: 12, marginTop: 4 },
  arrivalInfo: { flexShrink: 1, maxWidth: "48%", alignItems: "flex-end" },
  arrivalTime: { color: "#E54848", fontWeight: "600" },
  stopsRemaining: { fontSize: 10, color: "#E54848", marginTop: 4 },
  arrivalPending: { color: "#7B8B8E", fontSize: 12, lineHeight: 17, textAlign: "right" },
  note: { color: "#89999C", fontSize: 12, marginTop: 14 },
  message: { color: "#687E82", fontSize: 13, paddingVertical: 12 },
  error: { color: "#B45309", fontSize: 12, paddingVertical: 8 },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#F3F6F6" },
  scheduleButton: { backgroundColor: "#007D89", minHeight: 44, paddingHorizontal: 16, borderRadius: 22, justifyContent: "center" },
  scheduleText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  refreshButton: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: "#F0F6F6" },
  refreshText: { color: "#007D89", fontSize: 28 },
});
