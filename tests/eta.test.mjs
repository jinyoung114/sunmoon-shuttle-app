import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';

const source = readFileSync(new URL('../utils/eta.js', import.meta.url), 'utf8');
const { getRouteArrival } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const now = 1000000;
const bus = (seconds, id = 'bus_001') => ({ bus_id: id, route_id: 'route_001', trip_active: true,
  eta: { status: 'estimated', updated_at: now, expires_at: now + 30000,
    arrivals: { STOP_003: { status: 'estimated', estimated_arrival_at: now + seconds * 1000, stops_remaining: 2 } } } });
const arrival = (buses, time = now) => getRouteArrival(buses, 'route_001', 'STOP_003', time);

test('countdown uses the arrival timestamp and selects nearest bus', () => {
  assert.equal(arrival([bus(130), bus(100, 'bus_002')]).busId, 'bus_002');
  assert.equal(arrival([bus(130)], now + 1000).label, '약 2분 9초');
  assert.equal(arrival([bus(130)]).stopsRemaining, 2);
});
test('stale positions, missing ETA, wrong route and ended trips never show countdown', () => {
  assert.equal(arrival([bus(130)], now + 30000).label, '위치 갱신 지연');
  assert.equal(arrival([{ ...bus(10), eta: null }]).label, '도착 정보 준비 중');
  assert.equal(arrival([{ ...bus(10), trip_active: false }]).label, '운행 버스 없음');
  assert.equal(arrival([{ ...bus(10), route_id: 'route_002' }]).label, '운행 버스 없음');
});
test('simulation, near-stop and elapsed predictions are explicit', () => {
  const simulated = bus(10); simulated.eta.simulation = true;
  assert.match(arrival([simulated]).label, /^모의 운행/);
  assert.equal(arrival([bus(0)]).label, '도착 확인 중');
  const nearby = bus(0); nearby.eta.arrivals.STOP_003.status = 'near_stop';
  assert.equal(arrival([nearby]).label, '정류장 근처');
});
test('missing stop, stopped bus and missing expiry suppress numeric estimates', () => {
  const passed = bus(20); passed.eta.arrivals = {};
  assert.equal(arrival([passed]).estimated, false);
  const stopped = bus(20); stopped.eta.status = 'stopped';
  assert.equal(arrival([stopped]).label, '정차 중 · 계산 대기');
  const invalid = bus(20); delete invalid.eta.expires_at;
  assert.equal(arrival([invalid]).estimated, false);
});
