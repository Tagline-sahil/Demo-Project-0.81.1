import { StyleSheet, View } from 'react-native';
import React from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CarouselReanimated from './src/screen/CarouselReanimated';
import Index from './src/screen/Index';
import CarouselYoutube from './src/screen/CarouselYoutube';

const App = () => {
  return (
    // <GestureHandlerRootView>
    <View style={styles.container}>
      {/* <CarouselReanimated /> */}
      {/* <Index /> */}
      <CarouselYoutube />
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
