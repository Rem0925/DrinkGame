import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Vibration, Animated as RNAnimated } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../store/store';
import Roulette from '../components/Roulette';
import SwipeCard from '../components/SwipeCard';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut, ScaleInCenter } from 'react-native-reanimated';

export default function GameScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { gameMode, getText, getNextPlayer, getFilteredContent, isHotMode, getTargetPlayerName } = useStore();
  const text = getText();
  const rouletteRef = useRef();

  const [currentPlayer, setCurrentPlayer] = useState({ name: '' });
  const [phase, setPhase] = useState('lobby'); // lobby -> action -> result
  const [currentCard, setCurrentCard] = useState(null);
  const [truthOrDareSelection, setTruthOrDareSelection] = useState(null);
  const [neverDeck, setNeverDeck] = useState([]);

  useEffect(() => {
    if (gameMode === 'never') initializeNeverDeck();
    else nextTurn(true);
  }, []);

  const initializeNeverDeck = () => {
    const content = getFilteredContent('never');
    setNeverDeck([...content].sort(() => Math.random() - 0.5));
    loadNextNeverCard();
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
  };

  const onRouletteStop = (item) => {
    setCurrentCard(processText(item, currentPlayer.name));
    setPhase('result');
    Vibration.vibrate([0, 50, 50]);
  };

  const loadNextNeverCard = () => {
    const nextP = getNextPlayer();
    setCurrentPlayer(nextP);
    const content = getFilteredContent('never');
    const random = content[Math.floor(Math.random() * content.length)];
    const dynamicItem = processText(random, nextP.name);
    setCurrentCard({ ...dynamicItem, id: Math.random(), color: '#ec4899' });
  };

  const bgColors = isHotMode ? ['#450a0a', '#0f172a'] : ['#132f59', '#0f172a'];

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        
        {/* HEADER PULIDO */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <FontAwesome5 name="times" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.turnBadge}>
            <Text style={styles.turnLabel}>TURNO:</Text>
            <Text style={styles.turnName}>{currentPlayer?.name}</Text>
          </View>
        </View>

        {/* FASES DEL JUEGO CON GUÍAS */}
        <View style={styles.mainContent}>
          {phase === 'lobby' && gameMode !== 'never' && (
            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.centerContent}>
              <Text style={styles.guideText}>¿Preparado, {currentPlayer?.name}?</Text>
              <TouchableOpacity style={styles.mainBtn} onPress={() => setPhase('action')}>
                <Text style={styles.mainBtnTxt}>¡DALE!</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {phase === 'action' && gameMode === 'roulette' && (
            <Animated.View entering={FadeIn} style={styles.centerContent}>
              <Text style={styles.hintText}>Pulsa para girar la rueda</Text>
              <Roulette ref={rouletteRef} items={getFilteredContent('roulette')} onStop={onRouletteStop} />
              <TouchableOpacity style={styles.spinBtn} onPress={() => rouletteRef.current?.spin()}>
                <Text style={styles.spinBtnTxt}>{text.ui.actions.spin}</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {gameMode === 'never' && (
            <View style={styles.centerContent}>
              <Text style={styles.hintText}>Desliza la carta al terminar</Text>
              <View style={styles.deckArea}>
                {currentCard && <SwipeCard key={currentCard.id} item={currentCard} onSwipeComplete={loadNextNeverCard} />}
              </View>
            </View>
          )}

          {/* VERDAD O RETO */}
          {phase === 'action' && gameMode === 'truthOrDare' && (
            <View style={styles.row}>
              <TouchableOpacity style={[styles.choiceCard, {backgroundColor: '#3b82f6'}]} onPress={() => {
                const content = getFilteredContent('truthOrDare', 'truth');
                const random = content[Math.floor(Math.random() * content.length)];
                setTruthOrDareSelection({ type: 'VERDAD', card: processText(random, currentPlayer.name) });
                setPhase('result');
              }}>
                <FontAwesome5 name="comment-dots" size={40} color="white" />
                <Text style={styles.choiceTxt}>VERDAD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.choiceCard, {backgroundColor: '#ef4444'}]} onPress={() => {
                const content = getFilteredContent('truthOrDare', 'dare');
                const random = content[Math.floor(Math.random() * content.length)];
                setTruthOrDareSelection({ type: 'RETO', card: processText(random, currentPlayer.name) });
                setPhase('result');
              }}>
                <FontAwesome5 name="fire-alt" size={40} color="white" />
                <Text style={styles.choiceTxt}>RETO</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* MODAL DE RESULTADOS ESTILO CARTA ORIGINAL */}
        <Modal visible={phase === 'result'} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <Animated.View entering={ScaleInCenter} style={[styles.resultCard, { borderColor: currentCard?.color || '#3b82f6' }]}>
               <Text style={styles.resultType}>{truthOrDareSelection?.type || 'RESULTADO'}</Text>
               <Text style={styles.resultText}>{currentCard?.text || truthOrDareSelection?.card?.text}</Text>
               <TouchableOpacity style={styles.continueBtn} onPress={nextTurn}>
                 <Text style={styles.continueBtnTxt}>CONTINUAR</Text>
               </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' },
  backBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  turnBadge: { backgroundColor: '#1e293b', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 15, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  turnLabel: { color: '#64748b', fontSize: 10, fontWeight: '900' },
  turnName: { color: 'white', fontWeight: '900', fontSize: 16 },
  mainContent: { flex: 1, justifyContent: 'center' },
  centerContent: { alignItems: 'center', padding: 20 },
  guideText: { color: 'white', fontSize: 28, fontWeight: '900', marginBottom: 30, textAlign: 'center' },
  hintText: { color: '#64748b', fontSize: 14, fontWeight: 'bold', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 },
  mainBtn: { backgroundColor: '#3b82f6', paddingHorizontal: 50, paddingVertical: 20, borderRadius: 20, elevation: 5 },
  mainBtnTxt: { color: 'white', fontWeight: '900', fontSize: 20 },
  spinBtn: { backgroundColor: 'white', paddingHorizontal: 60, paddingVertical: 18, borderRadius: 20, marginTop: 40 },
  spinBtnTxt: { color: '#0f172a', fontWeight: '900', fontSize: 18 },
  deckArea: { width: '100%', height: 420, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  choiceCard: { width: 140, height: 200, borderRadius: 25, justifyContent: 'center', alignItems: 'center', gap: 15, elevation: 10 },
  choiceTxt: { color: 'white', fontWeight: '900', fontSize: 18 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.95)', justifyContent: 'center', alignItems: 'center', padding: 30 },
  resultCard: { backgroundColor: '#1e293b', width: '100%', padding: 40, borderRadius: 30, borderWidth: 4, alignItems: 'center' },
  resultType: { color: '#64748b', fontWeight: '900', fontSize: 14, marginBottom: 20, letterSpacing: 2 },
  resultText: { color: 'white', fontSize: 26, fontWeight: '900', textAlign: 'center', marginBottom: 40, lineHeight: 35 },
  continueBtn: { backgroundColor: '#10b981', paddingVertical: 18, paddingHorizontal: 40, borderRadius: 20, width: '100%', alignItems: 'center' },
  continueBtnTxt: { color: 'white', fontWeight: '900', fontSize: 16 }
});