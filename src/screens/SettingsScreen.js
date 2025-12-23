import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/store';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const { language, setLanguage, isHotMode, toggleHotMode, getText } = useStore();
  const text = getText();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
           <FontAwesome5 name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{text.ui.settings}</Text>
      </View>

      <View style={styles.content}>
        {/* Idioma */}
        <View style={styles.card}>
          <Text style={styles.label}>Idioma / Language</Text>
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.optionBtn, language === 'es' && styles.activeBtn]} 
              onPress={() => setLanguage('es')}
            >
              <Text style={styles.btnTxt}>🇪🇸 Español</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.optionBtn, language === 'en' && styles.activeBtn]} 
              onPress={() => setLanguage('en')}
            >
              <Text style={styles.btnTxt}>🇺🇸 English</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modo Picante */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.label}>{text.ui.hotToggle}</Text>
              <Text style={styles.desc}>{isHotMode ? "Preguntas atrevidas activadas" : "Modo tranquilo"}</Text>
            </View>
            <Switch 
              value={isHotMode} 
              onValueChange={toggleHotMode}
              trackColor={{false: "#767577", true: "#ef4444"}}
              thumbColor={isHotMode ? "#fca5a5" : "#f4f3f4"}
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  backBtn: { padding: 10 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginLeft: 10 },
  content: { padding: 20 },
  card: { backgroundColor: '#1f2937', padding: 20, borderRadius: 15, marginBottom: 20 },
  label: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 10 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optionBtn: { flex: 1, padding: 15, borderRadius: 10, backgroundColor: '#374151', alignItems: 'center' },
  activeBtn: { backgroundColor: '#3b82f6' },
  btnTxt: { color: 'white', fontWeight: 'bold' },
  desc: { color: '#9ca3af', fontSize: 12 }
});