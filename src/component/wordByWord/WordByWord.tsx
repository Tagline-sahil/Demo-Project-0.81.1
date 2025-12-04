import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export function Block({ block, blockIndex, baseDelay, styles }) {
  let totalWords = block.items.filter(i => !i.break).length;

  const blockStart = baseDelay + blockIndex * 4000; // block timing
  const blockEnd = block.autoFadeOut ? blockStart + totalWords * 1400 : 0;

  let counter = 0;

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {block.items.map((item, i) => {
        if (item.break) return <View key={i} style={{ width: '100%' }} />;

        const delayIndex = counter++;

        return (
          <AnimatedWord
            key={i}
            item={item}
            delayIndex={delayIndex}
            blockStart={blockStart}
            blockEnd={blockEnd}
            styles={styles}
          />
        );
      })}
    </View>
  );
}

export default function WordByWord({ text, startDelay, fadeOutDelay, style }) {
  const words = text.split(' ');
  console.log('🚀 ~ WordByWord ~ words:', words);

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {words.map((w, i) => (
        <WordItem
          key={i}
          word={w}
          index={i}
          startDelay={startDelay}
          fadeOutDelay={fadeOutDelay}
          style={style}
        />
      ))}
    </View>
  );
}
