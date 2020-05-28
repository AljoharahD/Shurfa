import {withNavigation} from "react-navigation";
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar
} from 'react-native';
import IonIcon from '../components/IonIcon';
import { AbdoRegularText } from '../components/AbdoRegularText';
import Colors from '../constants/Colors';
import DropdownAlert from 'react-native-dropdownalert';
import {AbdoMediumText} from "../components/AbdoMediumText";
import { AsyncStorage } from 'react-native';
import DeleteWatchlist from '../components/alertMessages/DeleteWatchlist';
import SuccessWatchlist from '../components/alertMessages/SuccessWatchlist';
import DeleteWatchlistSuccess from '../components/alertMessages/DeleteWatchlistSuccess';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height/6;
const CARD_WIDTH = (CARD_HEIGHT-50)*4;

//will pass user id here

export default function Watchlist({navigation}) {

  //const [userNbhd, setUserNbhd] = useState(''); //props.user.nbhd
  const [userNbhdNot, setUserNbhdNot] = useState(0);
  const [userWatchlist, setUserWatchlist] = useState([]);
  const[userNbhdID,setUserNbhdID] = useState(0);
    const[userNbhdEn,setUserNbhdEn] = useState(0);
  const [userData, setUserData] = useState({id:'',nbhd:''});
  const[dropdownAlertRef,setDropdownAlertRef] = useState(0);
    const[messagesVisibility,setMessagesVisibility] = useState(false);



  async function retrieveUserData() {

    let userId= await AsyncStorage.getItem("id");
    let nbhd=await AsyncStorage.getItem("nbhd");
    setUserData({id:userId.replace(/['"]+/g, ''),nbhd:nbhd.replace(/['"]+/g, "")})
    console.log(userData)
  }

  const userNeighborhood = userData.nbhd; // change to props.user.neighborhood
  const userID = userData.id;
  //we can pass the nbhd from the login page. don't need to make another request.
  useEffect(() => {


    navigation.setParams({confirmDeleteWatchlist: false});
    navigation.setParams({successWatchlist: false});
    navigation.setParams({DeleteWatchlistSuccess: false});
    setMessagesVisibility(true);
  },[]);

  async function retrieveWatchlist (){
    console.log("called");
    let userID = await AsyncStorage.getItem("id")
    let nbhd=await AsyncStorage.getItem("nbhd");
    nbhd = nbhd.replace(/"/g,"");
    let url = 'https://shurfa-flask.herokuapp.com/watchlist/'+userID;
    console.log("URL :" + url);
    fetch(url).then(res => {
        return res.json();
    }).then(res => {
        let watchlist = [];
        for (var i = 0; i < res.length; i++) {
          console.log("iteration: "+i);
          console.log(res[i].nbhd)
          console.log(nbhd)
          if (res[i].nbhd == nbhd){
            console.log("inside user nbhd condition")
            setUserNbhdNot(res[i].notStat);
            setUserNbhdID(res[i].nbhdID);
            setUserNbhdEn(res[i].nbhdEn);
            continue;
         }//end if
          watchlist.push(res[i]);
        } //end for
        console.log("watchlist:")
        console.log(watchlist)
        setUserWatchlist(watchlist);
    });
  }


  async function toggleNotification (id) {
    let userID = await AsyncStorage.getItem("id")
    let url = 'https://shurfa-flask.herokuapp.com/togglenbhdnot/'+id+'/'+userID;
    console.log(url);
    fetch(url)
    .then(res => {
      return res.json();
  }).then(res => {
    console.log(res);
    retrieveWatchlist();
    console.log("notification is toggled. before alert")
    dropdownAlertRef.alertWithType('custom', 'تم تحديث حالة الإشعارات');
  })
  }

  const showAlertDialog = (nbhd) =>{
    navigation.setParams({confirmDeleteWatchlist: true});
    navigation.setParams({neighborhoodName: nbhd});

  }

  async function removeNeighborhood (nbhd) {
    console.log('success! entered method')
    let userId= await AsyncStorage.getItem("id");
    console.log('userId'+userId)
    console.log('nbhd'+nbhd)
    let url = 'https://shurfa-flask.herokuapp.com/deletenbhd';
      console.log(url);
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nbhd: nbhd,
          userID: userId,
        }),
      }).then(res => {
        return res.status;
      })
      .then(res => {
        if(res!==200){
        Alert.alert("حدث خطأ ما! أعد المحاولة")
        return;}
        navigation.setParams({DeleteWatchlistSuccess: true});
        console.log("response is: ");
        retrieveWatchlist ();
      })
      navigation.setParams({isAddedToWatchlist: false});
  }

  function cancelAlerts() {
    navigation.setParams({confirmDeleteWatchlist: false});
    navigation.setParams({successWatchlist: false});
    navigation.setParams({DeleteWatchlistSuccess: false});
  }

  const justTesting = () => {
    dropdownAlertRef.alertWithType('custom', 'تم تحديث حالة الإشعارات');
  }




  useEffect(() => {
    retrieveUserData();
    retrieveWatchlist()
    navigation.addListener(
      'didFocus',
      payload => {
        retrieveWatchlist()
        retrieveUserData();
      }
  );

  },[]);



  return (
    <View style={styles.container}>
    {messagesVisibility&&navigation.state.params.confirmDeleteWatchlist?<DeleteWatchlist cancelDeletion={()=>cancelAlerts()} removeNeighborhood={()=> removeNeighborhood(navigation.state.params.neighborhoodName)}/>:null}
    {messagesVisibility&&navigation.state.params.successWatchlist?<SuccessWatchlist cancelDeletion={()=>cancelAlerts()}/>:null}
    {messagesVisibility&&navigation.state.params.DeleteWatchlistSuccess?<DeleteWatchlistSuccess cancelDeletion={()=>cancelAlerts()}/>:null}
      {userData.nbhd!='-1'?<View style={styles.fixedContainer} >
      <View style={[styles.usersNeighborhood]}>
        <View style={[styles.verticalAlignment]}>
        <TouchableOpacity
          onPress = {()=>{navigation.navigate('NeighborhoodProfile',{neighborhoodName:userData.nbhd,neighborhoodNameEn:userNbhdEn,neighborhoodID:userNbhdID})}}
        >


          <AbdoRegularText size={18} style={{color:Colors.darkMint, lineHeight:28, left:20}}>
          {userData.nbhd}
          </AbdoRegularText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{position:'absolute',right:20}}
            onPress={() => toggleNotification(userNbhdID)}
            >
             <IonIcon name={userNbhdNot==1?'ios-notifications':'ios-notifications-off'} size={30} color={Colors.darkMint}/>
            </TouchableOpacity>

        </View>
      </View>
    </View>
  :null}
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', width:Dimensions.get('window').width}} >
      {
        userWatchlist.length > 0?
        (
    userWatchlist.map((u, i ) => {
        return (
        <View style={[styles.addedNeighborhood]}>
        <View style={[styles.verticalAlignment]} >

        <TouchableOpacity
          onPress = {()=>{navigation.navigate('NeighborhoodProfile',{neighborhoodName:u.nbhd,neighborhoodNameEn:u.nbhdEn,neighborhoodID:u.nbhdID})}}
        >

          <AbdoRegularText size={18} style={{color:Colors.darkBlue, lineHeight:28, left:20}}>
           {u.nbhd}
           </AbdoRegularText>
           </TouchableOpacity>

           <TouchableOpacity
           onPress={() => showAlertDialog(u.nbhd)}
           style={{position:'absolute', right:20}}
            >
          <IonIcon name={ 'ios-close' } size={32} color={Colors.darkBlue}/>
           </TouchableOpacity>
           <TouchableOpacity
           onPress={() => toggleNotification(u.nbhdID)}
           style={{position:'absolute', right:55}}
            >
          <IonIcon name={u.notStat == 0?'ios-notifications-off':'ios-notifications'} size={24} color={Colors.darkBlue}/>
           </TouchableOpacity>
        </View>
      </View>
        );
    }) ): (
      userData.nbhd=="-1"?<View
style={{justifyContent:'center',height:320}}><AbdoRegularText
size={16}
style={{alignSelf:'center',color:Colors.lightGray,width:'60%'}}
>
قم بإضافة حي إلى قائمتك أولاً ;D
</AbdoRegularText></View>

:null)
    }
      </View>
      </ScrollView>
      <DropdownAlert
         defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
         //updateStatusBar={false}
      imageStyle={{ padding: 8, width: 24, height: 24, alignSelf: 'center'}}
      infoColor={Colors.green}
      closeInterval={2000}
      ref={ref => setDropdownAlertRef(ref)}
      containerStyle={{padding: 16, flexDirection: 'row', backgroundColor: '#B2C924' }}
      //imageSrc={'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/checkmark-24-512.png'}
      imageSrc={require('../assets/icons/checkmark-24-512.png')}
      />
    </View>
  );

}

const styles = StyleSheet.create({

  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },

  fixedContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:Dimensions.get('window').width,
    backgroundColor:'white',
    paddingBottom:10,
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowColor: 'black',
    overflow: 'visible',
    shadowOffset: { height: 5, width: 0 }
  },

  usersNeighborhood:{
    //flex:1,
    width: Dimensions.get('window').width*0.93,
    height: 80,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor:Colors.lightMint,
    marginTop:25,
  },

   addedNeighborhood:{
    flex:1,
    width: Dimensions.get('window').width*0.93,
    height: 80,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor:Colors.lightBlue,
    marginBottom:10,
  },

  verticalAlignment:{
    flex:1,
    flexDirection: 'row',
  },

  container: {
    //flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 15,
    //flex:1,
  },
  adjacent: {
    marginTop:20,
    flexDirection: 'row',
    marginBottom:10,

  },
});


Watchlist.navigationOptions = ({navigation}) => ({
  headerTintColor:Colors.darkMint,
  headerTitle: () => <AbdoMediumText size={18} color={Colors.darkMint}>قائمتي</AbdoMediumText>,
  headerStyle: {
        height:55,
      },



});

const NavigationConnected = withNavigation(Watchlist);
export {NavigationConnected as Watchlist};
