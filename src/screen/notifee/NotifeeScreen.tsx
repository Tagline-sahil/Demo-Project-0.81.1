import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import notifee, { AndroidStyle } from '@notifee/react-native';

const NotifeeScreen = () => {
  const notifeeSend = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notifee Notification',
      body: 'With the help of Innovation and Technology, We give you the power to change the world with your ideas.',
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

  return (
    <View style={styles.container}>
      <Button title="Local Notification" onPress={notifeeSend} />
    </View>
  );
};

export default NotifeeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
