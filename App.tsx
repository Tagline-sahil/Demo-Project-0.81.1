import { Alert, PermissionsAndroid, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CarouselReanimated from './src/screen/carousel/CarouselReanimated';
import Index from './src/screen/carousel/Index';
import CarouselYoutube from './src/screen/carousel/CarouselYoutube';
import SVGCircle from './src/screen/circle/SVGCircle';
import HumaOnboarding from './src/screen/wordByWord/WordByWordScreen';
import AuthScreen from './src/screen/auth/AuthScreen';
import UserDetailsScreen from './src/screen/userDetails/UserDetailsScreen';
import NotifeeScreen from './src/screen/notifee/NotifeeScreen';

const App = () => {
  useEffect(() => {
    // Request permission
    requestUserPermission();

    // Foreground message
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'New Notification',
        JSON.stringify(remoteMessage.notification),
      );
    });

    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    try {
      const authStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (authStatus === PermissionsAndroid.RESULTS.GRANTED) {
        fcmToken();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fcmToken = async () => {
    try {
      await messaging()
        .getToken()
        .then(token => {
          console.log('FCM TOKEN:', token);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // <GestureHandlerRootView>
    <View style={styles.container}>
      {/* <CarouselReanimated /> */}
      {/* <Index /> */}
      {/* <CarouselYoutube /> */}
      {/* <SVGCircle percent={50} /> */}
      {/* <HumaOnboarding /> */}
      {/* <AuthScreen /> */}
      {/* <UserDetailsScreen /> */}
      <NotifeeScreen />
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
