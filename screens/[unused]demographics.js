import React, { Component } from 'react'

import { Dimensions,Image,Platform,Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableHighlight } from 'react-native';
import {createAppContainer } from 'react-navigation';
import { Card } from 'react-native-elements';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Octicons';
import IonIcon from '../components/IonIcon';
import SimpleLineIcons from '../components/SimpleLineIcons';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { MonoText} from '../components/StyledText';
import { AbdoRegularText} from '../components/AbdoRegularText';

export default class extends React.Component{
  render () {
    return (
      <View style={styles.container }>
      <AbdoRegularText size={28} style={styles.header}>
      حي الغدير</AbdoRegularText>
      <AbdoRegularText size={18}  style={styles.subHeader}>
              عن السكان
               </AbdoRegularText>
        <Swiper style={styles.wrapper} horizontal={true} >
        <Card containerStyle={styles.slide2}>
        <View style={styles.icons}>
        <IonIcon name={ 'ios-stats' } color={Colors.blue}  size={64} style={{ right:210}}/>
        <SimpleLineIcons name={ 'people' } color={Colors.blue}  size={64} style={{right:135}}/>
        <IonIcon name={ 'ios-stats' } color={Colors.blue}   size={64}  style={{right:70}}/>
        </View>
        <View style={styles.paragraph1}>

        <View style={styles.males}>
        <AbdoRegularText size={14} style={styles.thousand}>
          ألف
        </AbdoRegularText>
          <AbdoRegularText size={24} style={styles.numbers3}>
            32
          </AbdoRegularText>
          </View>

          <View style={styles.population}>
          <AbdoRegularText size={14} style={styles.thousand}>
            ألف
          </AbdoRegularText>
            <AbdoRegularText size={24} style={styles.numbers2}>
              35
            </AbdoRegularText>
            </View>

            <View style={styles.females}>
            <AbdoRegularText size={14} style={styles.thousand}>
              ألف
            </AbdoRegularText>
              <AbdoRegularText size={24} style={styles.numbers1}>
                12
              </AbdoRegularText>
              </View>
            </View>
            <View style={styles.paragraph2}>
            <AbdoRegularText size={14} style={styles.text2}>
              ذكور
            </AbdoRegularText>
            <AbdoRegularText size={14} style={styles.text2}>
              السكان
            </AbdoRegularText>
            <AbdoRegularText size={14} style={styles.text2}>
              إناث
            </AbdoRegularText>

            </View>
        </Card>
          <Card containerStyle={styles.slide1}>
          <View style={styles.icons}>
          <IonIcon name={ 'ios-stats' } color={Colors.blue}  size={64} style={{ right:205}}/>
          <SimpleLineIcons name={ 'people' }  color={Colors.blue}  size={64} style={{right:130}}/>
          <IonIcon name={ 'ios-stats' }  color={Colors.blue}  size={64} style={{ right:55}}/>
          </View>
          <View style={styles.paragraph1}>

          <View style={styles.saudiMales}>
          <AbdoRegularText size={14} style={styles.precentage}>
            %
          </AbdoRegularText>
            <AbdoRegularText size={24} style={styles.numbers3}>
              30
            </AbdoRegularText>
            </View>

            <View style={styles.saudies}>
            <AbdoRegularText size={14} style={styles.precentage}>
              %
            </AbdoRegularText>
              <AbdoRegularText size={24} style={styles.numbers2}>
                90
              </AbdoRegularText>
              </View>

              <View style={styles.saudiFemale}>
              <AbdoRegularText size={14} style={styles.precentage}>
                %
              </AbdoRegularText>
                <AbdoRegularText size={24} style={styles.numbers1}>
                  60
                </AbdoRegularText>
                </View>
              </View>
              <View style={styles.paragraph2}>
              <AbdoRegularText size={14} style={styles.text1}>
                ذكور سعوديون
              </AbdoRegularText>
              <AbdoRegularText size={14} style={styles.text1}>
                سعوديون
              </AbdoRegularText>
              <AbdoRegularText size={14} style={styles.text1}>
                إناث سعوديات
              </AbdoRegularText>

              </View>
          </Card>



          <Card containerStyle={styles.slide3}>
          <View style={styles.icons}>
          <IonIcon name={ 'md-stats' }   size={100} color={Colors.mediumGray}  style={{right:220}}/>
          </View>

          <View style={styles.ages}>
          <AbdoRegularText size={14} style={styles.text3}>
            التنوع العمري
          </AbdoRegularText>

            </View>
          </Card>
        </Swiper>
        <AbdoRegularText size={9} style={styles.footer}>
        بدعم من هيئة الإحصاء - 2016
        </AbdoRegularText>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    top:70,
    flex:0.45,
    backgroundColor:'#F8FDFF'

  },

  wrapper: {
  },

  header:{
    top: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E7DC4',
    textAlign:'center'

  },
  subHeader:{
        top: 10,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#B1B1B1',
    textAlign:'center'
  },
  icons:{
    flexDirection: 'row-reverse',
    right:200,
    paddingLeft:50,
    //top:20

  },

  slide1: {
    //flex: 1,
        borderRadius: 12,
         width: 370,
         height:170,
         marginTop: 7,
    //top:80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
   left:7,
    borderWidth: 0.5,
    shadowOpacity: 0.05,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },

  },

  slide2: {
    borderRadius: 12,
    width: 370,
    height:170,
    marginTop: 7,
    //top:80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    left:7,
    borderWidth: 0.5,
    shadowOpacity: 0.05,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },
  },

  slide3: {
   borderRadius: 12,
   width: 370,
   height:170,
   marginTop: 7,
    //top:80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    left:7,
    borderWidth: 0.5,
    shadowOpacity: 0.05,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },
  },
  cardContent:{
   flexDirection: 'row-reverse',
   paddingTop:20
  },



females:{
  flexDirection: 'row-reverse',
right:85,
top:35,
 paddingLeft:50
},
population:{
 flexDirection: 'row-reverse',
right:100,
top:35,
paddingLeft:50
},
males:{
  flexDirection: 'row-reverse',
right:115,
top:35
},
 nationality:{
   flexDirection: 'row-reverse',
 right:110,
 top:35
 },
 ages:{
   flexDirection: 'row-reverse',
 right:150,
 top:25
 },
 saudiFemale:{
   flexDirection: 'row-reverse',
 right:85,
 top:40,
  paddingLeft:70
 },
 saudies:{
   flexDirection: 'row-reverse',
  right:100,
  top:40,
  paddingLeft:70
 },
 saudiMales:{
   flexDirection: 'row-reverse',
 right:115,
 top:40
 },

  numbers1:{
    fontSize:32,
    color:'#6AA1D4',
    fontWeight:'bold',
    top:35,
  },
  numbers2:{
    fontSize:32,
    color:'#6AA1D4',
    fontWeight:'bold',
    top:35,
  },
  numbers3:{
    fontSize:32,
    color:'#6AA1D4',
    fontWeight:'bold',
    top:35,
  },
  numbers11:{
    fontSize:32,
    color:'#6AA1D4',
    fontWeight:'bold',
    top:35,
  },

  thousand:{
    color:'#6AA1D4',
    top:42
  },
  precentage:{
    color:'#6AA1D4',
    top:42
  },
  year:{
    color:'#6AA1D4',
    top:42
  },

  paragraph1: {
    flexDirection: 'row-reverse',
  bottom: 45,
  fontSize: 10,
  fontWeight: 'bold',
  //textAlign: 'right',
  right:150,
  color: '#ABABAB',
 //paddingRight:50,
},
paragraph2: {
  flexDirection: 'row-reverse',
bottom: 20,
fontSize: 10,
fontWeight: 'bold',
color: '#ABABAB',
//paddingRight:50,
},
text1: {
  flexDirection: 'row-reverse',
  top: 30,
  fontSize: 10,
  fontWeight: 'bold',
  //textAlign: 'right',
  left:20,
  color: '#ABABAB',
  paddingLeft:40,
},
text2: {
  flexDirection: 'row-reverse',
  top: 30,
  fontSize: 10,
  fontWeight: 'bold',
  //textAlign: 'right',
  left:45,
  color: '#ABABAB',
  paddingLeft:90,
},
text3: {
  flexDirection: 'row-reverse',
  bottom:10 ,
  fontSize: 10,
  fontWeight: 'bold',
  //textAlign: 'right',
  right:130,
  color: '#ABABAB',
  //paddingLeft:50,
},
footer:{
    bottom: 15,
  color: '#ABABAB',
 paddingLeft:210
},

});
