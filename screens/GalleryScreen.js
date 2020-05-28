import  {Props,PureComponent} from 'react';
import React, { useState, useEffect } from 'react';

import CameraRollGallery from "react-native-camera-roll-gallery";
import {I18nManager, AppRegistry} from 'react-native';
import Gallery from 'react-native-image-gallery';
import Colors from '../constants/Colors';
import SimpleLineIcons from '../components/SimpleLineIcons'
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import {  Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableHighlight ,TouchableOpacity,Image} from 'react-native';
import { AbdoRegularText} from '../components/AbdoRegularText';
import { AbdoMediumText} from '../components/AbdoMediumText';
import {keys} from '../keys.js';
import { withNavigation } from 'react-navigation';
import { SmallLogo } from '../components/SmallLogo';
import EntypoIcons from '../components/EntypoIcons';
import IonIcon from '../components/IonIcon';
import FeatherIcon from '../components/FeatherIcon';
import FeatherIconCustom from '../components/FeatherIconCustom';
import MaterialIcons from '../components/MaterialCommunityIcons';
import DefMaterialIcons from '../components/MaterialIcons';


export default function GalleryScreen({navigation })  {
  const  formatImagesURL = () => {

    let nbhdGallery = navigation.state.params.nbhdGallery;
    console.log(nbhdGallery)
    let photosRefArr = [];
  let uri=''
  for (const index in nbhdGallery) {

    uri = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1920&maxheight=1080&photoreference='
    +nbhdGallery[index]
    +'&key=+'
    +keys.googleKey
    +''
console.log(uri)
  photosRefArr.push(uri)

  }
setNbhdGalleryPhotos(photosRefArr);

  }

const displayGallery = () => {
  if(nbhdGalleryPhotos.length!=0){
    console.log('inside if and length');
      console.log(nbhdGalleryPhotos.length)
    return (
      <CameraRollGallery
                  enableCameraRoll={false} // default true
                  imagesPerRow={2}
                  pagesFlatListProps={{inverted:true}}
                  resizeMode={'cover'}
                  loaderColor={Colors.mediumGray}
                  cameraRollListHeader={() => (<Text> </Text>)}
                  imageContainerStyle	={{backgroundColor:'white'}}
                  // Get data logic goes here.
                  // This will get trigger initially
                  // and when it reached the end
                  // if there is more.
                  onGetData={(fetchParams, resolve) => {

                      resolve({
                        assets: [{
                          uri:nbhdGalleryPhotos[0]
                          },
                          {
                            uri:nbhdGalleryPhotos[1]
                          },
                          {
                            uri:nbhdGalleryPhotos[2]
                          },
                          {
                            uri:nbhdGalleryPhotos[3]
                          },
                          {
                            uri:nbhdGalleryPhotos[4]
                          },
                          {
                            uri:nbhdGalleryPhotos[5]
                          },
                          {
                            uri:nbhdGalleryPhotos[6]
                          },
                          {
                            uri:nbhdGalleryPhotos[7]
                          },
                          {
                            uri:nbhdGalleryPhotos[8]
                          },
                          {
                            uri:nbhdGalleryPhotos[9]
                          },
                        ],
                          pageInfo: {
                              hasNextPage: false
                          }
                      });
                  }}
              />
    ); //end return

  }


}



  const [nbhdGalleryPhotos, setNbhdGalleryPhotos] = useState([])
  const [refOne, setRefOne] = useState('https://maps.googleapis.com/maps/api/place/photo?maxwidth=1920&maxheight=1080&photoreference=CmRaAAAAncTlPfSj0TMdOE9irVfc97vQezhNWcTNS9_G6iT2cpxs2jdg3FTXGEY7XWfqPfrZ7m9IITc8joeC4pprD-nBNQEHSp1MvVIyAEYbkY69PR2HQcajOtvwbXR1jyEMR-UoEhDdhw3MDuwbaekzcXzYhBv4GhSn8oYgewSYSZ1N91Y2fe2LUqQzjw&key=+AIzaSyBXMmQf6jOkI8tpWuJyVFKeKzTSZ2jAWCw')
  const [refTwo, setRefTwo] = useState('https://maps.googleapis.com/maps/api/place/photo?maxwidth=1920&maxheight=1080&photoreference=CmRaAAAA_fhQy25KgbvoXkCPd1nOZXxZLy_Oh4tlUcfGQ6jRav03ldEmuHKidIGfARnP_clKiGXEqLfciTWrua6E3t724CaE2AOoMxIJB6u0ordWVozd7-kJfg6hAq9n1ii9zR6XEhCXHqTeHj1RtlCUiXTbtoziGhR6-FLfI3FR0MvkOkECarbiEeh8JQ&key=+AIzaSyBXMmQf6jOkI8tpWuJyVFKeKzTSZ2jAWCw')

 useEffect(() => {
  formatImagesURL();
    },[])

return(

  <View style={{height:'100%',width:375,overflow:'scroll'}}>


{  displayGallery()}
    </View>
)



}

GalleryScreen.navigationOptions = ({navigation}) => ({
  headerTintColor:Colors.darkMint,
  headerTitle: () => <AbdoMediumText size={18} color={Colors.darkMint}>المعرض</AbdoMediumText>,
  headerStyle: {
        height:55,
      },



});

const NavigationConnected = withNavigation( GalleryScreen );
export { NavigationConnected as GalleryScreen };
