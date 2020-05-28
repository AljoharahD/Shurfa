import { AsyncStorage } from 'react-native';


const LOGGED_IN = 'false';


export default async function checkIfLoggedIn() {
  try {
    //AsyncStorage.setItem('LOGGED_IN', 'false');
    const isLoggedin = await AsyncStorage.getItem('LOGGED_IN');
    console.log('isLoggedin:')
    console.log(isLoggedin==='true')
    return 'hello'
  } catch (error) {
    console.log(e.message)
    return false;
  }
}
