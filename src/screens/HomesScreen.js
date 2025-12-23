import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/store';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const { players, addPlayer, removePlayer, setGameMode, getText } = useStore();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const text = getText();

  const handleStart = (mode) => {
    if (players.length < 2 && mode !== 'never') { // Yo nunca puede ser divertido leyendo solo tambien
      alert("Se recomiendan al menos 2 jugadores.");
    }
    setGameMode(mode);
    navigation.navigate('Game');
  };

  return (
    <LinearGradient colors={['#111827', '#1e1b4b']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>DRINK <Text style={{ color: '#3b82f6' }}>UP</Text></Text>
          {/* Botón de Configuración */}
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsBtn}>
            <FontAwesome5 name="cog" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          
          {/* Añadir Jugadores */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{text.ui.addPlayer}</Text>
            <View style={styles.inputRow}>
              <TextInput 
                style={styles.input} 
                placeholder={text.ui.placeholder} 
                placeholderTextColor="#6b7280"
                value={name}
                onChangeText={setName}
              />
              <TouchableOpacity onPress={() => setGender(gender === 'male' ? 'female' : 'male')} style={[styles.genderToggle, {backgroundColor: gender === 'male' ? '#3b82f6' : '#ec4899'}]}>
                 <FontAwesome5 name={gender === 'male' ? 'mars' : 'venus'} size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addBtn} onPress={() => { if(name) { addPlayer(name, gender); setName(''); }}}>
                <FontAwesome5 name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.playerList}>
              {players.map(p => (
                <View key={p.id} style={[styles.playerTag, {borderColor: p.gender === 'male' ? '#3b82f6' : '#ec4899'}]}>
                  <Text style={styles.playerTxt}>{p.name}</Text>
                  <TouchableOpacity onPress={() => removePlayer(p.id)}>
                    <FontAwesome5 name="times" size={12} color="#f87171" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Modos de Juego */}
          <Text style={styles.sectionHeader}>ELIGE UN MODO</Text>
          {['roulette', 'never', 'truth'].map((modeKey) => (
             <TouchableOpacity key={modeKey} style={styles.modeCard} onPress={() => handleStart(modeKey === 'truth' ? 'truthOrDare' : modeKey)}>
                <View style={[styles.iconBox, { backgroundColor: modeKey === 'never' ? '#ec4899' : modeKey === 'truth' ? '#f59e0b' : '#3b82f6' }]}>
                  <FontAwesome5 name={modeKey === 'never' ? 'hand-paper' : modeKey === 'truth' ? 'fire' : 'dice'} size={24} color="white" />
                </View>
                <View style={styles.modeInfo}>
                  <Text style={styles.modeTitle}>{text.ui.modes[modeKey]?.title}</Text>
                  <Text style={styles.modeDesc}>{text.ui.modes[modeKey]?.desc}</Text>
                </View>
                <FontAwesome5 name="chevron-right" size={16} color="#4b5563" />
             </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 24, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '900', color: 'white' },
  settingsBtn: { padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12 },
  scroll: { padding: 24 },
  card: { backgroundColor: 'rgba(31, 41, 55, 0.8)', padding: 20, borderRadius: 20, marginBottom: 30 },
  sectionTitle: { color: '#9ca3af', fontWeight: 'bold', marginBottom: 10, fontSize: 12 },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  input: { flex: 1, backgroundColor: '#111827', color: 'white', padding: 12, borderRadius: 10 },
  genderToggle: { width: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  addBtn: { backgroundColor: '#10b981', width: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  playerList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  playerTag: { flexDirection: 'row', backgroundColor: '#111827', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, alignItems: 'center', gap: 8, borderWidth: 1 },
  playerTxt: { color: 'white', fontWeight: 'bold' },
  sectionHeader: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  modeCard: { flexDirection: 'row', backgroundColor: 'rgba(31, 41, 55, 0.9)', padding: 16, borderRadius: 20, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: '#374151' },
  iconBox: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  modeTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  modeDesc: { color: '#9ca3af', fontSize: 13 },
  modeInfo: { flex: 1 }
});