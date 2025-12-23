import React, { forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import Svg, { Path, G } from 'react-native-svg';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.85;
const RADIUS = WHEEL_SIZE / 2;

const Roulette = forwardRef(({ items, onStop }, ref) => {
  const rotation = useSharedValue(0);
  const wheelItems = items.length > 0 ? items : [{text: '...', color: '#ccc'}];
  const sliceAngle = 360 / wheelItems.length;

  useImperativeHandle(ref, () => ({
    spin: () => {
      const spins = 360 * (6 + Math.floor(Math.random() * 4));
      const randomAngle = Math.floor(Math.random() * 360);
      const totalRotation = spins + randomAngle;

      const normalized = totalRotation % 360;
      const arrowPos = (360 - normalized + 90) % 360;
      const winnerIndex = Math.floor(arrowPos / sliceAngle);
      
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      rotation.value = withTiming(totalRotation, {
        duration: 5000,
        easing: Easing.bezier(0.15, 0, 0, 1), // Curva de desaceleración pesada
      }, (finished) => {
        if (finished) {
          rotation.value = totalRotation % 360;
          runOnJS(onStop)(wheelItems[winnerIndex % wheelItems.length]);
        }
      });
    }
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }]
  }));

  const createSlice = (startAngle, endAngle) => {
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
          {wheelItems.map((item, index) => (
            <Path key={index} d={createSlice(index * sliceAngle, (index + 1) * sliceAngle)} fill={item.color} stroke="#0f172a" strokeWidth="2" />
          ))}
        </Svg>
      </Animated.View>
      <View style={styles.centerKnob}><Text style={styles.knobText}>DRINK</Text></View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  wheelContainer: { width: WHEEL_SIZE, height: WHEEL_SIZE },
  pointer: { position: 'absolute', top: -15, zIndex: 10, width: 0, height: 0, borderLeftWidth: 15, borderRightWidth: 15, borderTopWidth: 30, borderTopColor: '#ef4444' },
  centerKnob: { position: 'absolute', width: 50, height: 50, backgroundColor: '#fff', borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#0f172a' },
  knobText: { fontWeight: '900', fontSize: 10, color: '#0f172a' }
});

export default Roulette;