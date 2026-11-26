import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  stopIcon: { width: 25, height: 25 },
  selectedStopIcon: { width: 40, height: 40 },
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



  mapContainer: { flex: 1, minHeight: 0, backgroundColor: "#FFFFFF", borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -8, paddingBottom: 10, overflow: "hidden" },
  searchArea: { backgroundColor: "#FFFFFF", padding: 12, zIndex: 30, elevation: 12 },
  mapArea: { flex: 1, minHeight: 0, marginHorizontal: 10, backgroundColor: "#EEF3F4", overflow: "hidden", borderRadius: 10},
  fitButton: { position: "absolute", right: 16, width: 46, height: 46, borderRadius: 23, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", elevation: 4, shadowColor: "#163B40", shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  fitIcon: { fontSize: 30, color: "#007D89" },



  busMarker: { width: 23, height: 28 },
  map: {
    flex: 1,
  },
  routeSelector: { position: "absolute", top: 8, left: 8, width: 220, maxWidth: "80%", zIndex: 20, elevation: 8 },

});

export default styles;

export const headerInset = (top) => ({ paddingTop: top + 10 });
export const fitButtonOffset = (height) => ({ bottom: height + 32 });
