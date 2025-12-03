import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';

const window = Dimensions.get('window');

// simple placeholder items
const data = [
  { id: 1, color: '#ff7675' },
  { id: 2, color: '#74b9ff' },
  { id: 3, color: '#55efc4' },
  { id: 4, color: '#ffeaa7' },
  { id: 5, color: '#a29bfe' },
];

export default function CarouselReanimated() {
  const headerHeight = 100;
  const PAGE_WIDTH = window.width;
  const PAGE_HEIGHT = window.height - headerHeight;

  const carouselRef = React.useRef<Carousel<any>>(null);
  const directionAnimVal = useSharedValue(-1); // always move left

  const animationStyle: TAnimationStyle = React.useCallback(
    value => {
      'worklet';

      const translateY = interpolate(value, [0, 1], [0, -25]);

      const translateX =
        interpolate(value, [-1, 0], [PAGE_WIDTH, 0], Extrapolation.CLAMP) *
        directionAnimVal.value;

      const rotateZ =
        interpolate(value, [-1, 0], [55, 0], Extrapolation.CLAMP) *
        directionAnimVal.value;

      const zIndex = interpolate(
        value,
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4].map(v => (data.length - v) * 10),
        Extrapolation.CLAMP,
      );

      const scale = interpolate(value, [0, 1], [1, 0.95]);

      const opacity = interpolate(
        value,
        [-1, -0.8, 0, 1],
        [0, 0.9, 1, 0.85],
        Extrapolation.EXTEND,
      );

      return {
        transform: [
          { translateY },
          { translateX },
          { rotateZ: `${rotateZ}deg` },
          { scale },
        ],
        zIndex,
        opacity,
      };
    },
    [PAGE_WIDTH],
  );

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <Carousel
        ref={carouselRef}
        enabled={false} // ❌ disable swipe
        loop={false}
        defaultIndex={0}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={data}
        renderItem={({ index, item }) => (
          <Card
            index={index}
            item={item}
            onPress={() => {
              carouselRef.current?.next(); // 👉 goes to next card automatically
            }}
          />
        )}
        customAnimation={animationStyle}
        windowSize={5}
      />
    </View>
  );
}

const Card: React.FC<{ index: number; item: any; onPress: () => void }> = ({
  item,
  onPress,
}) => {
  const width = window.width * 0.7;
  const height = window.height * 0.5;

  return (
    <Pressable onPress={onPress}>
      {/* <View style={{ flex: 1 }}> */}
      <Animated.View
        entering={FadeInDown.duration(300)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: height / 1,
        }}
      >
        <View
          style={{
            width,
            height,
            backgroundColor: item.color,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000000d1',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.51,
            shadowRadius: 13.16,
            elevation: 20,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {item.id}
          </Text>
        </View>
      </Animated.View>
      {/* </View> */}
    </Pressable>
  );
};
