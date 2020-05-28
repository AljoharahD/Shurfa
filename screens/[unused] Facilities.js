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
import data from './schools.json';

export default class Facilities extends React.Component {



	render() {
    return (

      <View style={{padding: 10, flex: 1}, styles.container} >
      <ScrollView style={{flex: 1, marginBottom:20}}>

     <AbdoRegularText size={18} style={styles.header}>
الخدمات والمرافق العامة          </AbdoRegularText>

<Card containerStyle={styles.card1} >
 <AbdoRegularText size={14} style={styles.subHeader}>
الخدمات اليومية          </AbdoRegularText>
        <View style={styles.cardContent}>



          </View>

          <AbdoRegularText size={7} style={styles.firstFooter}>
          بدعم من الهيئة الملكية - 2019
          </AbdoRegularText>
        </Card>

          <Card containerStyle={styles.card2} >
 <AbdoRegularText size={14} style={styles.subHeader}>
الخدمات اليومية          </AbdoRegularText>
        <View style={styles.cardContent}>
        <AbdoRegularText size={52} style={styles.firstNumbers}>
           6
          </AbdoRegularText>

         <AbdoRegularText size={52} style={styles.firstNumbers}>
           3
          </AbdoRegularText>
         <AbdoRegularText size={52} style={styles.firstNumbers}>
           3
          </AbdoRegularText>
          </View>
            <View  style={styles.cardContent}>
           <AbdoRegularText size={12} style={styles.fisrtParagraph}>
          تموينات
          </AbdoRegularText>

          <AbdoRegularText size={12} style={styles.fisrtParagraph}>
         مسجد
          </AbdoRegularText>
          <AbdoRegularText size={12} style={styles.fisrtParagraph}>
         جامع
          </AbdoRegularText>
          </View>
            <View style={styles.cardContent}>
        <AbdoRegularText size={52} style={styles.sndNumbers}>
           6
          </AbdoRegularText>

         <AbdoRegularText size={52} style={styles.sndNumbers}>
           3
          </AbdoRegularText>
         <AbdoRegularText size={52} style={styles.sndNumbers}>
           3
          </AbdoRegularText>
          </View>
             <View  style={styles.cardContent}>
           <AbdoRegularText size={12} style={styles.sndParagraph}>
          مشاغل
          </AbdoRegularText>

          <AbdoRegularText size={12} style={styles.sndParagraph}>
         محلات حلاقة
          </AbdoRegularText>
          <AbdoRegularText size={12} style={styles.sndParagraph}>
         خدمات طالب
          </AbdoRegularText>
          </View>

          <AbdoRegularText  size={7}style={styles.sndFooter}>
          بدعم من الهيئة الملكية - 2019
          </AbdoRegularText>
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
	backgroundColor: '#FFFCEB',
},




  header:{
    top: 50,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EEC733',
    textAlign:'center'

  },
  subHeader:{
        top: 5,
    fontSize: 14,
    //fontWeight: 'bold',
    color: '#8F8F8F',
    textAlign:'center'
  },
  card1:{
    borderRadius: 12, width: 330,height:182, marginTop: 20, borderWidth: 0.5,
    shadowOpacity: 0.05,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },
            top:50,


  },
   card2:{
    borderRadius: 12, width: 330,height:270, marginTop: 20, borderWidth: 0.5,
    shadowOpacity: 0.05,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },
            top:50,


  }
  ,
  cardContent:{
   flexDirection: 'row-reverse',
   paddingLeft: 20,
   //paddingTop:10
  },
  firstNumbers:{
    fontSize:45,
    color:'#F1BF20',
    fontWeight:'bold',
    top:15,
    paddingLeft:75,
  },
  sndNumbers:{
    fontSize:45,
    color:'#F1BF20',
    fontWeight:'bold',
    bottom:10,
    paddingLeft:75,
  },
  fisrtParagraph:{
    bottom: 35,
    fontSize: 10,
    color: '#ABABAB',
    right:6,
   paddingLeft:75,
  },

  sndParagraph:{
    bottom: 55,
    fontSize: 10,
    color: '#ABABAB',
    left:2,
   paddingLeft:65,
  },
  firstFooter:{
      top:120,
    fontSize: 7,
   // fontWeight: 'bold',
    color: '#ABABAB',
   paddingLeft:180
  },
  sndFooter:{
      bottom: 35,
    fontSize: 7,
   // fontWeight: 'bold',
    color: '#ABABAB',
   paddingLeft:180
  },

});
