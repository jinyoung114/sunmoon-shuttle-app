import asanRoadNetwork from "./road_network.json";
import cheonanTerminalRoadNetwork from "./road_network_cheonan_terminal.json";

// 새 노선은 이 목록에 추가합니다. 정류장은 동일한 RTDB 경로에서 구독합니다.
export const ALL_ROUTES_ID = "all";
export const ROUTES = [
  { id: "route_001", label: "아산역 방면", color: "#278460", roadNetwork: asanRoadNetwork },
  { id: "route_002", label: "천안터미널 방면", color: "#EF4444", roadNetwork: cheonanTerminalRoadNetwork },
];

export const ROUTE_OPTIONS = [
  { id: ALL_ROUTES_ID, label: "정류장" },
  ...ROUTES.map(({ id, label }) => ({ id, label })),
];

export function normalizeRouteId(routeId) {
  return ROUTES.some((item) => item.id === routeId) ? routeId : ALL_ROUTES_ID;
}

export function getRouteLabel(routeId) {
  if (routeId === ALL_ROUTES_ID) return "노선 선택";
  return ROUTES.find((item) => item.id === routeId)?.label || routeId || "노선 미지정";
}

// 원본 PNG의 색상을 유지합니다. 전체 보기에서도 버스는 소속 노선 색상으로 표시합니다.
const BUS_ICONS = {
  all: require("../assets/bus-all.png"),
  route_001: require("../assets/bus-asan.png"),
  route_002: require("../assets/bus-cheonan.png"),
};

export function getBusIcon(routeId) {
  return BUS_ICONS[routeId] || BUS_ICONS.all;
}
