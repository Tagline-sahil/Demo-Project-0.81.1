/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App, { notifeeSend } from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

// Background & quit-state messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (remoteMessage.notification) return;
  notifeeSend(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
