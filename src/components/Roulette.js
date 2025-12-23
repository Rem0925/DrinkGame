import React, { forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing, 
  runOnJS 
} from 'react-native-reanimated';
import Svg, { Path, G, Text as SvgText } from 'react-native-svg';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.9;
const RADIUS = WHEEL_SIZE / 2;

const Roulette = forwardRef(({ items, onStop }, ref) => {
  const rotation = useSharedValue(0);
  
  // Aseguramos que haya items suficientes para dibujar la rueda
  const wheelItems = items.length > 0 ? items : [{text: '...', color: '#ccc'}];
  const sliceAngle = 360 / wheelItems.length;

  useImperativeHandle(ref, () => ({
    spin: () => {
      // Girar entre 5 y 10 vueltas completas + un ángulo aleatorio
      const spins = 360 * (5 + Math.floor(Math.random() * 5));
      const randomAngle = Math.floor(Math.random() * 360);
      const totalRotation = spins + randomAngle;

      // Calcular índice ganador basado en el ángulo final
      // Nota: La flecha está arriba (270 grados en círculo trigonométrico), 
      // ajustamos la lógica según la rotación.
      const normalizedRotation = totalRotation % 360;
      const arrowPosition = (360 - normalizedRotation + 90) % 360; // +90 por la flecha arriba
      const winnerIndex = Math.floor(arrowPosition / sliceAngle);
      
      // Feedback táctil
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      rotation.value = withTiming(totalRotation, {
        duration: 4000,
        easing: Easing.out(Easing.cubic),
      }, (finished) => {
        if (finished) {
          // Normalizar rotación para la próxima vez
          rotation.value = totalRotation % 360;
          const winner = wheelItems[winnerIndex % wheelItems.length];
          runOnJS(onStop)(winner);
          runOnJS(Haptics.notificationAsync)(Haptics.NotificationFeedbackType.Success);
        }
      });
    }
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }]
  }));

  // Función para crear segmentos de la rueda
  const createSlice = (startAngle, endAngle, color) => {
    const x1 = RADIUS + RADIUS * Math.cos(Math.PI * startAngle / 180);
    const y1 = RADIUS + RADIUS * Math.sin(Math.PI * startAngle / 180);
    const x2 = RADIUS + RADIUS * Math.cos(Math.PI * endAngle / 180);
    const y2 = RADIUS + RADIUS * Math.sin(Math.PI * endAngle / 180);

    return `M${RADIUS},${RADIUS} L${x1},${y1} A${RADIUS},${RADIUS} 0 0,1 ${x2},${y2} Z`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointer} />
      <Animated.View style={[styles.wheelContainer, animatedStyle]}>
        <Svg height={WHEEL_SIZE} width={WHEEL_SIZE} viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
          <G>
            {wheelItems.map((item, index) => {
              const startAngle = index * sliceAngle;
              const endAngle = startAngle + sliceAngle;
              return (
                <G key={index}>
                  <Path
                    d={createSlice(startAngle, endAngle, item.color)}
                    fill={item.color}
                    stroke="#1f2937" // Borde oscuro para separar
                    strokeWidth="2"
                  />
                  {/* Texto simple o Icono podría ir aquí, pero es complejo rotarlo en SVG puro sin glitches */}
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View>
      {/* Círculo central decorativo */}
      <View style={styles.centerKnob}>
         <Text style={styles.knobText}>DRINK</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginVertical: 30 },
  wheelContainer: { width: WHEEL_SIZE, height: WHEEL_SIZE },
  pointer: {
    position: 'absolute',
    top: -20,
    zIndex: 10,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderTopWidth: 40,
    borderTopColor: '#fbbf24', // Color dorado para la flecha
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  centerKnob: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#e5e7eb',
    elevation: 5
  },
  knobText: { fontWeight: '900', fontSize: 10, color: '#111827' }
});

export default Roulette;