import {withNavigation} from "react-navigation";
import React, { useState, useEffect } from 'react';
import {
  Image,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  AsyncStorage,
  Alert
} from 'react-native';
import IonIcon from '../components/IonIcon';
import { AbdoRegularText } from '../components/AbdoRegularText';
import {AbdoMediumText} from '../components/AbdoMediumText';
import Colors from '../constants/Colors';
import GradientButton from 'react-native-gradient-buttons';
import { Dropdown } from 'react-native-material-dropdown';
import RiyadhDistrictsRegions from '../RiyadhDistrictsRegions.json'

import RNPickerSelect from 'react-native-picker-select';
import { BackButton } from '../components/BackButton';
import { colors } from "react-native-elements";
import ToggleSwitch from 'toggle-switch-react-native'
import SwitchToggle from 'react-native-switch-toggle';

import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';



const { width, height } = Dimensions.get("window");

export default function EditProfile({navigation}) {

  async function retrieveUserData() {
    console.log("inside retrieve user data")
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    let userEmail= await AsyncStorage.getItem("email");
    let userId= await AsyncStorage.getItem("id");
    let name=await AsyncStorage.getItem("name");
    let nbhd=await AsyncStorage.getItem("nbhd");
    let nbhdEn=await AsyncStorage.getItem("nbhdEn");
    let nbhdID=await AsyncStorage.getItem("nbhdID");
    let notStat=await AsyncStorage.getItem("notStat");
    console.log("not stat value : " + notStat);
    console.log("not stat type: " + typeof(notStat)); //string and it is a number
    if (notStat=="1"){
      setReceiveNotifications(true)
      console.log("Receive notifications : " + receiveNotifications)
    }
    else{
      console.log("value of not stat inside retrieve user data is : " + notStat);
    }
    
    let points=await AsyncStorage.getItem("points");
     if (userEmail==null)
     return;
    setUserData({email:userEmail.replace(/['"]+/g, ''),id:userId.replace(/['"]+/g, ''),name:name.replace(/['"]+/g, ''),nbhd:nbhd.replace(/['"]+/g, ''),nbhdEn:nbhdEn.replace(/['"]+/g, ''),nbhdID:nbhdID.replace(/['"]+/g, ''),notStat:notStat.replace(/['"]+/g, ''),points:Number(points.replace(/['"]+/g, ''))})
console.log(JSON.stringify(userData))
  }


  const placeholder = {
  label: 'الحي السكني...',
  value: -1,
  color:Colors.lightGray
};

const [name, setName] = useState('');
const [nameBorders, setNameBorders] = useState(Colors.brightGray);
const [email, setEmail] = useState('');
const [emailBorders, setEmailBorders] = useState(Colors.brightGray);
const [emailErrorMsg, setEmailErrorMsg] = useState('none');

const [password, setPassword] = useState('');
const [passBorders, setPassBorders] = useState(Colors.brightGray);
const [confPassword, setConfPassword] = useState('');
const [passConfBorders, setConfPassBorders] = useState(Colors.brightGray);
const [passErrorMsg, setPassErrorMsg] = useState('none');

const [expoPushToken, setExpoPushToken] = useState('');
const [receiveNotifications, setReceiveNotifications] = useState();

const [errorMsgVisibility, setErrorMsgVisibility] = useState('none');

const [neighborhood, setNeighborhood] = useState(-1);
const [neighborhoods, setNeighborhoods] = useState('');
const [switchOn, setSwitchOn] = useState(true);
const [userData, setUserData] = useState({email:'',id:'',name:'',nbhd:'',notStat:'',points:''})

const registerForPushNotificationsAsync = async () => {
  console.log('here to update notification')
  if (Constants.isDevice) {

   // const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
   //  console.log('existingStatus'+existingStatus)
    let token = '';
    if (!receiveNotifications) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status=='granted'){
      setReceiveNotifications(true)
     token = await Notifications.getExpoPushTokenAsync();
     console.log('token is:'+token)
      setExpoPushToken(token);
    }
      else{
      setReceiveNotifications(false)
        Alert.alert('من الإعدادات','فضلًا فعّل استقبال تنبيهات شرفة من الإعدادات أولًا')
      token = '';
      setExpoPushToken(token);
    }
    }

    else
    setReceiveNotifications(false)


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


function sortNeighborhoods( a, b ) {
  if ( a.value.name_ar < b.value.name_ar ){
  return -1;
  }
  if ( a.value.name_ar > b.value.name_ar ){
  return 1;
  }
  return 0;
  }

const retrieveNeighborhood =  () => {
  let neighborhoodList=[];

        RiyadhDistrictsRegions.map((neighborhood, index) => {
            neighborhoodList.push({label:neighborhood.name_ar,value:{name_ar:neighborhood.name_ar,name_en:neighborhood.name_en,id:neighborhood.district_id}})
        })
neighborhoodList.sort( sortNeighborhoods );
    setNeighborhoods(neighborhoodList);
}

 const validateEmail = () => {
    if(email==''){
      setEmailErrorMsg('none')
      return true;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(email)===false){
      setEmailErrorMsg('flex')
      setEmailBorders(Colors.darkRed)
      return false;
    }
    
  }

const identicalPass = () => {
  if (password !== confPassword){
      setConfPassBorders(Colors.darkRed)
      setPassErrorMsg('flex')
      return false;
  }
  else {
    setPassErrorMsg('none')
    setPassBorders(Colors.brightGray)
    setConfPassBorders(Colors.brightGray)
    return true;
  }
}

async function handleEditProfile(){
  let userId= await AsyncStorage.getItem("id");

  console.log("name: " + name);
  if (name != ''){
    console.log("name: " + name);
    console.log("id: " + userId)
      let url = "https://shurfa-flask.herokuapp.com/changename/"+userId;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
        }),
      }).then(res => {
          return res.json();
        })
        .then(res => {
          console.log(res);
      });
  }

  let flag = validateEmail();
  if (email != '' && flag){
    console.log("email: " + email);
    let url = "https://shurfa-flask.herokuapp.com/changeemail/"+userId;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
    });
}
console.log("nbhd: " + neighborhood);
if (neighborhood != -1){
  console.log("nbhd: " + neighborhood);
  console.log("change nbhd after")
  console.log(neighborhood.name_ar)
  console.log(neighborhood.name_en)
  console.log(neighborhood.id)
  let url = "https://shurfa-flask.herokuapp.com/changenbhd/"+userId;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nbhd: neighborhood==-1?-1:neighborhood.name_ar,
      nbhdEn:neighborhood==-1?-1:neighborhood.name_en,
      nbhdID:neighborhood==-1?-1:neighborhood.id,
    }),
  }).then(res => {
      return res.json();
    })
    .then(async (res) => {
      console.log(res);
      try {  
         await AsyncStorage.setItem("nbhd", JSON.stringify(neighborhood.name_ar));
          } catch (error) {
            console.log("Something went wrong", error);
          } // user full info are retrieved
  });
}
flag = identicalPass();
console.log("pass: " + password);
if (password != '' && flag){
  console.log("pass: " + password);
  let url = "https://shurfa-flask.herokuapp.com/changepassword/"+userId;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
    }),
  }).then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res);
  });
}

//change notification status
console.log("current receive notification: " + receiveNotifications);
let url = "https://shurfa-flask.herokuapp.com/toggleusernot/"+userId;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notStat:receiveNotifications=="1"?1:0,
    }),
  }).then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res);
  });
  try {  
    console.log("print notStat here here here: " + receiveNotifications);
    if (receiveNotifications=="1")
    await AsyncStorage.setItem("notStat", JSON.stringify(1));
    else
    await AsyncStorage.setItem("notStat", JSON.stringify(0));
      } catch (error) {
        console.log("Something went wrong", error);
      } // user full info are retrieved

      Alert.alert("شكرًا", "تم تحديث البيانات بنجاح");

navigation.navigate('UserProfile')
}//end method

const deleteUser = () => {
    Alert.alert(
    'هل أنت متأكد من رغبتك بإزالة حسابك؟',
    '',
    [
      {
        text: 'إلغاء',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'نعم', onPress: async () => {
        let url = 'https://shurfa-flask.herokuapp.com/deleteuser/'+id;
        console.log(url);
        fetch(url, {
            method: 'DELETE'
          }).then(res => {
            return res.json();
          })
          .then(res => {
            console.log(res);
        });
        //Also clear the current session:
        try {
          await AsyncStorage.setItem("email", '');
          await AsyncStorage.setItem("id", '');
          await AsyncStorage.setItem("name",'');
          await AsyncStorage.setItem("nbhd", '');
          await AsyncStorage.setItem("notStat", '');
          await AsyncStorage.setItem("password", '');
          await AsyncStorage.setItem("points", '');
          navigation.navigate('GeneralTabNavigator')
          } catch (error) {
            console.log("Something went wrong", error);
          } // user full info are deleted
      }//end on press
    },
    ],
    {cancelable: false},
    );
}



const onPressNotification = () => {
  registerForPushNotificationsAsync();
   //setSwitchOn(!switchOn );
 }
useEffect(() => {
  retrieveUserData();
  retrieveNeighborhood();
  navigation.addListener(
    'didFocus',
    payload => {
      retrieveUserData();
    }
 );
}, []);

  return (
    <ScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
    <View style={styles.form}>
      <AbdoRegularText size={24} style={styles.header}>التعديل</AbdoRegularText>

      <View style={[styles.adjacent]}>
      <TextInput
      style={[styles.inputBar,{borderColor:nameBorders}]}
      placeholder="الاسم"
      keyboardType="TextInput"
      onChangeText={(name) => {
      setName(name)
      setNameBorders(Colors.brightGray)
      }}
      value={name}
      />
      </View>

      <View style={[styles.adjacent]}>
      <TextInput
      style={[styles.inputBar,{borderColor:emailBorders}]}
      placeholder="البريد الإلكتروني"
      keyboardType="email-address"
      onChangeText={(email) => {
      setEmail(email)
      setEmailBorders(Colors.brightGray)
      setEmailErrorMsg('none')
      }}
      onEndEditing={(email) => validateEmail()}
      value={email}
      />
      </View>
      <AbdoRegularText size={12} textAlign={'left'} style={{height:22,color:Colors.darkRed,lineHeight:28,marginLeft:25, marginTop:15,display:emailErrorMsg,marginBottom:-15}}>
          البريد الإلكتروني غير صحيح
         </AbdoRegularText>


      <View style={[styles.adjacent]}>
      <TextInput
      style={[styles.inputBar,{borderColor:passBorders}]}
      placeholder="كلمة المرور"
      secureTextEntry={true}
      underlineColorAndroid='transparent'
      autoCapitalize="none"
      blurOnSubmit={false}
      textContentType="newPassword"
      onChangeText={(password) => {
        setPassword(password)
        setPassBorders(Colors.brightGray)
      }}
      />
      </View>

      <View style={[styles.adjacent]}>
      <TextInput
      style={[styles.inputBar,{borderColor:passConfBorders}]}
      placeholder="تأكيد كلمة المرور"
      secureTextEntry={true}
      underlineColorAndroid='transparent'
      autoCapitalize="none"
      blurOnSubmit={false}
      onChangeText={(confirmPassword) => {
        setConfPassword(confirmPassword)
        setConfPassBorders(Colors.brightGray)
      }}
      onEndEditing={(confirmPassword) =>{identicalPass()}}
      />
      </View>
      <AbdoRegularText size={12} textAlign={'left'} style={{height:22,color:Colors.darkRed,lineHeight:28,marginLeft:25, marginTop:15,display:passErrorMsg,marginBottom:-15}}>
      كلمتا المرور غير متطابقة
      </AbdoRegularText>

    <RNPickerSelect
      onValueChange={(value) => {
      setNeighborhood(value)
      console.log("here: " + neighborhood)
      }
      }
      placeholder={placeholder}
      Icon={() => {
          return <IonIcon size={24} name="ios-arrow-down" color={Colors.lightGray} />;
        }}
      value={neighborhood}
      style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 45,
              right: 30,
            },
            placeholder: {
              fontSize: 14,
            },
          }}
      items={neighborhoods}
      />
<View style={{flexDirection: "row"}}>
      <AbdoRegularText size={12} textAlign={'left'} style={{height:22,color:'black',lineHeight:28,marginLeft:25, marginTop:30}}>
    تفعيل إشعارات شرفة
      </AbdoRegularText>
      <AbdoRegularText size={10} textAlign={'left'} style={{height:22,color:Colors.lightGray,lineHeight:28,right:120, marginTop:53}}>
  استقبال إشعارات في حال تلقيت إجابة على سؤالك

      </AbdoRegularText>
      <View style={{right:100,top:35}}>
      <SwitchToggle
            containerStyle={{
            marginTop: 16,
            width: 51,
            height: 28,
            borderRadius: 30,
            padding:3,
            transform: [{rotateY: '180deg'}]
          }}
          backgroundColorOn="#7BC3B5"
          backgroundColorOff="#e5e1e0"
          circleStyle={{
            width:25,
            height: 25,
            borderRadius: 27.5,
            left:20,
            backgroundColor: "blue" // rgb(102,134,205)
          }}
          switchOn={receiveNotifications}
          onPress={() => onPressNotification()}
          circleColorOff="white"
          circleColorOn="white"
          duration={200}
          />
      </View>
</View>
      <GradientButton
          textStyle={{margin: 5, padding: 5}}
          style={{ marginTop: 50 , alignItems:"center", alignSelf:'center',}}
          gradientBegin="#4E7DC4"
            gradientEnd="#91D5EB"
          //gradientBegin="#7BC3B5"
          //gradientEnd="#ABDBD1"
          gradientDirection="diagonal"
          height={45}
          width={width*0.85-30}
          radius={25}
          onPressAction={() => handleEditProfile()}>
          <AbdoRegularText size={18} style={{lineHeight:28}}>حفظ التعديلات</AbdoRegularText>
      </GradientButton>
      <GradientButton
          style={{ margin: 8 , alignItems:"center", alignSelf:'center',}}
          textStyle={{margin: 5, padding: 5}}
          gradientBegin="#DD610A"
          gradientEnd="#DD610A"
          gradientDirection="diagonal"
          height={45}
          width={width*0.85-30}
          radius={25}
          onPressAction={() => deleteUser()}>
          <AbdoRegularText size={18} style={{lineHeight:28}}>حذف الحساب</AbdoRegularText>
      </GradientButton>

        </View>
          </View>
    </TouchableWithoutFeedback>
    </ScrollView>

  );

}
/*
  const styles = StyleSheet.create({

    scrollView: {
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      paddingVertical: 10,
    },

    container: {
      flex: 1,
      backgroundColor: '#FFFCEB',
      align
    },

    contentContainer: {
      paddingTop: 15,
    },

    inputContainer: {
      borderColor: '#EAEAEA',
      backgroundColor: 'white',
      borderRadius:25,
      borderWidth: 1,
      width:320,
      height:40,
      marginBottom:20,
      paddingHorizontal:10,
  },

    input:{
      flex:1,
      height:40,
      textAlign:'right',
      borderColor: '#EAEAEA',
      marginLeft:10,
  },

    header:{
      color: '#EBBD1C',
      bottom: 10,
      lineHeight:29,
  },

    smallContainer:{
      marginTop:30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius:15,
      width:350,
      height:520,
      marginBottom:30,
      shadowOpacity: 0.04,
      shadowRadius: 5,
      shadowColor: 'black',
      shadowOffset: { height: 0, width: 0 }
  },

  neighborhoodList: {
    borderColor: '#EAEAEA',
    backgroundColor: 'white',
    borderRadius:25,
    width:320,
    height:40,
    marginBottom:30,

  },

  });
  */
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      height: 45,
      marginTop:35,
      width:(Dimensions.get("window").width*0.85)-30,
      alignSelf:'center',
      fontFamily: "Abdo-Master-Regular",
      textAlign: "right",
      paddingLeft:15,
      color:Colors.vDarkGray,
      fontSize:16,
      borderRadius: 25,
      backgroundColor:'white',
      flexDirection: "row",
      borderColor:Colors.brightGray,
      borderWidth:0.5,
    }
  });

  const styles = StyleSheet.create({

    form: {
      width:Dimensions.get("window").width*0.85,
      borderRadius:15,
      marginTop:60,
      marginBottom:15,
      paddingBottom:30,
      shadowOpacity: 0.05,
      shadowRadius: 5,
      shadowColor: "black",
      overflow: "visible",
      shadowOffset: {height: 0, width: 0},
      backgroundColor:'white'
    },
    container: {
      flex: 1,
      backgroundColor: Colors.lightBlue,
      alignItems: 'center'
    },

      adjacent:{
        marginTop: 20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
      },

      header:{
        color: Colors.blue,
        top: 20,
        lineHeight:29,
        fontFamily: "Abdo-Master-Regular",
    },

    inputBar: {
      height: 45,
      width:(Dimensions.get("window").width*0.85)-30,
      alignSelf:'center',
      fontFamily: "Abdo-Master-Regular",
      textAlign: "right",
      paddingLeft:15,
      borderRadius: 25,
      backgroundColor: "white",
      flexDirection: "row",
      borderColor:Colors.brightGray,
      borderWidth:0.5,
      color:Colors.vDarkGray,
      fontSize:14,
      top:15
    },
    clearButton: {
      height:45,
      width:300,
      alignSelf:'center',
      paddingTop:5,
      marginTop:20,
      borderColor:Colors.darkBlue,
      borderWidth:1,
      borderRadius:25
    },

    horizontalRuler:{
      backgroundColor: Colors.lightGray,
      height: 0.5,
      width:'40%',
    },

  });

  EditProfile.navigationOptions = {
    headerTintColor:Colors.darkMint,
    headerTitle: () => <AbdoMediumText size={18} color={Colors.darkMint}>البيانات الشخصية</AbdoMediumText>,
    headerStyle: {
          height:55,
        },
  };

const NavigationConnected = withNavigation(EditProfile);
export {NavigationConnected as EditProfile};
