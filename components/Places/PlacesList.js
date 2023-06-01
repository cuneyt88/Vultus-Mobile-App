import { FlatList,View,Text,StyleSheet } from "react-native"
import PlaceItem from "./PlaceItem"
import { useNavigation } from "@react-navigation/native"

const PlacesList = ({places,onItemDelete}) => {
  const navigation=useNavigation()

  function selectPlaceHandler(id){
    navigation.navigate('PlaceDetails',{
      placeId:id
    })
  }

  if(!places || places.length===0){
    return(
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet-Start adding some!</Text>
      </View>
    )
  }

  return (
    <FlatList data={places} keyExtractor={(item)=>item.id} renderItem={({item})=><PlaceItem place={item} deletePlace={onItemDelete} onSelect={selectPlaceHandler}/>}/>
  )
}

export default PlacesList

const styles=StyleSheet.create({
  fallbackContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  fallbackText:{
    fontSize:16
  }
})