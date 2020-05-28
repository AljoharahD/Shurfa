import * as WebBrowser from 'expo-web-browser';
import { useState, useEffect } from 'react';
import {withNavigation} from "react-navigation";
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
  Button,
} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { SmallLogo } from '../components/SmallLogo';
import SimpleLineIcons from '../components/SimpleLineIcons';
import MaterialIcons from '../components/MaterialCommunityIcons';
import DefMaterialIcons from '../components/MaterialIcons';
import Foundation from '../components/Foundation';
import Instructions from '../components/Instructions';
import { RiyadhsRegions } from '../components/RiyadhsRegions';
import { SearchBar } from '../components/SearchBar';
import { AbdoRegularText } from '../components/AbdoRegularText';
import { AbdoMediumText } from '../components/AbdoMediumText';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import AntDesignIcon from '../components/AntDesignIcon';
import EntypoIcons from '../components/EntypoIcons';
import IonIcon from '../components/IonIcon';
import FeatherIcon from '../components/FeatherIcon';
import IconFeather from '../components/IconFeather';
import FeatherIconCustom from '../components/FeatherIconCustom';
import GradientButton from 'react-native-gradient-buttons';
import { Card } from 'react-native-elements';
import {Entypo} from '../components/Entypo';
import riyadhDistricts from '../RiyadhDistricts.json'
import checkIfFirstLaunch from '../utils/checkIfFirstLaunch';
import { AsyncStorage } from 'react-native';
import Modal from 'react-native-modal';
import data  from '../datasets/KPIs.json';
import fttpData from '../datasets/FTTP.json';
import demog from '../datasets/demographics.json';
import * as Device from 'expo-device';
import { NavigationActions } from 'react-navigation';

export default function HomeScreen({ navigation }) {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false)
  const [userData, setUserData] = useState({email:'',id:'',name:'',nbhd:'',notStat:'',points:''})
  const [notification, setNotification] = useState({});
  const[userNbhdID,setUserNbhdID] = useState(0);
    const[userNbhdEn,setUserNbhdEn] = useState(0);


   async function firstLaunch() {
     try {
      let isFirstLaunch = await AsyncStorage.getItem("isFirstLaunch");
      if (isFirstLaunch==null){
      await AsyncStorage.setItem("isFirstLaunch", 'true');
      setIsFirstLaunch(true)}
      else {
      setIsFirstLaunch(false)
      }
     } catch (error) {
       console.log("Something went wrong", error);
     } // user full
   }

   async function retrieveUserData() {
     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
     let userEmail= await AsyncStorage.getItem("email");
     let userId= await AsyncStorage.getItem("id");
     let name=await AsyncStorage.getItem("name");
     let nbhd=await AsyncStorage.getItem("nbhd");
     let nbhdEn=await AsyncStorage.getItem("nbhdEn");
     let nbhdID=await AsyncStorage.getItem("nbhdID");
     let notStat=await AsyncStorage.getItem("notStat");
     let points=await AsyncStorage.getItem("points");
      if (userEmail==null)
      return;
     setUserData({email:userEmail.replace(/['"]+/g, ''),id:userId.replace(/['"]+/g, ''),name:name.replace(/['"]+/g, ''),nbhd:nbhd.replace(/['"]+/g, ''),nbhdEn:nbhdEn.replace(/['"]+/g, ''),nbhdID:nbhdID.replace(/['"]+/g, ''),notStat:notStat.replace(/['"]+/g, ''),points:Number(points.replace(/['"]+/g, ''))})
console.log(JSON.stringify(userData))
   }

   async function retrieveNeighborhoodInfo (){
     let nbhd=await AsyncStorage.getItem("nbhd");
     nbhd = nbhd.replace(/"/g,"");

     riyadhDistricts.map((neighborhood, index) => {
         if (neighborhood.name_ar == nbhd){
         setUserNbhdEn(riyadhDistricts[index].name_en)
         setUserNbhdID(riyadhDistricts[index].district_id)
       }
     })
   }

   _handleNotification = notification => {
    navigation.navigate(notification.data.page,{inqID:notification.data.inqID, inqBody:notification.data.inqBody})
    console.log(notification);
    //i dont think we need the below line now
    setNotification(notification);
    //delete the notification when it is selected.. so its not shown in the notifications tab
    if (notification.origin=="selected"){
      console.log("inside selected")
      //delete
      let url = 'https://shurfa-flask.herokuapp.com/removenotification/'+notification.data.notID;
      console.log(url);
      fetch(url).then(res => {
          return res.json();
      }).then(res => {
         console.log(res);
      });
    }
  }



  async function retrieveNotifications() {
     let token = await AsyncStorage.getItem("token");
     // just for testing: let token="ExponentPushToken[x_HkqdLIIZMTZHTAwGMUSB]"
     let url = 'https://shurfa-flask.herokuapp.com/retrievenotifications/'+token;
     console.log(url);
     fetch(url).then(res => {
         return res.json();
     }).then(res => {
        console.log(res);
     });
  }




   useEffect( () => {
     retrieveUserData();
     firstLaunch();
     retrieveNeighborhoodInfo();
     navigation.addListener(
      'didFocus',
      payload => {
        retrieveUserData();
      }
  );


     this._notificationSubscription = Notifications.addListener(_handleNotification);

}, []);

  return (
<View style={styles.container}>

{!isFirstLaunch?<Instructions navigation={navigation}/>:null}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>



        {userData.email!=''&&userData.nbhd!='-1'?<View
        style={{  marginTop:15,flexGrow: 1,justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width}} >
        <TouchableOpacity style={[styles.usersNeighborhood]}
        onPress = {()=>{navigation.navigate('NeighborhoodProfile',{neighborhoodName:userData.nbhd,neighborhoodNameEn:userNbhdEn,neighborhoodID:userNbhdID})}}
        >
        <View style={[styles.verticalAlignment]} >
        <AbdoRegularText size={18} style={{color:Colors.darkMint,lineHeight:28,left:20}}>{userData.nbhd}</AbdoRegularText>

        <IonIcon name={ 'ios-arrow-back' } size={24} color={Colors.darkMint} style={{position:'absolute',right:20}}/>
        </View>

        </TouchableOpacity>

        </View>:null}



        <View
        style={{justifyContent: 'center',
        flexGrow:1,
        alignItems: 'center',
        width:Dimensions.get('window').width,
        backgroundColor:'white',
        shadowOpacity: 0.04,
        shadowRadius: 10,
        shadowColor: 'black',overflow: 'visible',
        shadowOffset: { height: -5, width: 0 },}} >

        <View style={[styles.adjacent]} >
        <FeatherIconCustom name={ 'map' } color={Colors.mediumGray}/>
        <AbdoRegularText size={18} style={{color:Colors.mediumGray,lineHeight:28}}> استكشف أحياء الرياض</AbdoRegularText>
        </View>

<TouchableOpacity
  style={{height:45,marginBottom:30}}
  onPress = { ()=>{
    navigation.navigate('Search', { transition: false})}
    }>
<SearchBar Editable={false} pointerEvents={'none'} />
</TouchableOpacity>
        <RiyadhsRegions
        />
        <View>
        </View>
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
    headerTintColor:Colors.darkMint,
  headerTitle: () => <SmallLogo />,
  headerStyle: {
        height:55,
      },
};

const styles = StyleSheet.create({
  adjacent: {
    marginBottom:20,
    flexDirection: 'row',
  },
  searchBar: {
    flex:1,
    height:45,
    width:320,
    alignItems: 'center',
    marginBottom:40,
    borderRadius:25,
    backgroundColor:'white',
    textAlign:'right',
    flexDirection: 'row',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowColor: 'black',overflow: 'visible',
    shadowOffset: { height: 0, width: 0 },
  },
  usersNeighborhood:{
    flex:1,
    width: 350,
    height:50,
    flexDirection: 'row',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    paddingTop:5,
    backgroundColor:Colors.lightMint,
  },
  verticalAlignment:{
    flex:1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    flex:1,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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

const NavigationConnected = withNavigation(HomeScreen);
export {NavigationConnected as HomeScreen};
