import {View,StyleSheet,Alert,Image,Text} from 'react-native'
import OutlinedButton from '../../UI/OutlinedButton'
import { GlobalStyles } from '../../constants/styles'
import { getCurrentPositionAsync,useForegroundPermissions } from 'expo-location'
import { useEffect, useState } from 'react'
import { useNavigation, useRoute,useIsFocused } from '@react-navigation/native'
import {getAddress, getMapPreview} from '../../util/location'

const LocationPicker = ({onPickLocation}) => {
    const isFocused=useIsFocused()

    const navigation=useNavigation()

    const route=useRoute()

    const [pickedLocation, setPickedLocation] = useState()

    const [locationPermissionInformation,requestPermission]=useForegroundPermissions()

    
    useEffect(() => {
        if(isFocused && route.params){
            const mapPickedLocation={
                lat:route.params.pickedLat,
                lng:route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation)
        }
    }, [route,isFocused])

    useEffect(() => {
        async function handleLocation(){
            if(pickedLocation){
                const address = await
                getAddress(pickedLocation.lat,pickedLocation.lng)
                onPickLocation({...pickedLocation,address:address})
            }
        }
        handleLocation()
    }, [pickedLocation,onPickLocation])
    
   
    async function requestLocationPermission() {
        const { status } = await requestPermission();
      
        if (status === 'granted') {
          return true;
        } else {
            Alert.alert("Insufficient Permissions!","You need to grant location permissions to use this app.")
          return false;
        }
      }

    async function getLocationHandler(){
       const hasPermission= await requestLocationPermission()

       if(!hasPermission){
        return;
       }

       const location= await getCurrentPositionAsync()
       setPickedLocation({
        lat:location.coords.latitude,
        lng:location.coords.longitude
       })

       console.log(location)
    }
    
    function pickOnMapHandler(){
        navigation.navigate('Map')
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if(pickedLocation){
        locationPreview = <Image style={styles.image} source={{uri:getMapPreview(pickedLocation.lat,pickedLocation.lng)}}/>
    }

  return (
    <View>
        <View style={styles.mapPreview}>
            {locationPreview}
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
        </View>
    </View>
  )
}

export default LocationPicker

const styles=StyleSheet.create({
    mapPreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:GlobalStyles.SystemColors.green200,
        borderRadius:15,
        
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    image:{
        width:'100%',
        height:'100%',
    }
})