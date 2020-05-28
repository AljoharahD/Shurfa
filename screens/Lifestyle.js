import React from 'react';
//import react in our code.

import {  Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
//import {DrawerNavigator} from 'react-navigation';
import {createAppContainer } from 'react-navigation';
//import {createStackNavigator } from 'react-navigation-stack';
//import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
//import firebase from 'firebase';
import Constants from 'expo-constants';
import { AbdoRegularText} from '../components/AbdoRegularText';

//import * as RNFS from 'react-native-fs';


export default class Lifestyle extends React.Component {



	render() {
    return (

      <View style={{padding: 10, flex: 1}, styles.container} >
      <ScrollView style={{flex: 1, marginBottom:20}}>

     <AbdoRegularText size={18} fontWeight={"bold"} style={styles.header}>
            نمط المعيشة
          </AbdoRegularText>

<Card containerStyle={styles.cards} >
 <AbdoRegularText size={10} style={styles.subHeader}>
           الأندية الرياضية
          </AbdoRegularText>
        <View style={styles.cardContent}>
        <AbdoRegularText size={32} style={styles.numbers}>
           2
          </AbdoRegularText>

         <AbdoRegularText size={32} style={styles.numbers}>
           4
          </AbdoRegularText>


          </View>

           <View  style={styles.cardContent}>
           <AbdoRegularText size={10} style={styles.firstParagraph}>
          رجالي
          </AbdoRegularText>

          <AbdoRegularText size={10} style={styles.firstParagraph}>
         نسائي
          </AbdoRegularText>


          </View>
          <AbdoRegularText size={7} style={styles.footer}>
          بدعم من الهيئة الملكية - 2019
          </AbdoRegularText>
        </Card>

          <Card containerStyle={styles.cards} >
 <AbdoRegularText size={10} style={styles.subHeader}>
           مراكز التسوق
          </AbdoRegularText>
        <View style={styles.cardContent}>
        <AbdoRegularText size={32} style={styles.numbers}>
           6
          </AbdoRegularText>

         <AbdoRegularText size={32} style={styles.numbers}>
           3
          </AbdoRegularText>



          </View>

           <View  style={styles.cardContent}>
           <AbdoRegularText size={10} style={styles.sndParagraph}>
           مركز تسوق
          </AbdoRegularText>

          <AbdoRegularText size={10} style={styles.sndParagraph}>
         سوبر ماركت
          </AbdoRegularText>

          </View>
          <AbdoRegularText size={7} style={styles.footer}>
          بدعم من الهيئة الملكية - 2019
          </AbdoRegularText>
        </Card>
        <Card containerStyle={styles.cards} >
 <AbdoRegularText size={10} style={styles.subHeader}>
           الحدائق العامة والترفيه
          </AbdoRegularText>
        <View style={styles.cardContent}>
        </View>
        </Card>

      </ScrollView>
      </View>



    );
  }
}
const styles = StyleSheet.create({
	container: {
	justifyContent: 'center',
	alignItems: 'center',
  flex: 1,
	backgroundColor: '#FDFFF3',
},




  header:{
    top: 70,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B2C924',
    textAlign:'center'

  },
  subHeader:{
        top: 5,
    fontSize: 14,
    //fontWeight: 'bold',
    color: '#8F8F8F',
    textAlign:'center'
  },
  cards:{
    borderRadius: 12, width: 330,height:171, marginTop: 20, borderWidth: 0.5,
    shadowOpacity: 0.05,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },
            top:50,


  }
  ,
  cardContent:{
   flexDirection: 'row-reverse',
   paddingLeft: 70,
   paddingTop:10
  },
  numbers:{
    fontSize:45,
    color:'#B2C924',
    fontWeight:'bold',
    top:15,
    paddingLeft:120,
  },
    firstParagraph: {
    bottom: 20,
    fontSize: 10,
    color: '#ABABAB',
   paddingLeft:120,
   right:5
  },
  sndParagraph:{
    bottom: 20,
    fontSize: 10,
    color: '#ABABAB',
   paddingLeft:85,
   right:12
  },
  footer:{
      top: 20 ,
    fontSize: 7,
   // fontWeight: 'bold',
    color: '#ABABAB',
   paddingLeft:180
  },

});
