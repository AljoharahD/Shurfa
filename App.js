import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState ,useEffect} from 'react';
import { Platform, StatusBar, StyleSheet, View,AsyncStorage, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import AuthAppNavigator from './navigation/AuthAppNavigator';


export default function App(props) {
  useEffect( () => {
    checkIfLoggedIn()
}, []);

async function checkIfLoggedIn() {
  let loggedIn= await AsyncStorage.getItem('LOGGED_IN');
  setLoggedIn(loggedIn)
}

  const [isLoadingComplete, setLoadingComplete] = useState(false);
const [loggedIn, setLoggedIn] = useState('')
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {loggedIn=='true'?<AuthAppNavigator/>:<AppNavigator/>}

      </View>
    );
  }
}

async function loadResourcesAsync() {
   await Promise.all([
    await Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({

      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      'Abdo-Master-Regular': require('./assets/fonts/Abdo-Master-Regular.otf'),
    }),
    await Font.loadAsync({
      'Abdo-Master-DemiBold': require('./assets/fonts/Abdo-Master-DemiBold.otf'),
    }),
  ]);
}





function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
