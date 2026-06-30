# SunMoon Shuttle App

선문대학교 셔틀버스 실시간 위치 확인 앱입니다.

기존 Python + Leaflet 기반 웹 시뮬레이션을 React Native 모바일 앱으로 이식하는 프로젝트입니다.

## 주요 기능

- React Native 기반 모바일 앱
- Expo Go를 이용한 iPhone 테스트
- 지도 표시
- 정류장 Marker 표시
- 도로 네트워크 Polyline 표시
- Synthetic GPS 데이터 재생
- 버스 Marker 실시간 이동
- GPS 이동 경로 표시

## 현재 구현 상태

- Home 화면
- 학생 화면
- 기사 화면 기본 UI
- road_network.json 기반 도로망 표시
- synthetic_shuttle_gps_with_outliers.csv 기반 GPS 재생
- gpsRoute.js 기반 버스 위치 시뮬레이션

## 향후 개발 계획

1. Nearest Edge Snap 기반 맵매칭
2. GPS 원본 경로와 맵매칭 경로 동시 표시
3. HMM + Viterbi + Sliding Window 알고리즘 이식
4. Firebase Realtime Database 연동
5. 실제 스마트폰 GPS 수집
6. 정류장별 ETA 제공

## 실행 방법

```bash
npm install
npx expo start
