import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

export default function BubbleWordByWord({
  content,
  startDelay,
  fadeOutDelay,
  styles,
}) {
  let indexCounter = 0;

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {content.map((item, i) => {
        if (item.break) return <View key={i} style={{ width: '100%' }} />;

        const localIndex = indexCounter++;
        const opacity = useSharedValue(0);
        const translateY = useSharedValue(10);

        useEffect(() => {
          opacity.value = withDelay(
            startDelay + localIndex * 140,
            withTiming(1, { duration: 250 }),
          );
          translateY.value = withDelay(
            startDelay + localIndex * 140,
            withTiming(0, { duration: 250 }),
          );

          if (fadeOutDelay > 0) {
            opacity.value = withDelay(
              fadeOutDelay,
              withTiming(0, { duration: 250 }),
            );
          }
        }, []);

        const r = useAnimatedStyle(() => ({
          opacity: opacity.value,
          transform: [{ translateY: translateY.value }],
          marginRight: 8,
          marginBottom: 8,
        }));

        return (
          <Animated.View key={i} style={r}>
            {item.bubble ? (
              <View style={styles.bubbleBox}>
                <Text style={styles.bubbleText}>{item.text}</Text>
              </View>
            ) : (
              <Text style={styles.normal}>{item.text}</Text>
            )}
          </Animated.View>
        );
      })}
    </View>
  );
}
