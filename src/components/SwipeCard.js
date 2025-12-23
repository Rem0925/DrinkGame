import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  runOnJS,
  withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function SwipeCard({ item, onSwipeComplete }) {
  // Valores compartidos para la animación
  const translateX = useSharedValue(0);
  const rotation = useSharedValue(0);
  // Contexto para guardar la posición inicial al empezar el gesto
  const startX = useSharedValue(0);

  // Definición del Gesto Paneo (Deslizar)
  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      rotation.value = event.translationX / 20; // Rotación leve al mover
    })
    .onEnd((event) => {
      // Si desliza más de 120px hacia cualquier lado, descartar carta
      if (Math.abs(event.translationX) > 120) {
        const direction = event.translationX > 0 ? 1 : -1;
        // Animación de salida
        translateX.value = withTiming(direction * width * 1.5, { duration: 300 }, () => {
          // Llamar a la función para cargar la siguiente carta (en el hilo JS)
          runOnJS(onSwipeComplete)();
        });
      } else {
        // Si suelta antes, regresa al centro (resorte)
        translateX.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotation.value}deg` }
    ]
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, animatedStyle, { backgroundColor: item.color || '#ec4899' }]}>
         <Text style={styles.intensity}>{item.intensity === 'hot' ? '🔥 HOT' : '😇 SOFT'}</Text>
         <Text style={styles.text}>{item.text}</Text>
         <Text style={styles.hint}>Desliza para siguiente &gt;&gt;</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.85,
    height: 400,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    position: 'absolute', 
  },
  text: { color: 'white', fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  intensity: { position: 'absolute', top: 20, right: 20, color: 'rgba(255,255,255,0.8)', fontWeight: 'bold' },
  hint: { position: 'absolute', bottom: 20, color: 'rgba(255,255,255,0.6)', fontSize: 12 }
});