// 안전 영역에 맞춰 기존 탭바 크기를 유지합니다.
export function getTabBarStyles(bottom) {
  return {
tabBarActiveTintColor: "#003D7C", // 선문대 상징색 (블루)
          tabBarInactiveTintColor: "#94A3B8", // 비활성 색상
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#E2E8F0",
            height: 60 + bottom,
            paddingBottom: bottom > 0 ? bottom : 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
          },
  };
}
