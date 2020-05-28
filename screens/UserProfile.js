import {withNavigation} from "react-navigation";
import React, { useState, useEffect } from 'react';

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
  Button,
  AsyncStorage,
  Alert
} from 'react-native';
import Swiper from "react-native-swiper";

import { SmallLogo } from '../components/SmallLogo';
import { RiyadhsRegions } from '../components/RiyadhsRegions';
import Levels from '../components/alertMessages/Levels';
import { SearchBar } from '../components/SearchBar';
import { AbdoRegularText } from '../components/AbdoRegularText';
import {AbdoMediumText} from "../components/AbdoMediumText";
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import EntypoIcons from "../components/EntypoIcons";
import IonIcon from "../components/IonIcon";
import FeatherIcon from "../components/FeatherIcon";
import FeatherIconCustom from "../components/FeatherIconCustom";
import MaterialIcons from "../components/MaterialCommunityIcons";
import DefMaterialIcons from "../components/MaterialIcons";
import MaterialCommunityIcons from "../components/MaterialCommunityIcons";
import { badges } from "../components/Badges";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';




export default function UserProfile({ navigation }) {



  const [neighborhoods, setNeighborhoods] = useState([])
  const [results, setResults] = useState([])
  const [userData, setUserData] = useState({email:'',id:'',name:'',nbhd:'',notStat:'',points:'',level:''})
  const [userInquiries, setUserInquiries] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [swiper, setSwiper] = useState();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');

  const logout = async () => {
    let token='';
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status=='granted'){
    token = await Notifications.getExpoPushTokenAsync();
  }
    console.log("token here: " + token)
    let url = 'https://shurfa-flask.herokuapp.com/removetoken/'+token;
    console.log('remove token url is:'+url)
    Alert.alert(
    'هل ترغب بالخروج',
    '',
    [
      {
        text: 'لا',
        onPress: () => {return;},
        style: 'cancel',
      },
      {text: 'نعم', onPress: async () => {

        if (token != ''){
          fetch(url)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log(res)
            });
        }


        try {
        await AsyncStorage.setItem("email", '');
        await AsyncStorage.setItem("id", '');
        await AsyncStorage.setItem("name",'');
        await AsyncStorage.setItem("nbhd", '');
        await AsyncStorage.setItem("nbhdEn", '');
        await AsyncStorage.setItem("nbhdID", '');
        await AsyncStorage.setItem("notStat", '');
        await AsyncStorage.setItem("password", '');
        await AsyncStorage.setItem("points", '');
        await AsyncStorage.setItem("LOGGED_IN", 'false');
        navigation.navigate('GeneralTabNavigator')
        } catch (error) {
          console.log("Something went wrong", error);
        } // user full info are retrieved
      }
    },
    ],
    {cancelable: false},
    );

  }
 const goToEditProfile = () => {
  navigation.navigate('EditProfile')
  }


  async function retrieveUserData() {
    let userEmail= await AsyncStorage.getItem("email");
    let userId= await AsyncStorage.getItem("id");
    let name=await AsyncStorage.getItem("name");
    let nbhd=await AsyncStorage.getItem("nbhd");
    let nbhdEn=await AsyncStorage.getItem("nbhdEn");
    let nbhdID=await AsyncStorage.getItem("nbhdID");
    let notStat=await AsyncStorage.getItem("notStat");
    let points=await AsyncStorage.getItem("points");
    let level= await AsyncStorage.getItem("level")
     if (userEmail==null)
     return;
    setUserData({email:userEmail.replace(/['"]+/g, ''),id:userId.replace(/['"]+/g, ''),name:name.replace(/['"]+/g, ''),nbhd:nbhd.replace(/['"]+/g, ''),nbhdEn:nbhdEn.replace(/['"]+/g, ''),nbhdID:nbhdID.replace(/['"]+/g, ''),notStat:notStat.replace(/['"]+/g, ''),points:Number(points.replace(/['"]+/g, '')), level:level.replace(/['"]+/g, '')})
console.log(JSON.stringify(userData))
  }
/*
  async function retrieveUserData() {

    let userId= await AsyncStorage.getItem("id");
    let url = 'https://shurfa-flask.herokuapp.com/user/'+userId;

    fetch(url).then(res => {
        return res.json();
    }).then(res => {

      setUserData({email:res.email,id:userId,name:res.name,nbhd:res.nbhd,notStat:res.notStat,level:res.level,points:res.points})

    });

}
*/

  async function retrieveUserInquiries () {

    let userId= await AsyncStorage.getItem("id");
    let url = 'https://shurfa-flask.herokuapp.com/retrieveuserinquiries/'+userId;
console.log(url)
    fetch(url).then(res => {
        return res.json();
    }).then(res => {
        let inquiries = [];
        for (var i = 0; i < res.length; i++) {
            inquiries.push(res[i]);
        } //end for
        setUserInquiries(inquiries);

    });

  }

  function cancelAlerts() {
    setModalVisibility(false);
  }


  async function retrieveUserAnswers () {
    let userId= await AsyncStorage.getItem("id");
    let url = 'https://shurfa-flask.herokuapp.com/retrieveuseranswers/'+userId;

    fetch(url).then(res => {
        return res.json();
    }).then(res => {
        let answers = [];
        for (var i = 0; i < res.length; i++) {
          let obj = res[i];
          let newTimeStamp = res[i].time_stamp.substr(0,25); //format the timeStamp
          obj.time_stamp = newTimeStamp;
          answers.push(obj);
        } //end for
        setUserAnswers(answers);
    });

  }

  const getDeviceToken = async () => {
    console.log('here to  delete notification token')
    if (Constants.isDevice) {

      let token = '';
        const { status }= await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status=='granted'){
       token = await Notifications.getExpoPushTokenAsync();
       console.log('token in log out is:'+token)
        setExpoPushToken(token);
      }



    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };


  useEffect(() => {
    retrieveUserData();
    retrieveUserInquiries();
    retrieveUserAnswers();
    getDeviceToken();
    navigation.addListener(
   'didFocus',
   payload => {
     retrieveUserData();
     retrieveUserInquiries();
     retrieveUserAnswers();
     getDeviceToken();
   }
);


    fetch('https://shurfa-flask.herokuapp.com/nbhds')
    .then(response => response.json())
    .then(responseJson => {
      let nbhds = [];
      for (var i = 0; i < responseJson.length; i++) {
        nbhds.push(responseJson[i]['name']);
      }//end for
        setNeighborhoods(nbhds);
    })


    navigation.setParams({
            logout: logout,
            goToEditProfile: goToEditProfile,
        })
    }, []);

  return (

          <View >
          {modalVisibility?<Levels cancelAlerts={()=>cancelAlerts()}/>:null}
          <View style={[styles.container,{justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width}]} >

                <Image source={require("../assets/images/client-circle.png")} style={[styles.profilepic]} />

                {userData.level? <TouchableOpacity onPressIn={()=>{setModalVisibility(true)}}><Image
                  source={badges[userData.level].uri}
                  style={styles.badge}
                /></TouchableOpacity>:null}

                <AbdoMediumText size={20} style={{lineHeight:20, marginTop:20, fontWeight: "bold"}} color={Colors.darkBlue}>{userData.name}</AbdoMediumText>

                <View style={[styles.badgeContainer]}>
                  <AbdoRegularText size={12} style={{lineHeight:30, color:Colors.darkGray}}>{userData.points+' نقطة'}</AbdoRegularText>
                </View>

          </View>

          <View style={[styles.verticalAlignment]} >
          <TouchableOpacity style={[styles.tabsContainer]}
          onPressIn={() => {
            if (index==0)return;
             setIndex(0)
            swiper.scrollBy(0 - index, true);
            retrieveUserData();
            retrieveUserInquiries();
            retrieveUserAnswers();
          }}>
          <MaterialIcons name={"comment-question-outline"} color={index==0?Colors.blue:Colors.lightGray} size={25}/>

            <AbdoRegularText size={18} style={{color:index==0?Colors.blue:Colors.lightGray,paddingTop:10}}> الأسئلة</AbdoRegularText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabsContainer]}
          onPressIn={() => {
            if (index==1)return;
            setIndex(1);
            swiper.scrollBy(1 - index, true);
            retrieveUserData();
            retrieveUserInquiries();
            retrieveUserAnswers();
          }}>
          <DefMaterialIcons name={ 'question-answer' } color={index==1?Colors.blue:Colors.lightGray} size={25} />
            <AbdoRegularText size={18} style={{color:index==1?Colors.blue:Colors.lightGray,paddingTop:10}}>  الأجوبة</AbdoRegularText>
          </TouchableOpacity>
            </View>

          <View style={{width:'100%',height:'55%',paddingBottom:40,overflow:'visible'}}>
          <Swiper
          loop={false}
          onIndexChanged={index => setIndex(index)}
          ref={swiper => {
            setSwiper(swiper);
          }}
          showsPagination={false}>
              <ScrollView containerStyle={{paddingTop:20}}>
              {userInquiries.length>0 ? userInquiries.map((inquiry,index) => (


                        <View style={styles.card}>

                            <View style={styles.inquiryDetails} >

                              <View style={{paddingTop: 10}}>

                                <AbdoRegularText
                                  textAlign={"left"}
                                  size={16}
                                  style={styles.textCard}
                                >
                                  {inquiry.title}
                                </AbdoRegularText>
                              </View>

                              <TouchableOpacity
                                onPress={() => {navigation.navigate('inquiry',{inqID:inquiry.id})}}
                                style={styles.link}
                              >
                              <IonIcon size={24} name={"ios-arrow-back"} color={"white"} />
                              </TouchableOpacity>

                            </View>

                          </View>




                        )):(<View
                          style={{justifyContent:'center',height:320}}><AbdoRegularText
                          textAlign={"left"}
                          size={16}
                          style={{alignSelf:'center',color:Colors.lightGray}}
                        >
                          لم تقم بطرح أية أسئلة
                        </AbdoRegularText></View>) }
          </ScrollView>
          <ScrollView containerStyle={{paddingTop:20}} >
              {userAnswers.length>0? userAnswers.map((answer,index) => (



                <View style={styles.answerDetails} >

                  <View style={{paddingTop: 10}}>

                    <AbdoRegularText
                      textAlign={"left"}
                      size={16}
                      style={styles.textAnswer}
                    >
                    {answer.body}
                  </AbdoRegularText>

                  </View>
                  <View style={styles.answerDate}>

                  <AbdoRegularText
                    textAlign={"left"}
                    size={13}
                    style={styles.dateAnswer}
                  >
                  {answer.time_stamp}
                  </AbdoRegularText>

                  </View>
                  <TouchableOpacity style={styles.answerIcon} onPress={() => {navigation.navigate('inquiry',{inqID:answer.inqID})}}>
                  <IonIcon size={30} name={"ios-arrow-dropleft-circle"} color={Colors.darkYellow} />
                  </TouchableOpacity>
                </View>


          )):(<View
            style={{justifyContent:'center',height:320}}><AbdoRegularText
            textAlign={"left"}
            size={16}
            style={{alignSelf:'center',color:Colors.lightGray,width:'60%'}}
          >
            قم بالإجابة عن الأسئلة المطروحة في الأحياء للحصول على نقاط D:
          </AbdoRegularText></View>)}

          </ScrollView>
          </Swiper>

          </View>
      </View>
  );
}

UserProfile.navigationOptions = ({navigation}) => ({
  headerTintColor: Colors.darkMint,
  headerTitle: () => <SmallLogo />,
  headerStyle: {
    height: 55
  },
  headerRight: () => (
    <TouchableOpacity
      style={{marginRight: 15}}
      onPress={navigation.getParam('logout')}>
      <FeatherIconCustom name={'log-out'} size={26} color={Colors.darkMint} />
    </TouchableOpacity>
  ),
  headerLeft: () => (
    <TouchableOpacity
      style={{marginLeft: 15}}
      onPress={navigation.getParam('goToEditProfile')}
    >
      <MaterialCommunityIcons name={"square-edit-outline"} size={26} color={Colors.darkMint} />
    </TouchableOpacity>
  )
});



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
    justifyContent:'center',
    alignItems:'center',
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
    alignSelf:'center',
    width:85,
    height:88,
    borderRadius:100,
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
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    width:'50%',

},
inquiriesList: {
marginTop:20,
},

answersList: {
marginTop:20,
},
badge: {
  position:'absolute',
  bottom:-10,
  left:-10,
  width: 70,
  height: 70,
  alignSelf:'center'
},

card: {
  width: Dimensions.get("window").width,
  alignItems: "center",
  overflow: "visible",
  marginTop:5,
  marginBottom:20
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
  marginBottom: 10,
  marginTop: 10,
  flexDirection: "row",
  alignItems: "center",
  shadowOpacity: 0.08,
  shadowRadius: 7,
  shadowColor: "black",
  shadowOffset: {height: 0, width: 0},
  alignSelf:'center'
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


const NavigationConnected = withNavigation(UserProfile);
export {NavigationConnected as UserProfile};
