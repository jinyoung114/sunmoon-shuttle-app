import styles from "../styles/StopSearch.styles";
import React, { useMemo } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function StopSearch({ stops, query, focused, loading, error, onChange, onFocus, onClose, onSelect }) {
  const results = useMemo(() => {
    const normalize = (value) => String(value || "").replace(/\s/g, "").toLowerCase();
    const term = normalize(query);
    return stops.filter((stop) => normalize(stop.name).includes(term) || normalize(stop.id).includes(term));
  }, [stops, query]);
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
        <Text style={styles.caption}>선택 노선의 정류장</Text>
        {error ? <Text style={styles.message}>정류장 정보를 불러오지 못했습니다.</Text>
          : loading ? <Text style={styles.message}>정류장을 불러오는 중입니다.</Text>
          : results.length === 0 ? <Text style={styles.message}>검색 결과가 없습니다.</Text>
          : <ScrollView keyboardShouldPersistTaps="handled" style={styles.list}>
            {results.map((stop) => <TouchableOpacity key={stop.id} style={styles.result} accessibilityRole="button"
              accessibilityLabel={`${stop.name || stop.id} 정류장 보기`} onPress={() => onSelect(stop)}>
              <View style={styles.dot} /><Text style={styles.name}>{stop.name || stop.id}</Text><Text style={styles.arrow}>›</Text>
            </TouchableOpacity>)}
          </ScrollView>}
      </View>}
    </View>
  );
}
