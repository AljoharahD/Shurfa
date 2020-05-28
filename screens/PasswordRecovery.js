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
} from "react-native";
import IonIcon from '../components/IonIcon';
import { AbdoRegularText } from '../components/AbdoRegularText';
import Colors from '../constants/Colors';
import {AbdoMediumText} from "../components/AbdoMediumText";
import FeatherIconCustom from "../components/FeatherIconCustom";
import GradientButton from "react-native-gradient-buttons";
import { BackButton } from '../components/BackButton';
import RNPickerSelect from 'react-native-picker-select';
import riyadhDistricts from '../RiyadhDistricts.json'


export default function PasswordRecovery({navigation})  {

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(email)===false) {
      setEmailBorders(Colors.darkRed)
      setErrorMsgVisibility('flex')
      setErrorMsg('فضلًا أدخل بريد إلكتروني صحيح')
      return false;}
      else return true;
  }

  const handleRecovery =  () => {
    if (!validateEmail)
        return;
        console.log("not wrong");
        let url = 'https://shurfa-flask.herokuapp.com/sendemail/'+email;
        fetch(url).then(res => {
            return res.json();
        }).then((responseJson) => {
            console.log(responseJson);
            Alert.alert(
                'تم استعادة كلمة المرور بنجاح!',
                'فضلا تفقد بريدك الإلكتروني',
                [
                  {text: 'شكرًا!', onPress: () => {
                    navigation.navigate('Login');
                  }
                },
                ],
                {cancelable: false},
                );
        })
  }



  useEffect(() => {

  }, []);


  const [email, setEmail] = useState('');
  const [emailBorders, setEmailBorders] = useState(Colors.brightGray);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsgVisibility, setErrorMsgVisibility] = useState('none');

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{flex:1,  alignItems:'center', justifyContent:'center', backgroundColor:Colors.lightBlue}}>
    <View style={styles.form}>




        <View style={[styles.adjacent]}>
        <TextInput
        style={[styles.inputBar,{borderColor:emailBorders}]}
        placeholder="البريد الإلكتروني"
        keyboardType="email-address"
        onChangeText={(email) => {
            setEmail(email)
            setEmailBorders(Colors.brightGray)
            setErrorMsgVisibility('none')
        }}
        onEndEditing={(email) => validateEmail()}></TextInput>
        <AbdoRegularText size={18} style={{height:18,marginLeft:5,color:Colors.darkRed,lineHeight:28}}>
          *
        </AbdoRegularText>
        </View>

          <AbdoRegularText size={12} textAlign={'left'} style={{height:22,color:Colors.darkRed,lineHeight:28,marginLeft:25, marginTop:10,display:errorMsgVisibility}}>
          {errorMsg}
         </AbdoRegularText>

          <GradientButton
            textStyle={{margin: 5,paddingTop:10}}
            gradientBegin="#4E7DC4"
            gradientEnd="#91D5EB"
            gradientDirection="diagonal"
            height={45}
            width={300}
            radius={25}
            style={{ marginTop:30}}
            onPressAction={()=>{handleRecovery()}}
          >
            <AbdoRegularText size={18}>
              استعادة كلمة المرور
            </AbdoRegularText>
          </GradientButton>



    </View>
    </View>
     </TouchableWithoutFeedback>
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
    backgroundColor:'white',

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
    color:Colors.mediumGray,
    fontSize:16,
    borderRadius: 25,
        backgroundColor:'white',
    flexDirection: "row",
    borderColor:Colors.brightGray,
    borderWidth:0.5,
  }
});


PasswordRecovery.navigationOptions = (props) => ({
  headerTintColor:Colors.darkMint,
  headerTitle: () => <AbdoMediumText size={18} color={Colors.darkMint}>استعادة كلمة المرور</AbdoMediumText>,
  headerLeft: <TouchableOpacity onPress={()=> {props.navigation.goBack()}}><BackButton></BackButton></TouchableOpacity>,
  headerStyle: {
        height:55,
      },
});


const NavigationConnected = withNavigation(PasswordRecovery);
export {NavigationConnected as PasswordRecovery};
