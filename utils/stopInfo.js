// A route serving a stop does not imply that every active bus is approaching it.
// Until ETA/direction data exists, report route membership and active buses only.
export function getStopRoutes(stopId, routes, routeStopsById) {
  if (!stopId) return [];
  return routes.filter((route) => (routeStopsById[route.id] ?? []).includes(stopId));
}

export function readActiveBuses(snapshot) {
  const buses = [];
  snapshot.forEach((child) => {
    const data = child.val();
    if (data?.trip_active === true && Number.isFinite(data.lat) && Number.isFinite(data.lon)
      && Math.abs(data.lat) <= 90 && Math.abs(data.lon) <= 180) {
      buses.push({ ...data, bus_id: child.key });
    }
  });
  return buses;
}
