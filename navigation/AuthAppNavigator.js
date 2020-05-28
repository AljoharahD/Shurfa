import React,{Component} from 'react';
import { useState, useEffect } from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import GeneralTabNavigator from './GeneralTabNavigator';
import AuthTabNavigator from './AuthTabNavigator';
import { AsyncStorage } from 'react-native';
import checkIfFirstLaunch from '../utils/checkIfFirstLaunch';
import checkIfLoggedIn from '../utils/checkIfLoggedIn';

const isLoggedIn =  checkIfLoggedIn();


  export default  createAppContainer(

  createSwitchNavigator({
      Main:AuthTabNavigator,
      GeneralTabNavigator:GeneralTabNavigator,
      AuthTabNavigator: AuthTabNavigator,
      //App: AppStack,
      //Auth: AuthStack,
    })

)
//const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
//const AuthStack = createStackNavigator({ SignIn: SignInScreen });
