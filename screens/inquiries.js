import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  Button
} from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import { Card } from 'react-native-elements';
import IonIcon from '../components/IonIcon';
import { AbdoRegularText } from '../components/AbdoRegularText';
import Colors from '../constants/Colors';


export default class Inquiries{
render() {
  return (

<View style={[styles.inqContainer]}>
  <GradientButton
      style={{ margin: 8 , alignItems:"center"}}
      textStyle={{margin: 5}}
      gradientBegin="#F1D472"
      gradientEnd="#F2C22D"
      gradientDirection="diagonal"
      height={35}
      width={100}
      radius={18}
      onPressAction={() => alert('You pressed me!')}>
      <AbdoRegularText size={18} style={{lineHeight:28}}>اسأل</AbdoRegularText>
  </GradientButton>
  <Card containerStyle={styles.cards} >
      <AbdoRegularText style={styles.textCard}>س١</AbdoRegularText>
      <IonIcon name={ 'ios-arrow-back' } color={"#ECB612"} style={{position:'absolute',right:20}}/>
  </Card>
  <Card containerStyle={styles.cards} >
      <AbdoRegularText style={styles.textCard}>س٢</AbdoRegularText>
      <IonIcon name={ 'ios-arrow-back' } color={"#ECB612"} style={{position:'absolute',right:20}}/>
  </Card>
  <Card  containerStyle={styles.cards} >
      <AbdoRegularText style={styles.textCard}>س٣</AbdoRegularText>
      <IonIcon name={ 'ios-arrow-back' } color={"#ECB612"} style={{position:'absolute',right:20}}/>
  </Card>
  <AbdoRegularText size={18} style={{color:"#CBCBCB",lineHeight:30, marginTop:20}}>عرض المزيد</AbdoRegularText>
  <IonIcon name={ 'ios-arrow-down' } color={"#CBCBCB"} style={{marginTop:-15}} />

</View>

    );
  }
}

const styles = StyleSheet.create({
cards:{
 borderRadius: 10,
 backgroundColor:'#FFFEFA',
 width: 350,
 marginTop: 20,
 borderWidth: 0.5,
 shadowOpacity: 0.04,
 shadowRadius: 5,
 shadowColor: 'black',
 shadowOffset: { height: 0, width: 0 },
 height: 60,
},

textCard:{
fontSize:17,
color:'#ECB612',
lineHeight:28,
},

inqContainer:{
margin:20,
alignItems: 'center',
}

});
