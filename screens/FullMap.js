import React, { useState, useEffect } from 'react';
import {withNavigation} from "react-navigation";
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
  Easing,
  TouchableOpacity
} from 'react-native';
import MapView, {
  MAP_TYPES,
  Polygon,
  Marker,
  ProviderPropType,
  PROVIDER_GOOGLE
} from 'react-native-maps';
import {keys} from '../keys.js';
import {AbdoRegularText} from "../components/AbdoRegularText";
import {AbdoMediumText} from "../components/AbdoMediumText";
import EntypoIcons from "../components/EntypoIcons";
import IonIcon from "../components/IonIcon";
import FeatherIcon from "../components/FeatherIcon";
import FeatherIconCustom from "../components/FeatherIconCustom";
import MaterialIcons from "../components/MaterialCommunityIcons";
import DefMaterialIcons from "../components/MaterialIcons";
import Colors from "../constants/Colors";
import pharmacies from '../datasets/POI/PharmacyPOIs.json'
import mosques from '../datasets/POI/MosquePOIs.json'
import health from '../datasets/POI/HealthPOIs.json'
import entertainment from '../datasets/POI/EntertainmentPOIs.json'
import parks from '../datasets/POI/ParkPOIs.json'
import restaurants from '../datasets/POI/RestaurantPOIs.json'
import schools from '../datasets/POI/SchoolPOIs.json'
import schoolClubs from '../datasets/POI/SchoolClubsPOIs.json'
import RiyadhDistricts from '../RiyadhDistricts.json'


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height/6;
const CARD_WIDTH = (CARD_HEIGHT-50)*4;


export default function FullMap(props) {


  useEffect(() => {
    setNeighborhood(props.navigation.state.params.boundaries);
    setRegion(mapCenter)
    setEducationPOI(fetchSchools());
    setAfterschoolPOI(fetchAfterSchool());
    setFacilitiesPOI(fetchFacilities());
    setLifestylePOI(fetchLifestyle());
    setPolygonColor("" + Colors.redPolygon);
    setPolygonBorder("" + Colors.darkRed);
    

  }, []);


const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];


const [map, setMap] = useState('');
const [neighborhood, setNeighborhood] = useState([]);
const [region, setRegion] = useState({})


const animatedValue = new Animated.Value(20);


const [educationPOI, setEducationPOI] = useState([]);
const [afterschoolPOI, setAfterschoolPOI] = useState([]);
const [facilitiesPOI, setFacilitiesPOI] = useState([]);
const [lifestylePOI, setLifestylePOI] = useState([]);



const [cardIndex, setCardIndex] = useState(0);
const [currentMarker, setCurrentMarker] = useState({});
const [currentMarkerColor, setCurrentMarkerColor] = useState({});

const [displayCategory, setDisplayCategory] = useState('');


const [displayBoth, setDisplayBoth] = useState(true);
const [displayGirls, setDisplayGirls] = useState(false);
const [displayBoys, setDisplayBoys] = useState(false);
const [displayAfterschool, setDisplayAfterschool] = useState(false);
const [filterCleared, setFilterCleared] = useState(true);
const [displayType, setDisplayType] = useState('All');


const [lifestyleDisplayType, setLifestyleDisplayType] = useState('All');

const [facDisplayType, setFacDisplayType] = useState('All');

const [polygonColor, setPolygonColor] = useState("");
const [polygonBorder, setPolygonBorder] = useState("");



const findBoundaries = async () => {
  try {

  let nbhd = props.navigation.state.params.neighborhoodName;
  let coord = [];

   RiyadhDistricts.map((district, index) => {

    if (district.name_ar===nbhd){
      district.boundaries.map((polygon, index) => {
         coord.push({
           latitude: polygon[0],
           longitude: polygon[1]
         });
       });

 }
  });

     await setNeighborhood(coord)

}
catch(e){
 console.log('ERRORR2016'+e.message)
}
}

const mapCenter = () => {

  let coordinates = neighborhood;
  let minX = 1000,
    maxX = -1,
    minY = 1000,
    maxY = -1;
  for (var i = 0; i < coordinates.length; i++) {
    minX =
      coordinates[i].latitude < minX || minX == null
        ? coordinates[i].latitude
        : minX;
    maxX =
      coordinates[i].latitude > maxX || maxX == null
        ? coordinates[i].latitude
        : maxX;
    minY =
      coordinates[i].longitude < minY || minY == null
        ? coordinates[i].longitude
        : minY;
    maxY =
      coordinates[i].longitude > maxY || maxY == null
        ? coordinates[i].longitude
        : maxY;
  }

  return {
    latitude: (minX + maxX) / 2,
    longitude: (minY + maxY) / 2,
    latitudeDelta: 0.02195044303443,
    longitudeDelta: 0.00142817690068
  };
};

const toCoordinates = () => {
  let coordinate = [];
  neighborhood.map((point, index) => {

    coordinate.push({
      latitude: point[0],
      longitude: point[1],
    });
  });

  return coordinate;

};

const fetchSchools = () => {

  let schoolsPlaces = []

  let inside = 1;
  try{
    schools.map((poi, index) => {
      inside=require("robust-point-in-polygon")(props.navigation.state.params.arrayBoundaries, [poi.latitude,poi.longitude])
      if (inside==0 || inside==-1){
      schoolsPlaces.push(poi)}
    })

    return (schoolsPlaces)
    } catch (e) {console.log('EROOOORR'+e.message)}
}

const fetchAfterSchool = () => {
  let afterschoolPlaces = [];
  let inside = 1;

    schoolClubs.map((poi, index) => {
      inside=require("robust-point-in-polygon")(props.navigation.state.params.arrayBoundaries, [poi.latitude,poi.longitude])
      if (inside==0 || inside==-1){
      afterschoolPlaces.push(poi)}
    })

    return (afterschoolPlaces)
}


const fetchFacilities = () => {
  let facPlaces = [];
  let inside = 1;

    pharmacies.map((poi, index) => {
      inside=require("robust-point-in-polygon")(props.navigation.state.params.arrayBoundaries, [poi.latitude,poi.longitude])
      if (inside==0 || inside==-1){
      facPlaces.push(poi)}
    })

    mosques.map((poi, index) => {
      inside=require("robust-point-in-polygon")(props.navigation.state.params.arrayBoundaries, [poi.latitude,poi.longitude])
      if (inside==0 || inside==-1){
      facPlaces.push(poi)}
    })

    health.map((poi, index) => {
      inside=require("robust-point-in-polygon")(props.navigation.state.params.arrayBoundaries, [poi.latitude,poi.longitude])
      if (inside==0 || inside==-1){
      facPlaces.push(poi)}
    })

    return (facPlaces)
}

const fetchLifestyle = () => {
  let lifestylePlaces = [];
  let inside = 1;

    entertainment.map((poi, index) => {
      inside=require("robust-point-in-polygon")(props.navigation.state.params.arrayBoundaries, [poi.latitude,poi.longitude])
      if (inside==0 || inside==-1){
      lifestylePlaces.push(poi)}
    })

    parks.map((poi, index) => {
      inside=require("robust-point-in-polygon")(props.navigation.state.params.arrayBoundaries, [poi.latitude,poi.longitude])
      if (inside==0 || inside==-1){
      lifestylePlaces.push(poi)}
    })

    restaurants.map((poi, index) => {
      inside=require("robust-point-in-polygon")(props.navigation.state.params.arrayBoundaries, [poi.latitude,poi.longitude])
      if (inside==0 || inside==-1){
      lifestylePlaces.push(poi)}
    })

    return (lifestylePlaces)
}

const displaySubcategories = () => {
  if(displayCategory==='education')
  return([
    <Animated.View style={[{alignItems:'center',marginTop:animatedValue}]}>

    <Animated.View style={styles.subCategoryTitle}>
    <FeatherIconCustom
      style={styles.navIcon}
      name={"book-open"}
      color={Colors.darkMint}
      size={24}
    />
    <AbdoMediumText size={16} textAlign={'center'} color={Colors.darkMint} style={[styles.header,{marginLeft:5}]}>
    التعليم
    </AbdoMediumText>
    </Animated.View>

    <Animated.View style={styles.subCategory}>


    <TouchableOpacity onPress={() => {
      setFilterCleared(false); setDisplayAfterschool(false); setDisplayBoth(false);setDisplayBoys(false);setDisplayGirls(true);
      }} 
      style={[styles.subCategoryItem,{backgroundColor:(displayGirls&&!displayBoth&&!displayAfterschool)?Colors.darkMint:Colors.lightMint}]}>
    <AbdoRegularText size={16} textAlign={'center'}  style={{color:(displayGirls&&!displayBoth&&!displayAfterschool)?Colors.lightMint:Colors.darkMint}}>
    بنات
    </AbdoRegularText>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => {setFilterCleared(false); setDisplayAfterschool(false); setDisplayBoth(false);setDisplayBoys(true);setDisplayGirls(false);}} style={[styles.subCategoryItem,{backgroundColor:(displayBoys&&!displayBoth)?Colors.darkMint:Colors.lightMint}]}>
    <AbdoRegularText size={16} textAlign={'center'} style={{color:(displayBoys&&!displayBoth)?Colors.lightMint:Colors.darkMint}}>
    بنين
    </AbdoRegularText>
    </TouchableOpacity>



    <TouchableOpacity onPress={()=>{
      setFilterCleared(false); setDisplayType('High School')}} 
      style={[styles.subCategoryItem,{backgroundColor:displayType==='High School'?Colors.darkMint:Colors.lightMint}]}>
    <AbdoRegularText size={16} textAlign={'center'}  style={{color:displayType==='High School'?Colors.lightMint:Colors.darkMint}}>
    ثانوي
    </AbdoRegularText>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=> {setFilterCleared(false); setDisplayType('Middle')}} style={[styles.subCategoryItem,{backgroundColor:displayType==='Middle'?Colors.darkMint:Colors.lightMint}]}>
    <AbdoRegularText size={16} textAlign={'center'} style={{color:displayType==='Middle'?Colors.lightMint:Colors.darkMint}}>
    متوسط
    </AbdoRegularText>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=> {setFilterCleared(false); setDisplayType('Primary')}} style={[styles.subCategoryItem,{backgroundColor:displayType==='Primary'?Colors.darkMint:Colors.lightMint}]}>
    <AbdoRegularText size={16} textAlign={'center'}  style={{color:displayType==='Primary'?Colors.lightMint:Colors.darkMint}}>
    ابتدائي
    </AbdoRegularText>
    </TouchableOpacity>

    <TouchableOpacity  onPress={()=> {setFilterCleared(false); setDisplayType('KG')}} style={[styles.subCategoryItem,{backgroundColor:displayType==='KG'?Colors.darkMint:Colors.lightMint}]}>
    <AbdoRegularText size={16} textAlign={'center'}  style={{color:displayType==='KG'?Colors.lightMint:Colors.darkMint}}>
    رياض أطفال
    </AbdoRegularText>
    </TouchableOpacity>

    <TouchableOpacity  onPress={()=> {setFilterCleared(false); setDisplayBoth(false);setDisplayBoys(false);setDisplayGirls(false); setDisplayType('none');setDisplayAfterschool(true);}} style={[styles.subCategoryItem,{backgroundColor:displayAfterschool?Colors.darkMint:Colors.lightMint}]}>
    <AbdoRegularText size={16} textAlign={'center'}  style={{color:displayAfterschool?Colors.lightMint:Colors.darkMint}}>
    نوادي الحي
    </AbdoRegularText>
    </TouchableOpacity>




    </Animated.View>

    </Animated.View>,


    <TouchableOpacity style={[{left:15,top:15},styles.buttons]} onPress={() => {setCardIndex(0); setDisplayCategory('');setDisplayBoth(true);setDisplayType('All'); }}>

    <IonIcon size={20} name={ 'ios-arrow-forward' } color={Colors.mediumGray} />
    <AbdoRegularText size={16} style={[styles.header,{marginLeft:5}]}>
    عودة
    </AbdoRegularText>
    </TouchableOpacity>,

    <TouchableOpacity style={[{bottom:4,display:(!displayBoth || displayType!=='All'||displayAfterschool)?'flex':'none'},styles.buttons]} onPress={() => {setFilterCleared(true); setDisplayBoth(true);setDisplayType('All'); setDisplayAfterschool(false)}}>

    <IonIcon size={22} name={ 'ios-close' } color={Colors.mediumGray} />
    <AbdoRegularText size={13} style={[styles.header,{marginLeft:5}]}>
    مسح التصفية
    </AbdoRegularText>
    </TouchableOpacity>
  ]);

  if(displayCategory==='lifestyle')
  return([
    <Animated.View style={[{alignItems:'center',marginTop:animatedValue}]}>

    <Animated.View style={styles.subCategoryTitle}>
    <MaterialIcons
    style={styles.navIcon}
    name={"flower-outline"}
    color={Colors.green}
    size={24}/>
    <AbdoMediumText size={16} textAlign={'center'} color={Colors.green} style={[styles.header,{marginLeft:5}]}>
    نمط المعيشة
    </AbdoMediumText>
    </Animated.View>

    <Animated.View style={styles.subCategory}>


    <TouchableOpacity onPress={() => {setLifestyleDisplayType('gardens');}} style={[styles.subCategoryItem,{backgroundColor:(lifestyleDisplayType==='gardens')?Colors.green:Colors.mediumGreen}]}>
    <AbdoRegularText size={16} textAlign={'center'}  style={{color:(lifestyleDisplayType==='gardens')?Colors.mediumGreen:Colors.green}}>
    الحدائق
    </AbdoRegularText>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => {setLifestyleDisplayType('entertainment');}} style={[styles.subCategoryItem,{backgroundColor:(lifestyleDisplayType==='entertainment')?Colors.green:Colors.mediumGreen}]}>
    <AbdoRegularText size={16} textAlign={'center'}  style={{color:(lifestyleDisplayType==='entertainment')?Colors.mediumGreen:Colors.green}}>
    الترفيه
    </AbdoRegularText>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => {setLifestyleDisplayType('restaurants');}} style={[styles.subCategoryItem,{backgroundColor:(lifestyleDisplayType==='restaurants')?Colors.green:Colors.mediumGreen}]}>
    <AbdoRegularText size={16} textAlign={'center'}  style={{color:(lifestyleDisplayType==='restaurants')?Colors.mediumGreen:Colors.green}}>
    المطاعم
    </AbdoRegularText>
    </TouchableOpacity>




    </Animated.View>

    </Animated.View>,


    <TouchableOpacity style={[{left:15,top:15},styles.buttons]} onPress={() => {setCardIndex(0); setDisplayCategory('');}}>

    <IonIcon size={20} name={ 'ios-arrow-forward' } color={Colors.mediumGray} />
    <AbdoRegularText size={16} style={[styles.header,{marginLeft:5}]}>
    عودة
    </AbdoRegularText>
    </TouchableOpacity>,

    <TouchableOpacity style={[{bottom:4,display:lifestyleDisplayType!=='All'?'flex':'none'},styles.buttons]} onPress={() => {setLifestyleDisplayType('All');}}>

    <IonIcon size={22} name={ 'ios-close' } color={Colors.mediumGray} />
    <AbdoRegularText size={13} style={[styles.header,{marginLeft:5}]}>
    مسح التصفية
    </AbdoRegularText>
    </TouchableOpacity>
  ]);

  if(displayCategory==='facilities')
  return([
    <Animated.View style={[{alignItems:'center',marginTop:animatedValue}]}>

    <Animated.View style={styles.subCategoryTitle}>
    <DefMaterialIcons
      style={styles.navIcon}
      name={"business"}
      color={Colors.darkYellow}
      size={24}
    />
    <AbdoMediumText size={16} textAlign={'center'} color={Colors.darkYellow} style={[styles.header,{marginLeft:5}]}>
    المرافق العامة
    </AbdoMediumText>
    </Animated.View>

    <Animated.View style={styles.subCategory}>


    <TouchableOpacity onPress={() => {setFacDisplayType('pharmacies');}} style={[styles.subCategoryItem,{backgroundColor:(facDisplayType==='pharmacies')?Colors.darkYellow:Colors.vLightYellow}]}>
    <AbdoRegularText size={16} textAlign={'center'}  style={{color:(facDisplayType==='pharmacies')?Colors.vLightYellow:Colors.darkYellow}}>
    الصيدليات
    </AbdoRegularText>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => {setFacDisplayType('mosques');}} style={[styles.subCategoryItem,{backgroundColor:(facDisplayType==='mosques')?Colors.darkYellow:Colors.vLightYellow}]}>
    <AbdoRegularText size={16} textAlign={'center'}  style={{color:(facDisplayType==='mosques')?Colors.vLightYellow:Colors.darkYellow}}>
    المساجد
    </AbdoRegularText>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => {setFacDisplayType('health');}} style={[styles.subCategoryItem,{backgroundColor:(facDisplayType==='health')?Colors.darkYellow:Colors.vLightYellow}]}>
    <AbdoRegularText size={16} textAlign={'center'}  style={{color:(facDisplayType==='health')?Colors.vLightYellow:Colors.darkYellow}}>
    مركز صحي
    </AbdoRegularText>
    </TouchableOpacity>


    </Animated.View>

    </Animated.View>,


    <TouchableOpacity style={[{left:15,top:15},styles.buttons]} onPress={() => {setCardIndex(0); setDisplayCategory('');}}>

    <IonIcon size={20} name={ 'ios-arrow-forward' } color={Colors.mediumGray} />
    <AbdoRegularText size={16} style={[styles.header,{marginLeft:5}]}>
    عودة
    </AbdoRegularText>
    </TouchableOpacity>,

  <TouchableOpacity style={[{bottom:4,display:facDisplayType!=='All'?'flex':'none'},styles.buttons]} onPress={() => {setFacDisplayType('All');}}>

    <IonIcon size={22} name={ 'ios-close' } color={Colors.mediumGray} />
    <AbdoRegularText size={13} style={[styles.header,{marginLeft:5}]}>
    مسح التصفية
    </AbdoRegularText>
    </TouchableOpacity>
  ]);
}



useEffect(()=>{
  Animated.timing(animatedValue, {
	toValue: 0,
	easing: Easing.elastic(2), // Springy
	duration: 500
}).start()

})

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.expandButton} onPress={() => {
      props.navigation.goBack();
    }}>
    <View >
      <FeatherIconCustom
        name={"minimize-2"}
        color={Colors.mediumGray}
        size={24}
      />
    </View>
    </TouchableOpacity>

            <MapView
            ref={map => setMap(map)}
            style={styles.mapStyle}
            provider={PROVIDER_GOOGLE}
            initialRegion={mapCenter()}
            customMapStyle={mapStyle}
            showsPointsOfInterest={false}
            >




        {displayCategory==='education'?


            educationPOI.map((marker, index) => {
             if((displayBoth || marker.gender==='كلاهما')&&(displayType==='All' || marker.type=='جميع المراحل'))
              return (
                <Marker
                key={index}
                coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
                onPress={() => {
                  setCurrentMarker(marker);
                  setCurrentMarkerColor(Colors.darkMint);
                  setCardIndex(2);
                }}
                >
                <Animated.View opacity={(marker.longitude===currentMarker.longitude && marker.latitude===currentMarker.latitude)?1:0.5} style={[styles.markerWrap]}>
                  <View style={[styles.marker,{backgroundColor: Colors.darkMintRGB}]}/>
                  <View style={[styles.ring,{backgroundColor: Colors.darkMintRGBA}]} />
                </Animated.View>
                </Marker>
              );
              else if ((displayGirls && marker.gender==='بنات')||(displayBoys && marker.gender==='بنين')||(displayType!=='All' && marker.type==displayType))
              return (
                <Marker
                key={index}
                coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
                >
                <Animated.View opacity={(marker.longitude===currentMarker.longitude && marker.latitude===currentMarker.latitude)?1:0.5} style={[styles.markerWrap]}>
                  <View style={[styles.marker,{backgroundColor: Colors.darkMintRGB}]}/>
                  <View style={[styles.ring,{backgroundColor: Colors.darkMintRGBA}]} />
                </Animated.View>
                </Marker>
              );
            })

          :null}

          {displayCategory==='education' && (filterCleared || displayAfterschool)?


              afterschoolPOI.map((marker, index) => {
                return (
                  <Marker
                  key={index}
                  coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
                  onPress={() => {
                    setCurrentMarker(marker);
                    setCurrentMarkerColor(Colors.darkMint);
                    setCardIndex(2);
                  }}
                  >
                  <Animated.View opacity={(marker.longitude===currentMarker.longitude && marker.latitude===currentMarker.latitude)?1:0.5} style={[styles.markerWrap]}>
                    <View style={[styles.marker,{backgroundColor: Colors.darkMintRGB}]}/>
                    <View style={[styles.ring,{backgroundColor: Colors.darkMintRGBA}]} />
                  </Animated.View>
                  </Marker>
                );
              })
            :null}

        {displayCategory==='facilities' ?


              facilitiesPOI.map((marker, index) => {
                if (facDisplayType==='All'||marker.type===facDisplayType)
                return (
                  <Marker
                  key={index}
                  coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
                  onPress={() => {
                    setCurrentMarker(marker);
                    setCurrentMarkerColor(Colors.darkYellow);
                    setCardIndex(2);
                  }}
                  >
                  <Animated.View opacity={(marker.longitude===currentMarker.longitude && marker.latitude===currentMarker.latitude)?1:0.5} style={[styles.markerWrap]}>
                    <View style={[styles.marker,{backgroundColor: Colors.darkYellowRGB}]}/>
                    <View style={[styles.ring,{backgroundColor: Colors.darkYellowRGBA}]} />
                  </Animated.View>
                  </Marker>
                );
              })


            :null}
        {displayCategory==='lifestyle' ?


                lifestylePOI.map((marker, index) => {
                  if (lifestyleDisplayType==='All'||marker.type===lifestyleDisplayType)
                  return (
                    <Marker
                    key={index}
                    coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
                    onPress={() => {
                      setCurrentMarker(marker);
                      setCurrentMarkerColor(Colors.green);
                      setCardIndex(2);
                    }}
                    >
                    <Animated.View opacity={(marker.longitude===currentMarker.longitude && marker.latitude===currentMarker.latitude)?1:0.5} style={[styles.markerWrap]}>
                      <View style={[styles.marker,{backgroundColor: Colors.greenRGB}]}/>
                      <View style={[styles.ring,{backgroundColor: Colors.greenRGBA}]} />
                    </Animated.View>
                    </Marker>
                  );
                })


              :null}

            </MapView>



              <View style={styles.card} >

            { cardIndex==0 ? [

              <AbdoRegularText size={16} style={[styles.header]}>
              استكشف
              {props.neighborhoodName}
              </AbdoRegularText>,
              <Animated.View style={[styles.categories,{marginTop:animatedValue}]} >
              <TouchableOpacity onPress={() => {setDisplayCategory('education'); setCardIndex(1);}}>
              <View style={[{backgroundColor:Colors.darkMint},styles.categoryIcon]}>
              <FeatherIconCustom
                style={styles.navIcon}
                name={"book-open"}
                color={'white'}
                size={40}
              />
              </View>
              <AbdoRegularText size={12} style={styles.description}>
              التعليم
              </AbdoRegularText>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {setDisplayCategory('lifestyle');setCardIndex(1);}}>
              <View style={[{backgroundColor:Colors.green},styles.categoryIcon]}>
              <MaterialIcons
                style={styles.navIcon}
                name={"flower-outline"}
                color={'white'}
                size={40}
              />
              </View>
              <AbdoRegularText size={12} style={styles.description}>
              نمط المعيشة
              </AbdoRegularText>
              </TouchableOpacity>


              <TouchableOpacity onPress={() => {setDisplayCategory('facilities');setCardIndex(1);}}>
              <View style={[{backgroundColor:Colors.darkYellow},styles.categoryIcon]}>
              <DefMaterialIcons
                style={styles.navIcon}
                name={"business"}
                color={'white'}
                size={40}
              />
              </View>
              <AbdoRegularText size={12} style={styles.description}>
              الخدمات العامة
              </AbdoRegularText>
              </TouchableOpacity>
              </Animated.View>
            ] : null}

            { cardIndex==1 ? displaySubcategories() : null}

            { cardIndex==2 ? [


              <Animated.View style={[{width:'100%',height:'100%',alignItems:'left',justifyContent:'center',marginLeft:15,marginTop:animatedValue}]}>


              <AbdoMediumText numberOfLines={1} size={22} textAlign={'center'} color={currentMarkerColor} style={[styles.header]}>
              {currentMarker.title}
              </AbdoMediumText>
              <AbdoRegularText size={18} style={[styles.header,{marginLeft:5}]}>
              {(typeof currentMarker.type !== 'undefined') &&
                <AbdoRegularText>
                    {(currentMarker.gender!=='undefined')?currentMarker.type+ ' | ':' '}
                </AbdoRegularText>
              }

              {(currentMarker.gender!=='undefined')?currentMarker.gender:' '}
              </AbdoRegularText>



              <View style={styles.subCategory}>


              </View>

              </Animated.View>,
              <TouchableOpacity style={[{left:15,top:15},styles.buttons]} onPress={() => {setCardIndex(0); setDisplayCategory('');setCurrentMarker({});}}>

              <IonIcon size={20} name={ 'ios-arrow-forward' } color={Colors.mediumGray} />
              <AbdoRegularText size={16} style={[styles.header,{marginLeft:5}]}>
              عودة
              </AbdoRegularText>
              </TouchableOpacity>,
            ] : null}



              </View>



        </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  mapStyle: {
    alignSelf: 'stretch',
    flex:1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    position: "absolute",
    bottom: 30,
    padding: 10,
    elevation: 2,
    borderRadius:20,
    backgroundColor: 'white',
    shadowOpacity: 0.1,
    shadowRadius: 7,
    shadowColor: "black",
    alignItems:'center',
    shadowOffset: {height: 0, width: 0},
    height: '30%',
    width: CARD_WIDTH,
  },
  header:{
    color:Colors.darkGray,
    marginTop:5
  },
  subCategoryTitle:{
    width:'100%',
    marginTop:15,
    flexDirection:'row'
  },
  subCategoryItem:{
    backgroundColor:Colors.lightMint,
    padding:10,
    marginLeft:5,
    marginBottom:10,
    borderRadius:25,
    color:Colors.darkMint,
    paddingBottom:-10
  },
  subCategory:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    alignItems:'center',
    marginTop:-3,
  },
  buttons:{
    flexDirection:'row',
    position:'absolute',
  },
  POIName:{
    width:'100%',
  },
  categories:{
    width:'90%',
    height:'75%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  categoryIcon:{
    borderRadius:100,
    width:65,
    height:65,
    alignItems:'center',
    justifyContent:'center',
  },
  description:{
    color:Colors.darkGray,
    marginTop:10
  },
  title:{
    width:'90%',
    height:'75%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },

  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 17,
    height: 17,
    borderRadius: 25,
    position: "absolute"
  },
  ring: {
    width: 26,
    height: 26,
    borderRadius: 25,
  },
  expandButton: {
    position: "absolute",
    top: 80,
    left: 20,
    zIndex: 500,
    borderRadius: 100,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: {height: 0, width: 0}
  },
});

const NavigationConnected = withNavigation(FullMap);
export {NavigationConnected as FullMap};
