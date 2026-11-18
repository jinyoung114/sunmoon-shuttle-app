import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuBackdrop: StyleSheet.absoluteFillObject,
  container: {
    flex: 1,
    backgroundColor: "#007D89",
  },
  schoolSymbol: { width: 40, height: 40, flexShrink: 0 },
  schoolTitle: { flexShrink: 1, color: "#FFFFFF", fontSize: 25, textAlign: "center" },
  schoolTitleFont: { fontFamily: "ShuttleTitle-Bold" },
  brandHeader: { alignItems: "center", paddingHorizontal: 16, paddingBottom: 24, flexShrink: 0 },
  brandContent: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12, maxWidth: "100%" },
  liveBadge: { marginLeft: "auto", flexDirection: "row", alignItems: "center", gap: 4 },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: "#A7F3D0" },
  liveText: { color: "#FFFFFF", fontSize: 9, fontWeight: "700" },
  searchArea: { backgroundColor: "#FFFFFF", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 12, marginTop: -8, zIndex: 30, elevation: 12 },
  mapArea: { flex: 1, backgroundColor: "#EEF3F4", overflow: "hidden" },
  fitButton: { position: "absolute", right: 16, width: 46, height: 46, borderRadius: 23, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", elevation: 4, shadowColor: "#163B40", shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  fitIcon: { fontSize: 30, color: "#007D89" },
  stopMarker: { width: 26, height: 26, borderRadius: 8, backgroundColor: "#FFFFFF", borderWidth: 2, borderColor: "#007D89", alignItems: "center", justifyContent: "center" },
  activeStopMarker: { borderColor: "#F59E0B", backgroundColor: "#FEF3C7", borderWidth: 3 },
  stopMarkerText: { color: "#007D89", fontSize: 17, fontWeight: "900" },
  busMarker: { width: 23, height: 28 },
  map: {
    flex: 1,
  },
  routeSelector: { position: "absolute", top: 12, left: 10, width: 220, maxWidth: "80%", zIndex: 20, elevation: 8 },
  dataErrorText: {
    color: "#B45309",
    fontSize: 12,
    marginTop: 6,
  },
  infoBox: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  scheduleButton: {
    backgroundColor: "#007D89",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scheduleButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0284C7",
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    color: "#0284C7",
    fontWeight: "bold",
  },
  gpsText: {
    flex: 1,
    fontSize: 12,
    color: "#4B5563",
  },
  coordText: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 4,
  },
  selectedStopContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  selectedStopBadge: {
    backgroundColor: "#007D89",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  selectedStopLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  selectedStopName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#334155",
    flex: 1,
  },
  clearButton: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  clearButtonText: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "600",
  },
  busIcon: {
    fontSize: 34,
  },
});

export default styles;

export const headerInset = (top) => ({ paddingTop: top + 10 });
export const fitButtonOffset = (height) => ({ bottom: height + 32 });
