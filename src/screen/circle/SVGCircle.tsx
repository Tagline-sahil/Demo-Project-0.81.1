import * as React from 'react';
import { ColorValue } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const mapRange = (x: number) => 7.5 + (x / 100) * 85;

const SVGCircle = ({ percent }: { percent: number }) => {
  const size = 120;
  const center = size / 2;
  const radius = center - 7;
  const { color } = getOnboardingScoreStatus(percent);

  // ---- SHARED VALUE (Animated angle) ---- //
  const progress = useSharedValue(7.5);

  // animate when prop changes
  React.useEffect(() => {
    progress.value = withTiming(mapRange(percent), { duration: 1500 });
  }, [percent]);

  // calculate animated coordinates
  const animatedProps = useAnimatedProps(() => {
    const angleDeg = (progress.value / 100) * 360 + 90;
    const rad = (angleDeg * Math.PI) / 180;

    const x = center + radius * Math.cos(rad);
    const y = center + radius * Math.sin(rad);

    return {
      cx: x,
      cy: y,
      fill:
        progress.value <= 40.65
          ? 'DF2D29'
          : progress.value <= 57.65
          ? '#ED6708'
          : progress.value <= 70.4
          ? '#11953A'
          : progress.value <= 83.15
          ? '#1976CE'
          : '#8B3F9E',
    };
  });

  return (
    <Svg width={120} height={120} viewBox="0 0 120 120" fill="none">
      <Path
        d="M103.873 89.377c1.01.676 1.284 2.045.568 3.027a54.998 54.998 0 01-18.716 16.209c-1.074.568-2.39.102-2.915-.994-.525-1.096-.06-2.405 1.012-2.977a50.616 50.616 0 0016.96-14.688c.719-.98 2.082-1.253 3.091-.577z"
        fill="#8B3F9E"
      />
      <Path
        d="M33.421 14.377c-.611-1.05-.258-2.4.816-2.97a55 55 0 0152.021.266c1.068.58 1.407 1.935.785 2.978-.622 1.044-1.97 1.38-3.04.804a50.6 50.6 0 00-47.55-.242c-1.075.565-2.42.214-3.032-.836z"
        fill="#ED6708"
      />
      <Path
        d="M36.03 107.045c-.552 1.083-1.88 1.517-2.94.923a55.004 55.004 0 01-21.287-74.464 55 55 0 0118.329-19.687c1.02-.66 2.372-.31 2.99.736.62 1.046.27 2.39-.748 3.054a50.6 50.6 0 002.716 86.437c1.058.598 1.49 1.919.94 3.001z"
        fill="#DF2D29"
      />
      <Path
        d="M111.542 48.543c1.186-.264 2.366.483 2.582 1.679a54.997 54.997 0 01-7.017 38.167c-.627 1.04-1.996 1.32-3.011.651-1.014-.668-1.291-2.03-.667-3.073a50.599 50.599 0 006.396-34.79c-.212-1.196.531-2.37 1.717-2.634z"
        fill="#1976CE"
      />
      <Path
        d="M87.332 14.825c.629-1.04 1.984-1.376 2.998-.706a54.986 54.986 0 0122.742 31.445c.319 1.172-.426 2.354-1.61 2.626-1.184.272-2.36-.47-2.683-1.641A50.59 50.59 0 0088.05 17.886c-1.011-.673-1.347-2.022-.718-3.061z"
        fill="#11953A"
      />
      <AnimatedCircle
        animatedProps={animatedProps}
        r={5.90446}
        // fill={color}
        stroke="#3D1A3D"
        strokeWidth={2}
      />
    </Svg>
  );
};

export default SVGCircle;

export type ScoreLevel =
  | 'Strained'
  | 'Needs attention'
  | 'Steady'
  | 'Strong'
  | 'Thriving';
export interface ScoreResult {
  level: ScoreLevel;
  color: ColorValue | undefined;
}

export const getOnboardingScoreStatus = (value: number): ScoreResult => {
  if (value <= 39) {
    return { level: 'Strained', color: '#DF2D29' };
  }
  if (value <= 59) {
    return { level: 'Needs attention', color: '#ED6708' };
  }
  if (value <= 74) {
    return { level: 'Steady', color: '#11953A' };
  }
  if (value <= 89) {
    return { level: 'Strong', color: '#1976CE' };
  }

  return { level: 'Thriving', color: '#8B3F9E' };
};
