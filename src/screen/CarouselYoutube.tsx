import { StyleSheet } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Card from '../component/carouselCard/Card';
import { SafeAreaView } from 'react-native-safe-area-context';

const CarouselYoutube = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Card />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CarouselYoutube;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
