import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Vibration, Animated as RNAnimated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/store';
import Roulette from '../components/Roulette';
import SwipeCard from '../components/SwipeCard';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Paleta de colores vibrantes para las cartas
const CARD_COLORS = [
  '#ec4899', // Rosa
  '#8b5cf6', // Violeta
  '#3b82f6', // Azul
  '#10b981', // Verde
  '#f59e0b', // Amarillo
  '#ef4444', // Rojo
  '#06b6d4', // Cian
  '#f97316'  // Naranja
];

export default function GameScreen({ navigation }) {
  const { gameMode, getText, getRandomPlayer, getFilteredContent, isHotMode } = useStore();
  const text = getText();
  const rouletteRef = useRef();

  // Estados de flujo de juego
  const [currentPlayer, setCurrentPlayer] = useState({ name: 'Cargando...' });
  const [phase, setPhase] = useState('lobby'); 
  const [currentCard, setCurrentCard] = useState(null);
  const [truthOrDareSelection, setTruthOrDareSelection] = useState(null);
  
  // Estado para el mazo de "Yo Nunca" (evitar repeticiones)
  const [neverDeck, setNeverDeck] = useState([]);

  // Animación para el nombre del jugador
  const fadeAnim = useRef(new RNAnimated.Value(1)).current;

  // --- EFECTOS DE INICIALIZACIÓN ---
  
  useEffect(() => {
    // Si entramos en modo Yo Nunca, inicializamos el mazo barajado
    if (gameMode === 'never') {
      initializeNeverDeck();
    } else {
      // Para otros modos, elegimos un jugador inicial
      setCurrentPlayer(getRandomPlayer());
    }
  }, []);

  const initializeNeverDeck = () => {
    const content = getFilteredContent('never');
    // Algoritmo Fisher-Yates para barajar real
    const shuffled = [...content].sort(() => Math.random() - 0.5);
    setNeverDeck(shuffled);
    // Cargar la primera carta inmediatamente
    loadNextNeverCard(shuffled);
  };

  // --- LÓGICA DE TURNOS ---
  
  const animatePlayerChange = () => {
    // Efecto de parpadeo en el nombre
    fadeAnim.setValue(0);
    RNAnimated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  const nextTurn = () => {
    setCurrentCard(null);
    setTruthOrDareSelection(null);
    const p = getRandomPlayer();
    setCurrentPlayer(p);
    animatePlayerChange();
    setPhase('lobby'); 
  };

  // --- LÓGICA RULETA ---
  const handleSpin = () => {
    rouletteRef.current?.spin();
  };

  const onRouletteStop = (item) => {
    if (item.gender && item.gender !== currentPlayer.gender) {
        setCurrentCard({...item, text: "¡Salvado por género! Gira de nuevo o bebe 1 trago."});
    } else {
        setCurrentCard(item);
    }
    setPhase('result');
    Vibration.vibrate(200);
  };

  // --- LÓGICA YO NUNCA (MEJORADA) ---
  
  const loadNextNeverCard = (deckOverride = null) => {
    let currentDeck = deckOverride || neverDeck;

    // Si se acaban las cartas, re-barajamos y avisamos
    if (currentDeck.length === 0) {
      const content = getFilteredContent('never');
      currentDeck = [...content].sort(() => Math.random() - 0.5);
      // Opcional: Podrías mostrar un Toast aquí diciendo "Barajando..."
    }

    // Extraemos la última carta
    const nextCard = currentDeck.pop();
    setNeverDeck([...currentDeck]); // Actualizamos el estado del mazo

    // Cambiamos de jugador
    const nextPlayer = getRandomPlayer();
    setCurrentPlayer(nextPlayer);
    animatePlayerChange();

    // Asignamos color aleatorio
    const randomColor = CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];

    // Actualizamos la carta actual
    setCurrentCard({ 
      ...nextCard, 
      id: Math.random(), // ID único para forzar re-render
      color: randomColor,
      reader: nextPlayer.name // Guardamos quién la lee en la carta misma
    });
  };

  // --- LÓGICA VERDAD O RETO ---
  const handleChoice = (type) => {
    const content = getFilteredContent('truthOrDare', type);
    const random = content[Math.floor(Math.random() * content.length)];
    setTruthOrDareSelection({ type, card: random });
    setPhase('result');
  };

  // --- RENDERIZADO ---

  // Lobby para Ruleta/Verdad o Reto
  if (phase === 'lobby' && gameMode !== 'never') {
    return (
      <View style={styles.lobbyContainer}>
        <Text style={styles.lobbyLabel}>TURNO DE</Text>
        <RNAnimated.Text style={[styles.lobbyPlayer, {opacity: fadeAnim}]}>
          {currentPlayer?.name}
        </RNAnimated.Text>
        <TouchableOpacity style={styles.lobbyBtn} onPress={() => setPhase('action')}>
          <Text style={styles.lobbyBtnTxt}>¡DALE!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={isHotMode ? ['#450a0a', '#111827'] : ['#111827', '#1f2937']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header Superior */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <FontAwesome5 name="times" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.modeTitle}>{text.ui.modes[gameMode]?.title}</Text>
          
          {/* Badge de Turno Animado */}
          <RNAnimated.View style={[styles.turnBadge, { opacity: fadeAnim, transform: [{scale: fadeAnim}] }]}>
            <FontAwesome5 name="user" size={12} color="white" />
            <Text style={styles.turnText}>{currentPlayer?.name}</Text>
          </RNAnimated.View>
        </View>

        {/* --- AREA DE JUEGO --- */}

        {/* MODO RULETA */}
        {gameMode === 'roulette' && (
          <View style={styles.centerContent}>
            {phase === 'action' && (
              <>
                <Roulette 
                  ref={rouletteRef} 
                  items={getFilteredContent('roulette')} 
                  onStop={onRouletteStop} 
                />
                <TouchableOpacity style={styles.actionBtn} onPress={handleSpin}>
                  <Text style={styles.actionBtnTxt}>{text.ui.actions.spin}</Text>
                </TouchableOpacity>
              </>
            )}
            
            <Modal visible={phase === 'result'} transparent animationType="slide">
              <View style={styles.modalOverlay}>
                <View style={[styles.modalCard, {borderColor: currentCard?.color}]}>
                  <Text style={styles.modalTitle}>{currentPlayer?.name}, te toca:</Text>
                  <Text style={styles.modalResult}>{currentCard?.text}</Text>
                  <TouchableOpacity style={styles.modalBtn} onPress={nextTurn}>
                    <Text style={styles.modalBtnTxt}>{text.ui.actions.next}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}

        {/* MODO YO NUNCA */}
        {gameMode === 'never' && (
          <View style={styles.centerContent}>
            
            {/* Aviso grande de turno arriba */}
            <View style={{marginBottom: 20, alignItems: 'center'}}>
               <Text style={styles.readerLabel}>LEE EN VOZ ALTA:</Text>
               <RNAnimated.Text style={[styles.readerName, { opacity: fadeAnim }]}>
                 {currentPlayer?.name}
               </RNAnimated.Text>
            </View>

            <View style={styles.deckArea}>
              {currentCard && (
                <SwipeCard 
                  key={currentCard.id} 
                  item={currentCard} 
                  onSwipeComplete={() => loadNextNeverCard()} 
                />
              )}
            </View>
          </View>
        )}

        {/* MODO VERDAD O RETO */}
        {gameMode === 'truthOrDare' && (
          <View style={styles.centerContent}>
            {phase === 'action' && (
              <>
                <Text style={styles.instruction}>{currentPlayer?.name}, elige:</Text>
                <View style={styles.row}>
                  <TouchableOpacity style={[styles.choiceCard, {backgroundColor: '#3b82f6'}]} onPress={() => handleChoice('truth')}>
                    <FontAwesome5 name="comment" size={40} color="white" />
                    <Text style={styles.choiceTxt}>{text.ui.actions.truth}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.choiceCard, {backgroundColor: '#ef4444'}]} onPress={() => handleChoice('dare')}>
                    <FontAwesome5 name="fist-raised" size={40} color="white" />
                    <Text style={styles.choiceTxt}>{text.ui.actions.dare}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {phase === 'result' && (
              <View style={[styles.modalCard, {borderColor: truthOrDareSelection.type === 'truth' ? '#3b82f6' : '#ef4444', borderWidth: 3}]}>
                <Text style={styles.modalTitle}>{truthOrDareSelection.type === 'truth' ? 'VERDAD' : 'RETO'} PARA {currentPlayer?.name}</Text>
                <Text style={styles.modalResult}>{truthOrDareSelection.card.text}</Text>
                <TouchableOpacity style={styles.modalBtn} onPress={nextTurn}>
                  <Text style={styles.modalBtnTxt}>Siguiente Jugador</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  
  // Lobby
  lobbyContainer: { flex: 1, backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center' },
  lobbyLabel: { color: '#6b7280', fontSize: 20, letterSpacing: 5, marginBottom: 10 },
  lobbyPlayer: { color: 'white', fontSize: 40, fontWeight: '900', marginBottom: 50, textAlign: 'center' },
  lobbyBtn: { backgroundColor: '#3b82f6', paddingHorizontal: 40, paddingVertical: 20, borderRadius: 30 },
  lobbyBtnTxt: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  // Header & Turn Badge
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' },
  backBtn: { padding: 10 },
  modeTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  turnBadge: { flexDirection: 'row', backgroundColor: '#3b82f6', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, alignItems: 'center', gap: 5, elevation: 5 },
  turnText: { color: 'white', fontWeight: 'bold' },

  // General Game Area
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  
  // Yo Nunca Styles
  readerLabel: { color: '#9ca3af', fontSize: 12, letterSpacing: 2, marginBottom: 5 },
  readerName: { color: '#fbbf24', fontSize: 32, fontWeight: '900', textShadowColor: 'rgba(0,0,0,0.5)', textShadowRadius: 10 },
  deckArea: { width: '100%', height: 450, justifyContent: 'center', alignItems: 'center', marginTop: 10 },

  // Ruleta Styles
  actionBtn: { backgroundColor: 'white', paddingHorizontal: 50, paddingVertical: 15, borderRadius: 30, marginTop: 30 },
  actionBtnTxt: { color: 'black', fontWeight: '900', fontSize: 18 },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { backgroundColor: '#1f2937', width: '100%', padding: 30, borderRadius: 20, alignItems: 'center', borderWidth: 2 },
  modalTitle: { color: '#9ca3af', fontSize: 14, marginBottom: 20, textTransform: 'uppercase', textAlign: 'center' },
  modalResult: { color: 'white', fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  modalBtn: { backgroundColor: '#10b981', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 15, width: '100%', alignItems: 'center' },
  modalBtnTxt: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  // Verdad o Reto Styles
  instruction: { color: 'white', fontSize: 24, marginBottom: 40, fontWeight: 'bold', textAlign: 'center' },
  row: { flexDirection: 'row', gap: 20 },
  choiceCard: { width: 140, height: 200, borderRadius: 20, justifyContent: 'center', alignItems: 'center', gap: 20, elevation: 5 },
  choiceTxt: { color: 'white', fontWeight: '900', fontSize: 18 }
});