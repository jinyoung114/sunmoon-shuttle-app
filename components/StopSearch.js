import FavoriteStar from "./FavoriteStar";
import { searchStops } from "../utils/favoriteStops";
import styles from "../styles/StopSearch.styles";
import React, { useMemo } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function StopSearch({ stops, query, focused, loading, error, onChange, onFocus, onClose, onSelect, favoriteIds = [] }) {
  const results = useMemo(() => searchStops(stops, query, favoriteIds), [stops, query, favoriteIds]);
  return (
    <View>
      <View style={styles.field}>
        <View style={styles.searchIcon}><View style={styles.searchHandle} /></View>
        <TextInput style={styles.input} placeholder="정류장 검색" placeholderTextColor="#89989B"
          accessibilityLabel="선택 노선의 정류장 검색" value={query} onChangeText={onChange} onFocus={onFocus}
          returnKeyType="search" autoCorrect={false} onSubmitEditing={() => { if (results.length === 1) onSelect(results[0]); }} />
        {(focused || query.length > 0) && <TouchableOpacity style={styles.close} accessibilityRole="button"
          accessibilityLabel="검색 닫기" onPress={() => { onChange(""); onClose(); }}><Text style={styles.closeText}>×</Text></TouchableOpacity>}
      </View>
      {focused && <View style={styles.results}>
        <Text style={styles.caption}>선택 노선의 정류장 · 즐겨찾기 우선</Text>
        {error ? <Text style={styles.message}>정류장 정보를 불러오지 못했습니다.</Text>
          : loading ? <Text style={styles.message}>정류장을 불러오는 중입니다.</Text>
          : results.length === 0 ? <Text style={styles.message}>검색 결과가 없습니다.</Text>
          : <ScrollView keyboardShouldPersistTaps="handled" style={styles.list}>
            {results.map((stop) => <TouchableOpacity key={stop.id} style={styles.result} accessibilityRole="button"
              accessibilityLabel={`${favoriteIds.includes(stop.id) ? "즐겨찾기, " : ""}${stop.name || stop.id} 정류장 보기`} onPress={() => onSelect(stop)}>
              {favoriteIds.includes(stop.id) ? <FavoriteStar selected style={styles.favoriteIcon} /> : <View style={styles.dot} />}<Text style={styles.name}>{stop.name || stop.id}</Text><Text style={styles.arrow}>›</Text>
            </TouchableOpacity>)}
          </ScrollView>}
      </View>}
    </View>
  );
}
