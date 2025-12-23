import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Vibration, Animated as RNAnimated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/store';
import Roulette from '../components/Roulette';
import SwipeCard from '../components/SwipeCard';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function GameScreen({ navigation }) {
  const { gameMode, getText, getNextPlayer, getFilteredContent, isHotMode, getTargetPlayerName } = useStore();
  const text = getText();
  const rouletteRef = useRef();

  const [currentPlayer, setCurrentPlayer] = useState({ name: '' });
  const [phase, setPhase] = useState('lobby'); // lobby | action | result
  const [currentCard, setCurrentCard] = useState(null);
  const [truthOrDareSelection, setTruthOrDareSelection] = useState(null);
  const [neverDeck, setNeverDeck] = useState([]);
  const scaleAnim = useRef(new RNAnimated.Value(1)).current;

  useEffect(() => {
    if (gameMode === 'never') initializeNeverDeck();
    else nextTurn(true);
  }, []);

  const initializeNeverDeck = () => {
    const content = getFilteredContent('never');
    const shuffled = [...content].sort(() => Math.random() - 0.5);
    setNeverDeck(shuffled);
    loadNextNeverCard(shuffled);
  };

  const processText = (item, activePlayerName) => {
    if (!item) return null;
    let processedText = item.text;
    if (processedText.includes('{target}')) {
      const targetName = getTargetPlayerName(activePlayerName);
      processedText = processedText.replace('{target}', targetName);
    }
    return { ...item, text: processedText };
  };

  const nextTurn = (firstTime = false) => {
    const nextP = getNextPlayer();
    setCurrentPlayer(nextP);
    setPhase('lobby');
    setCurrentCard(null);
    RNAnimated.sequence([
      RNAnimated.timing(scaleAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      RNAnimated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true })
    ]).start();
  };

  const onRouletteStop = (item) => {
    setCurrentCard(processText(item, currentPlayer.name));
    setPhase('result');
    Vibration.vibrate([0, 50, 50]);
  };

  const loadNextNeverCard = (deckOverride = null) => {
    let currentDeck = deckOverride || neverDeck;
    if (currentDeck.length === 0) {
      currentDeck = [...getFilteredContent('never')].sort(() => Math.random() - 0.5);
    }
    const nextCard = currentDeck.pop();
    setNeverDeck([...currentDeck]);
    const nextP = getNextPlayer();
    setCurrentPlayer(nextP);
    setCurrentCard(processText({ ...nextCard, color: '#ec4899', id: Math.random() }, nextP.name));
  };

  const handleChoice = (type) => {
    const content = getFilteredContent('truthOrDare', type);
    const random = content[Math.floor(Math.random() * content.length)];
    setTruthOrDareSelection({ type, card: processText(random, currentPlayer.name) });
    setPhase('result');
  };

  const bgColors = isHotMode ? ['#450a0a', '#111827'] : ['#111827', '#1e1b4b'];

  if (phase === 'lobby' && gameMode !== 'never') {
    return (
      <View style={styles.lobbyContainer}>
        <LinearGradient colors={bgColors} style={StyleSheet.absoluteFill} />
        <Text style={styles.lobbyLabel}>TURNO DE</Text>
        <RNAnimated.Text style={[styles.lobbyPlayer, { transform: [{ scale: scaleAnim }] }]}>
          {currentPlayer?.name}
        </RNAnimated.Text>
        <TouchableOpacity style={styles.lobbyBtn} onPress={() => setPhase('action')}>
          <Text style={styles.lobbyBtnTxt}>¡ESTOY LISTO!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><FontAwesome5 name="times" size={20} color="white" /></TouchableOpacity>
          <Text style={styles.modeTitle}>{text.ui.modes[gameMode]?.title}</Text>
          <View style={styles.turnBadge}><Text style={styles.turnText}>{currentPlayer?.name}</Text></View>
        </View>

        {gameMode === 'roulette' && (
          <View style={styles.centerContent}>
            {phase === 'action' && (
              <><Roulette ref={rouletteRef} items={getFilteredContent('roulette')} onStop={onRouletteStop} />
              <TouchableOpacity style={styles.actionBtn} onPress={() => rouletteRef.current?.spin()}><Text style={styles.actionBtnTxt}>{text.ui.actions.spin}</Text></TouchableOpacity></>
            )}
            <Modal visible={phase === 'result'} transparent animationType="slide">
              <View style={styles.modalOverlay}>
                <View style={[styles.modalCard, {borderColor: currentCard?.color}]}>
                  <Text style={styles.modalTitle}>{currentPlayer?.name}, TU DESTINO:</Text>
                  <Text style={styles.modalResult}>{currentCard?.text}</Text>
                  <TouchableOpacity style={styles.modalBtn} onPress={nextTurn}><Text style={styles.modalBtnTxt}>{text.ui.actions.next}</Text></TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}

        {gameMode === 'never' && (
          <View style={styles.centerContent}>
            <Text style={styles.readerHint}>Lee en voz alta: {currentPlayer?.name}</Text>
            <View style={styles.deckArea}>
              {currentCard && <SwipeCard key={currentCard.id} item={currentCard} onSwipeComplete={loadNextNeverCard} />}
            </View>
          </View>
        )}

        {gameMode === 'truthOrDare' && (
          <View style={styles.centerContent}>
            {phase === 'action' && (
              <View style={styles.row}>
                <TouchableOpacity style={[styles.choiceCard, {backgroundColor: '#3b82f6'}]} onPress={() => handleChoice('truth')}><Text style={styles.choiceTxt}>{text.ui.actions.truth}</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.choiceCard, {backgroundColor: '#ef4444'}]} onPress={() => handleChoice('dare')}><Text style={styles.choiceTxt}>{text.ui.actions.dare}</Text></TouchableOpacity>
              </View>
            )}
            {phase === 'result' && (
              <View style={[styles.modalCard, {borderColor: '#fbbf24', borderWidth: 3}]}>
                <Text style={styles.modalTitle}>{truthOrDareSelection.type.toUpperCase()}</Text>
                <Text style={styles.modalResult}>{truthOrDareSelection.card.text}</Text>
                <TouchableOpacity style={styles.modalBtn} onPress={nextTurn}><Text style={styles.modalBtnTxt}>Siguiente</Text></TouchableOpacity>
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
  lobbyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lobbyLabel: { color: '#6b7280', fontSize: 20, letterSpacing: 5, marginBottom: 10 },
  lobbyPlayer: { color: 'white', fontSize: 40, fontWeight: '900', marginBottom: 50 },
  lobbyBtn: { backgroundColor: '#3b82f6', paddingHorizontal: 40, paddingVertical: 20, borderRadius: 30 },
  lobbyBtnTxt: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' },
  modeTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  turnBadge: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 8, borderRadius: 20 },
  turnText: { color: 'white', fontWeight: 'bold' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  actionBtn: { backgroundColor: 'white', paddingHorizontal: 50, paddingVertical: 15, borderRadius: 30, marginTop: 30 },
  actionBtnTxt: { color: 'black', fontWeight: '900', fontSize: 18 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { backgroundColor: '#1f2937', width: '100%', padding: 30, borderRadius: 20, alignItems: 'center', borderWidth: 2 },
  modalTitle: { color: '#9ca3af', fontSize: 14, marginBottom: 20 },
  modalResult: { color: 'white', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  modalBtn: { backgroundColor: '#10b981', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 15, width: '100%', alignItems: 'center' },
  modalBtnTxt: { color: 'white', fontWeight: 'bold' },
  deckArea: { width: '100%', height: 450, justifyContent: 'center', alignItems: 'center' },
  readerHint: { color: '#9ca3af', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 20 },
  choiceCard: { width: 140, height: 200, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  choiceTxt: { color: 'white', fontWeight: '900', fontSize: 18 }
});