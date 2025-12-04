import { StyleSheet, View } from 'react-native';
import React from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CarouselReanimated from './src/screen/carousel/CarouselReanimated';
import Index from './src/screen/carousel/Index';
import CarouselYoutube from './src/screen/carousel/CarouselYoutube';
import SVGCircle from './src/screen/circle/SVGCircle';
import HumaOnboarding from './src/screen/wordByWord/WordByWordScreen';

const App = () => {
  return (
    // <GestureHandlerRootView>
    <View style={styles.container}>
      {/* <CarouselReanimated /> */}
      {/* <Index /> */}
      {/* <CarouselYoutube /> */}
      {/* <SVGCircle percent={50} /> */}
      <HumaOnboarding />
    </View>
    // </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
