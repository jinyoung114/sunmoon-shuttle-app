import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerSpacer: { width: 50 },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#003D7C", // 선문대 테마
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  listContent: {
    padding: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  columnHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    textAlign: "center",
  },
  colFlex: {
    flex: 1,
  },
  colNote: {
    width: 100,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  alternateRow: {
    backgroundColor: "#F8FAFC",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    textAlign: "center",
  },
  arrivalTime: {
    color: "#2563EB",
  },
  noteContainer: {
    alignItems: "center",
  },
  noteText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  highNote: {
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
  },
  lastBusNote: {
    backgroundColor: "#FEE2E2",
    color: "#EF4444",
  },
  noticeBox: {
    marginTop: 24,
    backgroundColor: "#FFFBEB",
    borderColor: "#FEF3C7",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B45309",
    marginBottom: 6,
  },
  noticeContent: {
    fontSize: 12,
    color: "#D97706",
    lineHeight: 18,
  },
});

export default styles;
