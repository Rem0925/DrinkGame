import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../store/store';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { players, addPlayer, removePlayer, getText, isHotMode } = useStore();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const text = getText();

  const handleStart = (mode) => {
    if (players.length < 2) return alert("¡Añade al menos 2 jugadores!");
    useStore.setState({ gameMode: mode });
    navigation.navigate('Game');
  };

  return (
    <LinearGradient 
      colors={isHotMode ? ['#450a0a', '#0f172a'] : ['#132f59', '#0f172a']} 
      style={styles.container}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, paddingTop: insets.top}}>
        <View style={styles.header}>
          <Text style={styles.title}>DRINK <Text style={{ color: isHotMode ? '#ef4444' : '#60a5fa' }}>UP</Text></Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsBtn}>
            <FontAwesome5 name="cog" size={22} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{text.ui.addPlayer}</Text>
            <View style={styles.inputRow}>
              <TextInput 
                style={styles.input} 
                placeholder={text.ui.placeholder} 
                placeholderTextColor="#94a3b8"
                value={name}
                onChangeText={setName}
              />
              <TouchableOpacity 
                onPress={() => setGender(gender === 'male' ? 'female' : 'male')} 
                style={[styles.genderToggle, {backgroundColor: gender === 'male' ? '#3b82f6' : '#ec4899'}]}
              >
                 <FontAwesome5 name={gender === 'male' ? 'mars' : 'venus'} size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addBtn} onPress={() => { if(name) { addPlayer(name, gender); setName(''); }}}>
                <FontAwesome5 name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.playerList}>
              {players.map((p, i) => (
                <Animated.View 
                  entering={FadeInDown.delay(i * 50)} 
                  layout={Layout.springify()}
                  key={p.id} 
                  style={[styles.playerTag, {borderColor: p.gender === 'male' ? '#3b82f6' : '#ec4899'}]}
                >
                  <Text style={styles.playerTxt}>{p.name}</Text>
                  <TouchableOpacity onPress={() => removePlayer(p.id)}>
                    <FontAwesome5 name="times-circle" size={16} color="#f87171" />
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>

          <Text style={styles.sectionHeader}>ELIGE TU DESTINO</Text>
          {['roulette', 'never', 'truth'].map((modeKey) => (
             <TouchableOpacity 
               key={modeKey} 
               style={[styles.modeCard, isHotMode && {borderColor: 'rgba(239, 68, 68, 0.3)'}]} 
               onPress={() => handleStart(modeKey === 'truth' ? 'truthOrDare' : modeKey)}
             >
                <View style={[styles.iconBox, { backgroundColor: modeKey === 'never' ? '#ec4899' : modeKey === 'truth' ? '#f59e0b' : '#3b82f6' }]}>
                  <FontAwesome5 name={modeKey === 'never' ? 'hand-paper' : modeKey === 'truth' ? 'fire' : 'dice'} size={24} color="white" />
                </View>
                <View style={styles.modeInfo}>
                  <Text style={styles.modeTitle}>{text.ui.modes[modeKey]?.title}</Text>
                  <Text style={styles.modeDesc}>{text.ui.modes[modeKey]?.desc}</Text>
                </View>
                <FontAwesome5 name="chevron-right" size={14} color="#475569" />
             </TouchableOpacity>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, paddingBottom: 20, alignItems: 'center' },
  title: { fontSize: 36, fontWeight: '900', color: 'white', letterSpacing: -1 },
  settingsBtn: { width: 45, height: 45, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  scroll: { paddingHorizontal: 24, paddingBottom: 40 },
  card: { backgroundColor: '#1e293b', padding: 20, borderRadius: 24, marginBottom: 30, elevation: 10 },
  sectionTitle: { color: '#94a3b8', fontWeight: '800', marginBottom: 15, fontSize: 12, textTransform: 'uppercase' },
  inputRow: { flexDirection: 'row', gap: 10 },
  input: { flex: 1, backgroundColor: '#0f172a', color: 'white', padding: 14, borderRadius: 15, fontSize: 16 },
  genderToggle: { width: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  addBtn: { backgroundColor: '#10b981', width: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  playerList: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 20 },
  playerTag: { flexDirection: 'row', backgroundColor: '#0f172a', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center', gap: 10, borderWidth: 2 },
  playerTxt: { color: 'white', fontWeight: '700' },
  sectionHeader: { color: 'white', fontSize: 18, fontWeight: '900', marginBottom: 20, letterSpacing: 0.5 },
  modeCard: { flexDirection: 'row', backgroundColor: '#1e293b', padding: 18, borderRadius: 24, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  iconBox: { width: 55, height: 55, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 18 },
  modeTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  modeDesc: { color: '#94a3b8', fontSize: 13, marginTop: 2 },
  modeInfo: { flex: 1 }
});