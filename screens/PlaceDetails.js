import {ScrollView,Image,View,Text,StyleSheet,ActivityIndicator } from 'react-native'
import OutlinedButton from '../UI/OutlinedButton'
import { GlobalStyles } from '../constants/styles'
import { useEffect, useState } from 'react'
import { fetchPlaceDetails } from '../util/database'

const PlaceDetails = ({route,navigation}) => {
    const [fetchedPlace, setFetchedPlace] = useState()

    function showOnMapHandler(){
        navigation.navigate('Map',{
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng
        })
    }

    const selectedPlaceId=route.params.placeId

    useEffect(() => {
        async function loadPlaceData(){
            const place=await fetchPlaceDetails(selectedPlaceId)
            setFetchedPlace(place)
            navigation.setOptions({
                title:place.title
            })
        }

        loadPlaceData()
    }, [selectedPlaceId])

    if(!fetchedPlace){
        return (
            <View style={styles.fallback}>
                <ActivityIndicator size="large" color={GlobalStyles.SystemColors.primary} />
                <Text>Loading place data...</Text>
            </View>
        );
    }
    

  return (
    <ScrollView>
        <Image style={styles.image} source={{uri:fetchedPlace.imageUri}}/>
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{fetchedPlace.location.lat.toFixed(4)}</Text>
            </View>
            <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton>
        </View>
    </ScrollView>
  )
}

export default PlaceDetails

const styles=StyleSheet.create({
    fallback:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        height:'35%',
        minHeight:300,
        width:'100%',
    },
    locationContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    addressContainer:{
        padding:20
    },
    address:{
        color:GlobalStyles.TextColors.textBlue,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:24,
        marginTop:40
    }
})