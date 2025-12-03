import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Card from '../../component/carouselCard/Card';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSharedValue } from 'react-native-reanimated';

const CarouselYoutube = () => {
  const [data, setData] = useState([
    { id: 1, color: '#ff7675' },
    { id: 2, color: '#74b9ff' },
    { id: 3, color: '#55efc4' },
    { id: 4, color: '#ffeaa7' },
    { id: 5, color: '#a29bfe' },
    { id: 6, color: '#fab1a0' },
    { id: 7, color: '#81ecec' },
    { id: 8, color: '#fdcb6e' },
    { id: 9, color: '#00b894' },
    { id: 10, color: '#6c5ce7' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useSharedValue(0);
  const MAX = 4;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.cardContainer}>
          {data.map((item, index) => {
            if (index > currentIndex + MAX || index < currentIndex) {
              return null;
            }
            return (
              <Card
                item={item}
                index={index}
                dataLength={data.length}
                maxVisibleItem={MAX}
                currentIndex={currentIndex}
                animatedValue={animatedValue}
                setCurrentIndex={setCurrentIndex}
                setNewData={setData}
                data={data}
              />
            );
          })}
        </View>
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
