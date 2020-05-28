import React from 'react';
//import react in our code.

import { Image,Platform,Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
//import {DrawerNavigator} from 'react-navigation';
import {createAppContainer } from 'react-navigation';
//import {createStackNavigator } from 'react-navigation-stack';
//import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
//import firebase from 'firebase';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { MonoText} from '../components/StyledText';
import { AbdoRegularText} from '../components/AbdoRegularText';
import { AbdoRegularSmall} from '../components/AbdoRegularSmall';
import { AbdoRegularFooter} from '../components/AbdoRegularFooter';

export default class Education extends React.Component {



  render() {
    return (

      <View style={{padding: 10, flex: 1}, styles.container} >
      <ScrollView style={{flex: 1, marginBottom:20}}>

     <AbdoRegularText style={styles.header}>
            التعليم
          </AbdoRegularText>

<Card containerStyle={styles.cards} >
 <AbdoRegularSmall style={styles.subHeader}>
           عدد المدارس - إناث
          </AbdoRegularSmall>
        <View style={styles.cardContent}>
        <AbdoRegularText style={styles.numbers}>
           6
          </AbdoRegularText>

         <AbdoRegularText style={styles.numbers}>
           4
          </AbdoRegularText>

          <AbdoRegularText style={styles.numbers}>
           7
          </AbdoRegularText>

          <AbdoRegularText style={styles.numbers}>
           4
          </AbdoRegularText>

          </View>

          <View  style={styles.cardContent}>
          <AbdoRegularSmall style={styles.paragraph}>
          ثانوي
          </AbdoRegularSmall>
          <AbdoRegularSmall style={styles.paragraph}>
         متوسط
          </AbdoRegularSmall>
          <AbdoRegularSmall style={styles.paragraph}>
         إبتدائي
          </AbdoRegularSmall>

         <AbdoRegularSmall style={styles.paragraph}>
        رياض أطفال
        </AbdoRegularSmall>

         </View>
          <AbdoRegularFooter style={styles.footer}>
          بدعم من الهيئة الملكية - 2019
          </AbdoRegularFooter>
        </Card>

          <Card containerStyle={styles.cards} >
 <AbdoRegularSmall style={styles.subHeader}>
           عدد المدارس - ذكور
          </AbdoRegularSmall>
        <View style={styles.cardContent}>
        <AbdoRegularText style={styles.numbers}>
           6
          </AbdoRegularText>

         <AbdoRegularText style={styles.numbers}>
           6
          </AbdoRegularText>

          <AbdoRegularText style={styles.numbers}>
           7
          </AbdoRegularText>

          <AbdoRegularText style={styles.numbers}>
           3
          </AbdoRegularText>

          </View>

           <View  style={styles.cardContent}>
           <AbdoRegularSmall style={styles.paragraph}>
           ثانوي
           </AbdoRegularSmall>
           <AbdoRegularSmall style={styles.paragraph}>
          متوسط
           </AbdoRegularSmall>
           <AbdoRegularSmall style={styles.paragraph}>
          إبتدائي
           </AbdoRegularSmall>

          <AbdoRegularSmall style={styles.paragraph}>
         رياض أطفال
         </AbdoRegularSmall>

          </View>
          <AbdoRegularFooter style={styles.footer}>
          بدعم من الهيئة الملكية - 2019
          </AbdoRegularFooter>
        </Card>
        <Card containerStyle={styles.cards} >
 <AbdoRegularSmall style={styles.subHeader}>
           أفضل المدارس الثانوية - إناث
          </AbdoRegularSmall>
        <View style={styles.cardContent}>
        </View>
        </Card>
           <Card containerStyle={styles.cards} >
 <AbdoRegularSmall style={styles.subHeader}>
           أفضل المدارس الثانوية - ذكور
          </AbdoRegularSmall>
        <View style={styles.cardContent}>
        </View>

        </Card>
<Card containerStyle={styles.cards} >
 <AbdoRegularSmall style={styles.subHeader}>
عدد أندية مدارس الحي          </AbdoRegularSmall>
        <View style={styles.clubsCard}>
        <AbdoRegularText style={styles.twoNumbers}>
           6
          </AbdoRegularText>

         <AbdoRegularText style={styles.twoNumbers}>
           4
          </AbdoRegularText>

          </View>

           <View  style={styles.clubsCard}>
           <AbdoRegularSmall style={styles.clubsParagraph}>
        ذكور
          </AbdoRegularSmall>

          <AbdoRegularSmall style={styles.clubsParagraph}>
         إناث
          </AbdoRegularSmall>

          </View>
          <AbdoRegularFooter style={styles.clubsFooter}>
          بدعم من الهيئة الملكية - 2019
          </AbdoRegularFooter>
        </Card>

        <Card containerStyle={styles.cards} >
 <AbdoRegularSmall style={styles.subHeader}>
عدد حلقات التحفيظ         </AbdoRegularSmall>
        <View style={styles.clubsCard}>
        <AbdoRegularText style={styles.twoNumbers}>
           2
          </AbdoRegularText>

         <AbdoRegularText style={styles.twoNumbers}>
           0
          </AbdoRegularText>

          </View>

           <View  style={styles.clubsCard}>
           <AbdoRegularSmall style={styles.clubsParagraph}>
          ذكور
          </AbdoRegularSmall>

          <AbdoRegularSmall style={styles.clubsParagraph}>
         إناث
          </AbdoRegularSmall>

          </View>
          <AbdoRegularFooter style={styles.clubsFooter}>
          بدعم من الهيئة الملكية - 2019
          </AbdoRegularFooter>
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
	backgroundColor: '#F8FFFE',
},




  header:{
    top: 70,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#48A996',
    textAlign:'center'

  },
  subHeader:{
        top: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ABABAB',
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
   paddingLeft: 30,
   paddingTop:20
  },
  clubsCard:{
flexDirection: 'row-reverse',
   //paddingRight: 30,
   paddingLeft: 65,
   paddingTop:20
  },
  numbers:{
    fontSize:32,
    color:'#7BC3B5',
    fontWeight:'bold',
    top:15,
    paddingLeft:50
  },
  twoNumbers:{
     fontSize:45,
    color:'#7BC3B5',
    fontWeight:'bold',
    top:15,
   paddingLeft:120,
  },
    paragraph: {
    bottom: 30,
    fontSize: 10,
    fontWeight: 'bold',
    //textAlign: 'right',
    //right:12,
    color: '#ABABAB',
   // borderRadius: 550,
   paddingLeft:28
  },
  clubsParagraph:{
    bottom: 30,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ABABAB',
   paddingLeft:116
  },
  footer:{
      bottom: 10,
    fontSize: 2,
    fontWeight: 'bold',
    color: '#ABABAB',
   paddingLeft:180
  },
  clubsFooter:{
         bottom: 10,
    fontSize: 7,
    fontWeight: 'bold',
    color: '#ABABAB',
   paddingLeft:180
  }

});
