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
import notifee, { AndroidStyle } from '@notifee/react-native';

export const notifeeSend = async (data: any) => {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: data.notification.title,
    body: data.notification.body,
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture:
          'https://media.licdn.com/dms/image/v2/C4D0BAQHgja9GPmBH_w/company-logo_200_200/company-logo_200_200/0/1635830944010/tagline_infotech3_logo?e=2147483647&v=beta&t=soAU6hkRws0Fd3O3zYfdlnG_AvWaRYHtK9qlLEcuwi4',
      },
    },
  });
};

const App = () => {
  useEffect(() => {
    // Request permission
    requestUserPermission();

    // Foreground message
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      notifeeSend(remoteMessage);
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
