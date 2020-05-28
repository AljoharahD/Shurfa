import React from 'react';
import {I18nManager, AppRegistry} from 'react-native';
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
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import EntypoIcons from '../components/EntypoIcons';
import FeatherIcon from '../components/FeatherIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import RegionNeighborhoods from '../screens/RegionNeighborhoods';
import NeighborhoodProfile from '../screens/NeighborhoodProfile';
import Compare from '../screens/Compare';
import GalleryScreen from '../screens/GalleryScreen';
import LinksScreen from '../screens/LinksScreen';
import FullMap from '../screens/FullMap';
import IonIcon from "../components/IonIcon";
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';
import inquiriesbackend from '../components/model/inquiriesbackend';
import Instructions from '../components/Instructions';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Logout from '../screens/Logout';
import PasswordRecovery from '../screens/PasswordRecovery';
import { AbdoRegularText} from '../components/AbdoRegularText';
import { BackButton } from '../components/BackButton';
import Inquiries from '../components/neighborhoodProfile/Inquiries';
import inquiry from '../components/neighborhoodProfile/inquiry';
import viewAnswers from '../components/neighborhoodProfile/viewAnswers';

//import inquiryForm from '../components/neighborhoodProfile/inquiriesForms/inquiryForm';
console.disableYellowBox = true;

I18nManager.forceRTL(true)
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},

});

const HomeStack = createStackNavigator(
  {
    Home:{
      screen: HomeScreen,
      navigationOptions: {
      headerBackTitle: 'الرئيسية',
      headerStyle: {
            fontFamily:'Abdo-Master-Regular',
          },
      }
  },
    Search: SearchScreen,
    Instructions: Instructions,
    FullMap:{
      screen: FullMap,
      navigationOptions: {
      header: null
      }
  },
  RegionNeighborhoods:{
    screen: RegionNeighborhoods,
    navigationOptions:({navigation}) => ({
      headerLeft: <TouchableOpacity onPress={()=> {navigation.goBack()}}><BackButton></BackButton></TouchableOpacity>,

    headerStyle: {
          fontFamily:'Abdo-Master-Regular',
        },
    })
},
    NeighborhoodProfile:{
      screen: NeighborhoodProfile,
      navigationOptions: {

      headerStyle: {
            fontFamily:'Abdo-Master-Regular',
          },
      }
  },
  Inquiries:Inquiries,
  Compare:{
    screen: Compare,
    navigationOptions:({navigation}) => ({
      headerLeft: <TouchableOpacity onPress={()=> {navigation.goBack()}}><BackButton></BackButton></TouchableOpacity>,
    headerStyle: {
          fontFamily:'Abdo-Master-Regular',
        },
    })
},
  inquiry:{
    screen: inquiry,
    navigationOptions:({navigation}) => ({
      headerLeft: <TouchableOpacity onPress={()=> {navigation.goBack()}}><BackButton></BackButton></TouchableOpacity>,
    headerStyle: {
          fontFamily:'Abdo-Master-Regular',
        },
    })
},
viewAnswers:{
  screen: viewAnswers,
  navigationOptions:({navigation}) => ({
    headerLeft: <TouchableOpacity onPress={()=> {navigation.goBack()}}><BackButton></BackButton></TouchableOpacity>,
  headerStyle: {
        fontFamily:'Abdo-Master-Regular',
      },
  })
},
  GalleryScreen:{
    screen: GalleryScreen,
    navigationOptions:({navigation}) => ({
      headerLeft: <TouchableOpacity onPress={()=> {navigation.goBack()}}><BackButton></BackButton></TouchableOpacity>,

    headerStyle: {
          fontFamily:'Abdo-Master-Regular',
        },
    })
},

  },
  config
);

HomeStack.navigationOptions = {

  tabBarLabel: 'الرئيسية',
  tabBarOptions: {
    activeTintColor: Colors.darkMint,  // Color of tab when pressed
    labelStyle: {
      fontSize: 10,
      fontFamily: 'Abdo-Master-Regular'
    },
      style:{height:50,
        paddingTop:3}
  },
  tabBarIcon: ({ focused }) => (
    <FeatherIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `home`
          : 'home'
      }
    />
  ),
  transitionConfig: ()=> {
    const routeName = toTransitionProps.scene.route.routeName;
    console.log(this.props.navigation.state.routeName);
    if (routeName === 'Search') {


        return {
          transitionSpec: {
  		duration: 0,
  		timing: Animated.timing,
  		easing: Easing.step0,
  	},
          screenInterpolator: {},
        }
  }
}
};


HomeStack.path = '';



const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerBackTitle: 'عودة',
        headerStyle: {
          fontFamily: 'Abdo-Master-Regular',
        }
      }
    },
    Register: Register,
    PasswordRecovery: PasswordRecovery,
    Home:{
      screen: HomeScreen,
      navigationOptions: {
      headerBackTitle: 'الرئيسية',
      headerStyle: {
            fontFamily:'Abdo-Master-Regular',
          },
      },

  },

  },
  config
);

AuthStack.navigationOptions = {
  tabBarLabel: 'التسجيل',
  tabBarOptions: {
    activeTintColor: Colors.darkMint,  // Color of tab when pressed
		labelStyle: {
			fontSize: 10,
			fontFamily: 'Abdo-Master-Regular',

		},
    style:{height:50,
      paddingTop:3}
	},
  tabBarIcon: ({ focused }) => (
    <FeatherIcon focused={focused} name={
        Platform.OS === 'ios'
          ? `user`
          : 'user'
      } />
  ),
};

AuthStack.path = '';



const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AuthStack,
},
{tabBarOptions: {
    style:{
      height:500}
}} );
tabNavigator.path = '';

export default tabNavigator;
