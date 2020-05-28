import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import IonIcon from '../components/IonIcon';
import { AbdoRegularText } from '../components/AbdoRegularText';
import Colors from '../constants/Colors';
import GradientButton from 'react-native-gradient-buttons';
import { Card } from 'react-native-elements';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height/6;
const CARD_WIDTH = (CARD_HEIGHT-50)*4;

//will pass user id here

export default function viewProfile {
  return (

      <View style={styles.container}>
      <View style={{  flexGrow: 1,justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width}} >
            <Image source={require('./freepik.jpg')} style={[styles.profilepic]} />// badge pic
            <AbdoRegularText size={20} style={{lineHeight:20, color:Colors.darkBlue, fontWeight: "bold"}}>سارة محمد</AbdoRegularText>
            <View style={[styles.badgeContainer]}>
              <AbdoRegularText size={12} style={{lineHeight:30, color:Colors.darkGray}}> ٥٦ نقاط - شرفة ذهبية</AbdoRegularText>
            </View>
            <View style={[styles.verticalAlignment]} >
            <View style={[styles.tabsContainer]}>
            <IonIcon name={ 'ios-help-circle-outline' } color={Colors.lightGray} size={25} style={{position:'absolute' , left:48, bottom:2}}/>
              <AbdoRegularText size={18} style={{color:Colors.lightGray,lineHeight:25,}}> الأسئلة</AbdoRegularText>

            </View>
            <View style={[styles.tabsContainer]}>
              <AbdoRegularText size={18} style={{color:Colors.lightGray,lineHeight:25}}>  الأجوبة</AbdoRegularText>
            </View>
            </View>

      </View>


//inquiries
      <View style={styles.inquiriesList}>

            <View style={styles.card}>

                <View style={styles.inquiryDetails} >

                  <View style={{paddingTop: 10}}>

                    <AbdoRegularText
                      textAlign={"left"}
                      size={16}
                      style={styles.textCard}
                    >
                      البتول
                    </AbdoRegularText>
                  </View>

                  <TouchableOpacity
                    //onPress={() => {props.navigation.navigate('inquiry',{inqID:u.id})}}
                    style={styles.link}
                  >
                  <IonIcon size={24} name={"ios-arrow-back"} color={"white"} />
                  </TouchableOpacity>

                </View>

              </View>

          </View>




//answers
      <View style={styles.answersList}>

        <View style={styles.answerContainer}>

            <View style={styles.answerDetails} >

              <View style={{paddingTop: 10}}>

                <AbdoRegularText
                  textAlign={"left"}
                  size={16}
                  style={styles.textAnswer}
                >
الإجابة الإجابة الإجابة الإجابة الإجابة الإجابة الإجابة الإجابة الإجابة الإجابة
              </AbdoRegularText>

              </View>
              <View style={styles.answerDate}>

              <AbdoRegularText
                textAlign={"left"}
                size={13}
                style={styles.dateAnswer}
              >
              11/12/2020
              </AbdoRegularText>

              </View>
              <View style={styles.answerIcon}>
              <IonIcon size={30} name={"ios-arrow-dropleft-circle"} color={Colors.darkYellow} />
              </View>
            </View>

          </View>

      </View>




  </View>
    );

  }

  const styles = StyleSheet.create({

    scrollView: {
      flex:1,
      flexDirection:'row',
      left: 0,
      right: 0,
      },


    verticalAlignment:{
      flexDirection: 'row',
      backgroundColor:"#fff",
      borderWidth:1,
      borderBottomColor:"#EAEAEA",
      borderTopColor:"#EAEAEA",
      borderColor:"#fff",
      margin: 20,
      marginTop:30,
      height:45,
      shadowOpacity: 0.04,
    },

    container: {
      backgroundColor: Colors.lightBlue,
      height:250,
    },

    contentContainer: {
      paddingTop: 15,
    },

    profilepic:{
      flexDirection: 'row',
      width:85,
      height:88,
      borderRadius:100,
      justifyContent: 'center',
      marginTop: 40,
      marginBottom:10,
      shadowOpacity: 0.09,

    },
    badgeContainer: {
      borderColor: '#EAEAEA',
      backgroundColor: 'white',
      borderRadius:25,
      borderWidth: 1,
      width:150,
      height:30,
      shadowOpacity: 0.04,

  },
    tabsContainer:{
      lineHeight:30,
      paddingHorizontal:70,
      paddingVertical:10,
      paddingTop:10,
  },
  inquiriesList: {
  marginTop:20,
  },

  answersList: {
  marginTop:20,
  },

  card: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    overflow: "visible",
  },

  answerContainer: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    overflow: "visible",
  },
  inquiryDetails: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "white",
    height: 60,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.04,
    shadowRadius: 7,
    shadowColor: "black",
    shadowOffset: {height: 0, width: 0}
  },
  answerDetails: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "white",
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.04,
    shadowRadius: 7,
    shadowColor: "black",
    shadowOffset: {height: 0, width: 0}
  },

  textCard: {
    fontSize: 18,
    marginLeft: 14,
    color: Colors.darkYellow,
    lineHeight: 28
  },

  textAnswer: {
    flex:1,
    fontSize: 18,
    marginLeft: 14,
    color: Colors.darkYellow,
    lineHeight: 28,
  },

  dateAnswer: {
    flex:1,
    fontSize: 18,
    marginLeft: 14,
    color: Colors.darkGray,
    lineHeight: 28,

  },

  link: {
    width: Dimensions.get("window").width * 0.15,
    backgroundColor: Colors.darkYellow,
    height: 60,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  answerIcon: {
    position:"absolute",
    bottom:3,
    right:15

  },
  answerDate: {
    position:"absolute",
    bottom:0,
    left:0,

  }
  });
