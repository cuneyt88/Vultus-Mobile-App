import {View,Text,Image,StyleSheet} from 'react-native'
import Button from '../UI/Button'
import { useNavigation } from '@react-navigation/native'
import { GlobalStyles } from '../constants/styles'

const WelcomeScreen = () => {

  const navigation=useNavigation()

  function goMapScreen(){
    navigation.navigate('AllPlaces')
  }

  return (
    <View style={styles.container}> 
        <Text style={styles.text}>Let's favorite places</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/mapsicle-map.gif')} />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={goMapScreen}>Start</Button>
        </View>
    </View>
  )
}

export default WelcomeScreen

const styles=StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center',
  },
  text:{
    textAlign:'center',
    margin:16,
    fontStyle:'italic',
    fontWeight:'bold',
    fontSize:20,
    color:GlobalStyles.TextColors.textGreen
  },
  profilImage:{
    width:120,
    height:120,
    borderRadius:80,
  },
  image:{
    width:270,
    height:270,
    borderRadius:15
  },
  imageContainer:{
    alignItems:'center',
    margin:16
  },
  buttonContainer:{
    alignItems:'center',
    margin:16
  },
  
})