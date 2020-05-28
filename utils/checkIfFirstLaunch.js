import { AsyncStorage } from 'react-native';

const DID_LAUNCHED = 'false';
const LOGGED_IN = 'false';

function setAppLaunched() {
  AsyncStorage.setItem(DID_LAUNCHED, 'true');

}

export default async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(DID_LAUNCHED);


    if (hasLaunched !== 'true') {
      setAppLaunched();
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
