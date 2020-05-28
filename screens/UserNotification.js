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
  Alert,
    Vibration,
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




export default function UserNotification({ navigation }) {

  const [userData, setUserData] = useState({email:'',id:'',name:'',nbhd:'',notStat:'',points:'',level:'',token:''})
  const [notifications, setNotifications] = useState([])
 
 const clearAllNotifications = async () => {
   let userID = await AsyncStorage.getItem("id");
   let url = 'https://shurfa-flask.herokuapp.com/removenotifications/'+userID;
   console.log('removenotifications::'+url)
   fetch(url)
     .then((res) => {
       return res.json();
     })
     .then((res) => {
       console.log(res)
     });
retrieveAllNotifications();
  }

  const discardNotification = (id) => {
    let url = 'https://shurfa-flask.herokuapp.com/removenotification/'+id;
    console.log('removenotification::'+url)
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res)
      });
retrieveAllNotifications();
   }

  const retrieveAllNotifications = async () => {
    let userID = await AsyncStorage.getItem("id");
    // just for testing: let token="ExponentPushToken[x_HkqdLIIZMTZHTAwGMUSB]"
    // Replace with : userData.token
    console.log("user id inside retrieve all notifications: " + userID);
    let url = 'https://shurfa-flask.herokuapp.com/retrievenotifications/'+userID;
    console.log(url);
    fetch(url).then(res => {
        return res.json();
    }).then(res => {
      let notificationsList = [];
      for (var i = 0; i < res.length; i++) {
        let notification = res[i];
        notificationsList.push(notification);
        console.log(notificationsList)
      } //end for
      setNotifications(notificationsList);
    });

   }


  async function retrieveUserData() {

    let userId= await AsyncStorage.getItem("id");
    let url = 'https://shurfa-flask.herokuapp.com/user/'+userId;

    fetch(url).then(res => {
        return res.json();
    }).then(res => {

      setUserData({email:res.email,id:userId,name:res.name,nbhd:res.nbhd,notStat:res.notStat,level:res.level,points:res.points,token:res.token})

    });

}





  useEffect(() => {
    retrieveUserData();
    retrieveAllNotifications();
    navigation.addListener(
   'didFocus',
   payload => {
     retrieveUserData();
     retrieveAllNotifications();
   }
);
    navigation.setParams({
            clearAllNotifications: clearAllNotifications,
        })

        // Handle notifications that are received or selected while the app
       // is open. If the app was closed and then opened by tapping the
       // notification (rather than just tapping the app icon to open it),
       // this function will fire on the next tick after the app starts
       // with the notification data.


    }, []);





  return (

        <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom:Dimensions.get("window").height * 0.235}}>

{notifications.length>0? notifications.map((notification,index) => (



  <View style={styles.notificationDetails} >

<View >
    <AbdoMediumText

      size={16}
      color={notification.page!='inquiry'?Colors.darkGreen:Colors.darkBlue}
      style={styles.textAnswer}
    >
  {notification.page=='inquiry'?'سؤال جديد بانتظار إجابتك!':'تلقيت إجابة على سؤالك'}
  </AbdoMediumText>
    <AbdoRegularText
      textAlign={"left"}
      size={16}
      numberOfLines={1}
      style={styles.textAnswer}
    >
{notification.inqBody}
  </AbdoRegularText>
</View>

    <TouchableOpacity style={styles.answerIcon} onPress={() => {
      discardNotification(notification.id); navigation.navigate(notification.page,{inqID:notification.inqID, inqBody:notification.inqBody})}}>
    <IonIcon size={30} name={"ios-arrow-dropleft-circle"} color={Colors.darkYellow} />
    </TouchableOpacity>
  </View>


)):(<View
style={{justifyContent:'center',height:320}}><AbdoRegularText
size={16}
style={{alignSelf:'center',color:Colors.lightGray,width:'60%'}}
>
لا توجد أي مستجدات
</AbdoRegularText></View>)}

            </ScrollView>
      </View>
  );
}

UserNotification.navigationOptions = ({navigation}) => ({
  headerTintColor: Colors.darkMint,
  headerTitle: () => <AbdoMediumText size={18} color={Colors.darkMint}>المستجدات</AbdoMediumText>,
  headerStyle: {
    height: 55
  },
  headerLeft: () => (
    <TouchableOpacity
      style={{marginLeft: 15}}
      onPress={ () => {
        navigation.getParam('clearAllNotifications')}
      }
    >
      <MaterialCommunityIcons name={"checkbox-marked-outline"} size={26} color={Colors.darkMint} />
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

    height:Dimensions.get("window").height,
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
  marginTop:10,
  marginBottom:10
},

answerContainer: {
  width: Dimensions.get("window").width,
  alignItems: "center",
  overflow: "visible",
},

notificationDetails: {
  width: Dimensions.get("window").width * 0.9,
  backgroundColor: "white",
  height: 120,
  paddingTop:20,
  borderRadius: 10,
  marginBottom: 10,
  marginTop: 10,

  shadowOpacity: 0.08,
  shadowRadius: 7,
  shadowColor: "black",
  shadowOffset: {height: 0, width: 0},
  alignSelf:'center',
},

textCard: {
  fontSize: 18,
  marginLeft: 14,
  color: Colors.darkYellow,
  lineHeight: 28
},

textAnswer: {
  color:Colors.mediumGray,
  width:250,
  textAlign:'left',
  marginLeft: 14,

},

dateAnswer: {

  fontSize: 18,

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


const NavigationConnected = withNavigation(UserNotification);
export {NavigationConnected as UserNotification};
