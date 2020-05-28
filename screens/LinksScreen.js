import React from 'react';
import { ScrollView, StyleSheet,View,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Dimensions,
  TextInput,
  Button } from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import { ExpoLinksView } from '@expo/samples';
import { Card } from 'react-native-elements';
import IonIcon from '../components/IonIcon';
import Inquiries from '../components/neighborhoodProfile/Inquiries';
import { AbdoRegularText } from '../components/AbdoRegularText';
import Colors from '../constants/Colors';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
    <Inquiries/>

    </ScrollView>
  );
}


LinksScreen.navigationOptions = {
  title: 'hkijn',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },

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
