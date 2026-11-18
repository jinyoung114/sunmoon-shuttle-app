import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  profileCard: {
    backgroundColor: "#003D7C", // 선문대 네이비색 상징
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  userDetail: {
    fontSize: 13,
    color: "#E2E8F0",
    marginTop: 4,
  },
  menuGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#94A3B8",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingHorizontal: 4,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: 15,
    color: "#334155",
    fontWeight: "500",
  },
  menuArrow: {
    fontSize: 20,
    color: "#CBD5E1",
  },
  versionText: {
    fontSize: 14,
    color: "#94A3B8",
  },
  backHomeButton: {
    backgroundColor: "#EF4444",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 30,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  backHomeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default styles;
