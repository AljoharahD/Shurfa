import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
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
  Button
} from 'react-native';

import { SmallLogo } from '../components/SmallLogo';

import { AbdoRegularText } from '../components/AbdoRegularText';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import EntypoIcons from '../components/EntypoIcons';
import IonIcon from '../components/IonIcon';
import FeatherIcon from '../components/FeatherIcon';
import FeatherIconCustom from '../components/FeatherIconCustom';
import MaterialIcons from '../components/MaterialCommunityIcons';
import DefMaterialIcons from '../components/MaterialIcons';
import RiyadhDistricts from '../RiyadhDistricts.json'





export default function RegionNeighborhoods({navigation })   {
  const [neighborhoods, setNeighborhoods] = useState([])
  const [region, setRegion] = useState('')
  const [headerColor, setHeaderColor] = useState(Colors.vLightMint)
  const [color, setColor] = useState(Colors.vLightMint)
  const [textColor, setTextColor] = useState(Colors.darkMint)


 const fetchNeighborhoods = () => {



 }


useEffect(() => {
  console.log("inside region neighborhoods:")
  switch(navigation.state.params.region) {
    case 'north':
    setRegion('الشمال');
    setHeaderColor(Colors.vLightMint);
    setColor(Colors.lightMint);
    setTextColor(Colors.darkMint);
    break;

    case 'east':
    setRegion('الشرق');
    setHeaderColor(Colors.lightBlue);
    setColor(Colors.lightBlue);
    setTextColor(Colors.darkBlue);
    break;

    case 'south':
    setRegion('الجنوب');
    setHeaderColor(Colors.vLightYellow);
    setColor(Colors.vLightYellow);
    setTextColor(Colors.darkYellow);
    break;

    case 'west':
    setRegion('الغرب');
    setHeaderColor(Colors.vLightGreen);
    setColor(Colors.mediumGreen);
    setTextColor(Colors.darkGreen);
    break;

    case 'downtown':
    setRegion('وسط الرياض');
    setHeaderColor(Colors.vLightRed);
    setColor(Colors.vLightRed);
    setTextColor(Colors.darkRed);
    break;
  }

},[])

useEffect(() => {




},[])

return (
  <View style={styles.container}>

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>

      <View style={[styles.header,{backgroundColor:headerColor}]}>
      <AbdoRegularText textAlign={'center'} size={24} style={{color:textColor}}>أحياء {''+region} </AbdoRegularText>
      </View>


      <View
      style={{
      flex:1,
      paddingTop:20,
      alignItems: 'center',
      width:Dimensions.get('window').width,
      backgroundColor:'white',
      shadowOpacity: 0.04,
      shadowRadius: 10,
      overflow:'visible',
      shadowColor: 'black',
      shadowOffset: { height: -5, width: 0 },}} >
      <ScrollView
      style={{
      overflow:'scroll'}} >

      {  navigation.state.params.districts.map((district) => {
         return (
           <TouchableOpacity  onPress = {()=>{
             navigation.navigate('NeighborhoodProfile',{
               neighborhoodName:district[0],
               neighborhoodNameEn:district[1],
               neighborhoodID:district[2],
               })
               }} 
               style={[styles.neighborhoodTouchable,{backgroundColor:color}]}
             >
           <View style={[styles.neighborhoodCard]}>
           <View style={[styles.verticalAlignment]} >
           <AbdoRegularText size={18} style={{color:textColor,lineHeight:28,left:20}}> {district[0]}</AbdoRegularText>
           <IonIcon size={24} name={ 'ios-arrow-back' } color={textColor} style={{position:'absolute',right:20}}/>
           </View>

       </View>
     </TouchableOpacity>
  );
   })
      }
</ScrollView>
      </View>








    </ScrollView>


  </View>
);

}

RegionNeighborhoods.navigationOptions = ({navigation}) => ({
  headerTintColor:Colors.darkMint,
  headerTitle: () => <SmallLogo />,
  headerStyle: {
        height:55,
      },




});


const styles = StyleSheet.create({


  header:{
    height:'20%',
    width: '100%',
    alignItems: 'center',
    justifyContent:'center'
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  neighborhoodTouchable:{

    width: 350,
    height:70,
    marginBottom:15,
    borderRadius: 10,

    justifyContent:'center',

    alignItems: 'center',

  },
  neighborhoodCard:{

paddingTop:10,

    flexDirection: 'row',

  },
  verticalAlignment:{
    flex:1,
    flexDirection: 'row',

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

const NavigationConnected = withNavigation( RegionNeighborhoods );
export { NavigationConnected as RegionNeighborhoods };
