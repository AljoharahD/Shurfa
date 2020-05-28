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
  Alert,
  StatusBar,
  AsyncStorage
} from "react-native";
import IonIcon from '../components/IonIcon';
import { AbdoRegularText } from '../components/AbdoRegularText';
import Colors from '../constants/Colors';
import {AbdoMediumText} from "../components/AbdoMediumText";
import FeatherIconCustom from "../components/FeatherIconCustom";
import GradientButton from "react-native-gradient-buttons";
import { BackButton } from '../components/BackButton';
import RNPickerSelect from 'react-native-picker-select';
import * as RiyadhDistrictsRegions from '../RiyadhDistrictsRegions.json'
import SuccessRegistration from '../components/alertMessages/SuccessRegistration';
import SwitchToggle from 'react-native-switch-toggle';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


//will pass user id here
export default function Register({navigation})  {

  const placeholder = {
        label: 'الحي السكني...',
        value: -1,
        color:Colors.lightGray
      };

  const [name, setName] = useState('');
  const [nameBorders, setNameBorders] = useState(Colors.brightGray);
  const [email, setEmail] = useState('');
  const [emailBorders, setEmailBorders] = useState(Colors.brightGray);
  const [password, setPassword] = useState('');
  const [passBorders, setPassBorders] = useState(Colors.brightGray);
  const [confPassword, setConfPassword] = useState('');
  const [passConfBorders, setConfPassBorders] = useState(Colors.brightGray);
  const [passErrorMsg, setPassErrorMsg] = useState('none');
  const [emailErrorMsg, setEmailErrorMsg] = useState('none');
  const [errorMsgVisibility, setErrorMsgVisibility] = useState('none');
  const [neighborhood, setNeighborhood] = useState(-1);
  const [expoPushToken, setExpoPushToken] = useState('');


  const [neighborhoods, setNeighborhoods] = useState('');
const [alertVisibility, setAlertVisibility] = useState(false);
const [failedRegistration, setFailedRegistration] = useState('none');
const [receiveNotifications, setReceiveNotifications] = useState(false);


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
    //let RiyadhDistrictsRegions=require('../RiyadhDistrictsRegions.json');
        RiyadhDistrictsRegions.map((neighborhood, index) => {
            neighborhoodList.push({label:neighborhood.name_ar,value:{name_ar:neighborhood.name_ar,name_en:neighborhood.name_en,id:neighborhood.district_id}})
        })
neighborhoodList.sort( sortNeighborhoods );
    setNeighborhoods(neighborhoodList);

  }

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(email)===false){
      setEmailErrorMsg('flex')
      setEmailBorders(Colors.darkRed)
      return false;
    }
    setEmailErrorMsg('none')
    return true;
  }

  const identicalPass = () => {
    if (password !== confPassword){
        setConfPassBorders(Colors.darkRed)
        setPassErrorMsg('flex')
    }
    else {
      setPassErrorMsg('none')
    }
}


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



const onPressNotification = () => {
    registerForPushNotificationsAsync();
 }


  const handleRegister =  () => {
    if(name=='' || email=='' || password=='' || confPassword==''){
      setErrorMsgVisibility('flex');
      return false;
    }
    if(errorMsgVisibility=='flex'||passErrorMsg=='flex' || emailErrorMsg=='flex'){
    return;
    }
    // let emailValidated = validateEmail();
    // let passValidated = identicalPass();
    // if (!emailValidated){
    //   console.log("email is not validated")
    //   return;
    // }
    // if (!passValidated){
    //   console.log("password is not validated")
    //   return;
    // }

    //else:
    fetch('https://shurfa-flask.herokuapp.com/adduser', {
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name, //replaced with values from input fields
        email: email,
        password: password,
        nbhd: neighborhood==-1?-1:neighborhood.name_ar,
        nbhdEn:neighborhood==-1?-1:neighborhood.name_en,
        nbhdID:neighborhood==-1?-1:neighborhood.id,
        notStat:receiveNotifications?1:0,
        token:expoPushToken,
      }),
    }).then(res => {
      console.log('reg. res'+JSON.stringify(res))
        return res.json();

      })
      .then(res => {
        console.log("response is: ");
        console.log(res);
        if (res =='User added successfully'){
        setAlertVisibility(true)
      return true;}
        else {
        setFailedRegistration('flex')
      return false;}

    });
  }


  useEffect(() => {
    retrieveUserData();
    retrieveNeighborhood();
  }, []);




  return (
    <ScrollView>

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{flex:1,  alignItems:'center'}}>
    {alertVisibility?<SuccessRegistration navigation={navigation}/>:null}
    <View style={styles.form}>


        <View style={[styles.adjacent]}>

        <TextInput
        style={[styles.inputBar,{borderColor:nameBorders}]}
        placeholder="الاسم"
        keyboardType="TextInput"
        onChangeText={(name) => {
            setName(name)
            setNameBorders(Colors.brightGray)
            setErrorMsgVisibility('none');
        }}></TextInput>
        <AbdoRegularText size={18} style={{height:18,marginLeft:5,color:Colors.darkRed,lineHeight:28}}>
          *
        </AbdoRegularText>
        </View>

        <View style={[styles.adjacent]}>
        <TextInput
        style={[styles.inputBar,{borderColor:emailBorders}]}
        placeholder="البريد الإلكتروني"
        keyboardType="email-address"
        onChangeText={(email) => {
            setEmail(email)
            setEmailBorders(Colors.brightGray)
            setErrorMsgVisibility('none');
            setFailedRegistration('none');
        }}
        onEndEditing={(email) => validateEmail()}></TextInput>
        <AbdoRegularText size={18} style={{height:18,marginLeft:5,color:Colors.darkRed,lineHeight:28}}>
          *
        </AbdoRegularText>
        </View>

        <AbdoRegularText size={12} textAlign={'left'} style={{height:22,color:Colors.darkRed,lineHeight:28,marginLeft:25, marginTop:10,display:emailErrorMsg}}>
          البريد الإلكتروني غير صحيح
         </AbdoRegularText>

        <View style={[styles.adjacent]}>
        <TextInput
          style={[styles.inputBar,{borderColor:passBorders}]}
          secureTextEntry={true}
          onChangeText={(password) => {
                setPassword(password)
                setPassBorders(Colors.brightGray)
                setErrorMsgVisibility('none');
                  }}
          placeholder="كلمة المرور"></TextInput>
          <AbdoRegularText size={18} style={{height:18,marginLeft:5,color:Colors.darkRed,lineHeight:28}}>
            *
          </AbdoRegularText>
          </View>

          <View style={[styles.adjacent]}>
          <TextInput
          style={[styles.inputBar,{borderColor:passConfBorders}]}
          secureTextEntry={true}
          onChangeText={(confirmPassword) => {
                setConfPassword(confirmPassword)
                setConfPassBorders(Colors.brightGray)
                setErrorMsgVisibility('none');
                }}
          onEndEditing={(confirmPassword) =>{identicalPass()}}
          placeholder="تأكيد كلمة المرور"></TextInput>
          <AbdoRegularText size={18} style={{height:18,marginLeft:5,color:Colors.darkRed,lineHeight:28}}>
            *
          </AbdoRegularText>
          </View>

          <AbdoRegularText size={12} textAlign={'left'} style={{height:22,color:Colors.darkRed,lineHeight:28,marginLeft:25, marginTop:10,display:passErrorMsg}}>
          كلمتا المرور غير متطابقة
         </AbdoRegularText>



         <AbdoRegularText size={12} textAlign={'left'} style={{height:22,color:Colors.darkRed,lineHeight:28,marginLeft:25, marginTop:10,display:errorMsgVisibility}}>
         فضلًا، قم بتعبئة الحقول المطلوبة
        </AbdoRegularText>
        <AbdoRegularText size={12} textAlign={'left'} style={{height:22,color:Colors.darkRed,lineHeight:28,marginLeft:25, marginTop:10,display:failedRegistration}}>
        البريد الإلكتروني مسجل مسبقًا، فضلًا أعد التسجيل
       </AbdoRegularText>

          <RNPickerSelect
          onValueChange={(value) => { console.log(value); setNeighborhood(value)}}
          placeholder={placeholder}
          Icon={() => {
              return <IonIcon size={24} name="ios-arrow-down" color={Colors.lightGray} />;
            }}
          value={neighborhood}
          style={{
               ...pickerSelectStyles,
               iconContainer: {
                 top: 40,
                 right: 30,
               },
               placeholder: {
                 fontSize: 14,
               },
             }}
          items={neighborhoods}
          />

<View style={[{marginTop:15,flexDirection:'row', width:'100%', justifyContent:'space-between',alignItems:'center', paddingHorizontal:20, paddingVertical:10,}]}>
<AbdoRegularText style={{justifyContent: 'flex-start',alignItems: 'center',paddingTop:5, color:Colors.vDarkGray}}>تفعيل التنبيهات</AbdoRegularText>
          <SwitchToggle
                containerStyle={{
                  padding:3,
                width: 51,
                height: 28,
                borderRadius: 30,
                transform: [{rotateY: '180deg'}]
              }}
              backgroundColorOn={Colors.darkYellow}
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

<AbdoRegularText size={12} textAlign={'left'} style={{height:22,color:Colors.lightGray,lineHeight:28,marginLeft:25,marginTop:-10}}>
مثل في حال وصلتك إجابة جديدة
</AbdoRegularText>
         <AbdoRegularText size={12} textAlign={'left'} style={{height:22,color:Colors.darkRed,lineHeight:28,marginLeft:25, marginTop:10}}>
        * حقول مطلوبة
        </AbdoRegularText>


          <GradientButton
            textStyle={{margin: 5,paddingTop:10}}
            gradientBegin="#7BC3B5"
            gradientEnd="#ABDBD1"
            gradientDirection="diagonal"
            height={45}
            width={300}
            radius={25}
            style={{ marginTop:30}}
            onPressAction={ ()=> {handleRegister()}}
          >
            <AbdoRegularText size={18}>
              تسجيل
            </AbdoRegularText>
          </GradientButton>



    </View>
    </View>
     </TouchableWithoutFeedback>
     </ScrollView>

  );

}

const styles = StyleSheet.create({

  form: {
    width:Dimensions.get("window").width*0.85,
    borderRadius:15,
    marginTop:15,
    paddingBottom:30,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowColor: "black",
    overflow: "visible",
    shadowOffset: {height: 0, width: 0},
    backgroundColor:'white'
  },

    adjacent:{
        marginTop: 30,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
    },

  inputBar: {
    height: 45,
    width: 270,
    alignSelf:'center',
    fontFamily: "Abdo-Master-Regular",
    textAlign: "right",
    paddingLeft:15,
    borderRadius: 25,
    backgroundColor: "white",
    flexDirection: "row",
    borderColor:Colors.brightGray,
    borderWidth:0.5,
    color: Colors.vDarkGray
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 45,
    marginTop:30,
    width: 290,
    alignSelf:'center',
    fontFamily: "Abdo-Master-Regular",
    textAlign: "right",
    paddingLeft:15,
    color: Colors.vDarkGray,
    fontSize:16,
    borderRadius: 25,
        backgroundColor:'white',
    flexDirection: "row",
    borderColor:Colors.brightGray,
    borderWidth:0.5,
  }
});


Register.navigationOptions = (props) => ({
  headerTintColor:Colors.darkMint,
  headerTitle: () => <AbdoMediumText size={18} color={Colors.darkMint}>التسجيل</AbdoMediumText>,
  headerLeft: <TouchableOpacity onPress={ ()=>{props.navigation.goBack()}}>
      <BackButton></BackButton></TouchableOpacity>,
  headerStyle: {
        height:55,
      },



});


const NavigationConnected = withNavigation(Register);
export {NavigationConnected as Register};
