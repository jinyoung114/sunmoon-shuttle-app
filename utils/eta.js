const STATUS_LABELS = {
  calculating: "도착 시간 계산 중",
  stopped: "정차 중 · 계산 대기",
  direction_unknown: "운행 방향 확인 중",
  off_route: "운행 경로 확인 중",
  position_jump: "위치 확인 중",
  invalid_timestamp: "GPS 시각 확인 필요",
  stale: "위치 갱신 지연",
  metadata_unavailable: "노선 정보 확인 필요",
  unavailable: "도착 정보 확인 중",
  completed: "이번 운행 통과",
};

export function getRouteArrival(buses, routeId, stopId, now) {
  const active = buses.filter((bus) => bus.route_id === routeId && bus.trip_active === true);
  if (!active.length) return { label: "운행 버스 없음", estimated: false };
  const candidates = [];
  const labels = [];
  for (const bus of active) {
    const eta = bus.eta;
    if (!eta) { labels.push("도착 정보 준비 중"); continue; }
    if (eta.status === "stale") { labels.push(STATUS_LABELS.stale); continue; }
    // Metadata failures do not contain a clock. Never treat missing expiry as valid.
    if (["metadata_unavailable", "unavailable"].includes(eta.status)) {
      labels.push(STATUS_LABELS[eta.status]); continue;
    }
    if (!Number.isFinite(eta.updated_at) || !Number.isFinite(eta.expires_at)
      || now >= eta.expires_at || eta.updated_at > now + 5000) {
      labels.push(STATUS_LABELS.stale); continue;
    }
    if (eta.status !== "estimated") { labels.push(STATUS_LABELS[eta.status] || "도착 정보 확인 중"); continue; }
    const arrival = eta.arrivals?.[stopId];
    if (!arrival) { labels.push("이번 운행 도착 대상 없음"); continue; }
    if (!["estimated", "near_stop"].includes(arrival.status) || !Number.isFinite(arrival.estimated_arrival_at)) {
      labels.push("도착 시간 계산 중"); continue;
    }
    candidates.push({ ...arrival, busId: bus.bus_id, simulation: eta.simulation === true });
  }
  candidates.sort((a, b) => a.estimated_arrival_at - b.estimated_arrival_at);
  if (!candidates.length) return { label: labels.includes(STATUS_LABELS.stale) ? STATUS_LABELS.stale : labels[0], estimated: false };
  const first = candidates[0];
  const seconds = Math.max(0, Math.ceil((first.estimated_arrival_at - now) / 1000));
  let label = first.status === "near_stop" ? "정류장 근처" : seconds === 0 ? "도착 확인 중" : `약 ${Math.floor(seconds / 60)}분 ${seconds % 60}초`;
  if (first.simulation) label = `모의 운행 · ${label}`;
  return { label, estimated: true, busId: first.busId,
    stopsRemaining: Number.isInteger(first.stops_remaining) && first.stops_remaining > 0 ? first.stops_remaining : null };
}
