//----------UNUSED VERSION----------//
import  React,{Props,PureComponent} from 'react';
import Gallery from 'react-native-image-gallery';
import Colors from '../constants/Colors';
import SimpleLineIcons from '../components/SimpleLineIcons'
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import {  Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableHighlight ,Image} from 'react-native';
import { AbdoRegularText} from '../components/AbdoRegularText';
//import {keys} from '../keys.js';

global.index = 0;
export default class GallaryScreen extends React.Component {
      //, dimensions: {width: 400, height: 200}}
  state = {
    Photos : [
       {source: { uri: 'https://lh3.googleusercontent.com/p/AF1QipMJki5Im_7IIwBhRVCzfYkwP7zNdCZm0y9qyK3l=s1600-w400'}}
  ]
  };
  // state +

  componentDidMount(){
   //this.fetchImages();
   // this.fetchNbhd();
  }

  fetchNbhd = () => {
    let url = 'https://apina.address.gov.sa/NationalAddress/v3.1/lookup/districts?language=A&format=JSON&cityid=3&api_key=a6ef8dbbdfec453aaa2edd2446b9758f';
    fetch(url).then(res => {
      return res.json();
    })
    .then(res => {
      console.log("response is: ");
      console.log(res);
    });
  }
  fetchImages = () => {
    let nbhdName = 'Alsahafah'
    // a string with a space (e.g. Al Sahafah) might cause a problem. works fine in URL but idk about here. need to be tested
    //to get the neighborhood place id:
    const nbhd = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+nbhdName+'&inputtype=textquery&fields=place_id&key='+keys.googleKey;
    //console.log("Starting first fetch with response: ");
    fetch(nbhd).then(res => {
      return res.json()
    })
    .then(res => {
      /* console.log(res);
      console.log("res.candidates: "+ res.candidates);
      console.log("res.candidates[0] = "+ res.candidates[0]);
      console.log("res.candidates[0].place_id= "+ res.candidates[0].place_id) */
      let pID= res.candidates[0].place_id;
      //to get photos of this place:
      const photos = 'https://maps.googleapis.com/maps/api/place/details/json?place_id='+pID+'&key='+keys.googleKey;
      console.log("Starting second fetch to find photos of a place, where place id: "+pID+" and response:");
      fetch(photos).then(res => {
        return res.json()
      })
      .then(res => {
        //console.log(res);
        let photosArr = res.result.photos;
        let photosRefArr = [];
        for (let i=0; i<photosArr.length; i++){
          global.i = i;
          console.log("global i is: "+ global.i);
          console.log("inside loop no "+ i);
          let photoRef = photosArr[i].photo_reference;
          photosRefArr[i] = photoRef;
          console.log("photo ref: "+photoRef);
          console.log("before fetching to find the image of the photo reference: ");
          console.log(i+'lammmmmma');
        }//end big for
        //call function and send photosRefArr
        console.log("Before calling function:");
        this.loadImages(photosRefArr);
          }).catch(error => {
            console.log("Error when trying to retrieve an image:");
            console.log(error)
          });
      }).catch(error => {
        console.log("Error when trying to retrieve detailed request of the place:");
        console.log(error)
      });
  }//end fetch images



  loadImages = (photosRefArr) =>{
    console.log("first at load images");
    console.log("Lets print PhotosRefArr: "+ photosRefArr);
    console.log("index here : " + index);
      let photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1920&maxheight=1080&photoreference='+photosRefArr[index]+'&key=+'+keys.googleKey;
        if (index == photosRefArr.length){
          console.log("gonna return cuz index = "+ index + " and photosrefarr.length= "+photosRefArr.length);
          console.log("and photos.state = " + this.state.Photos);
          return;
        }
        else{
        fetch(photo).then(res => {
          console.log("after");
          let temp = this.state.Photos;
          /*
          source={{uri: this.state.Photos[0].source.uri}}
     style={{width: 400, height: 400}}
     */
          temp[index] = "{source: { uri: '"+res.url+"' }, style: { width: 1920, height: 1080 } }";
          this.setState({Photos: temp});
          console.log("index = " + index);
          console.log("url is : " + res.url);
          global.index = index + 1;
          this.loadImages(photosRefArr);
        })
      }//end else
  }
  getImage(){
    let photoRef = 'CmRaAAAAZkBbkP8UB1UTwYZqqY_SAm1ExEuUTXhCaQPR_lnk_PTY29hnOE89LB6a6_lOjQyGTLgN6zFtGbXPTAF6_IF4gHMHn4CGzScbo3fbnosTwBBqUEmkH5HuwtGrRe9QEVc8EhAseaMrZ0O4grOW5yJ0ZZXNGhRHdmWTpFgLROQ-eEdNijYeCqDxCw';
    let photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+photoRef+'&key=+'+keys.googleKey;
    let myFirstImage = <Image />;
    fetch(photo).then(res => {
      myFirstImage = <Image
      source={{res}}
      style={{width: 400, height: 250}}
      />
    })
    return myFirstImage;
  }
	render() {
    if (this.state.Photos==''){
      return (<Text>Nothing for you here </Text>);
    }
    else{
    return (
   /*<SimpleLineIcons name={ 'arrow-left' } color={'#959595'} size={25}
   onPress={() =>this.props.navigation.goBack()}/> ,*/
   /*
   <Gallery
      style={{ flex: 1,marginTop:50}}
     images= {this.state.Photos}
      /*
      images={[
        { style: {width: 50, height: 50}, source: { url: 'http://i.imgur.com/5nltiUd.jpg' } },
        { style: {width: 50, height: 50}, source: { url: 'http://i.imgur.com/6vOahbP.jpg' } },
        { style: {width: 50, height: 50}, source: { url: 'http://i.imgur.com/kj5VXtG.jpg' } }
      ]}

      />
 */

    <Image source={{uri: this.state.Photos[0].source.uri}}
    style={{width: 250, height: 250}}
     />
   //<Image source={{uri: this.state.Photos[0].source.uri}}

    ); //end return
  } //end else

}}
