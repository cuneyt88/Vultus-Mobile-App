import {View,Text,Image} from 'react-native'
import { GlobalStyles } from '../constants/styles'
import Button from '../UI/Button'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const EntireScreen = () => {
    const navigation=useNavigation()

    function nextPageHandler(){
        navigation.navigate('Login')
    }

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../assets/entire-map.gif')}/>
        </View>
        <Text style={styles.headerText}>Here you are! Vultus is also with you to remember journeys!</Text>
        <Text style={styles.text}>We are here to present you the places you want to see during your journey, on the path you have drawn. If you want to experience more, the button is below !</Text>
        <Image style={styles.image} source={require('../assets/mountain-car.gif')}/>
        <View style={styles.button}>
            <Button onPress={nextPageHandler}>Come In!</Button>
        </View>
    </View>
  )
}

export default EntireScreen

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white'
    },
    headerText:{
        color:GlobalStyles.TextColors.headingBlack,
        fontWeight:'bold',
        margin:12,
        fontSize:20,
        textAlign:'center',
    },
    text:{
        textAlign:'center',
        margin:12
    },
    imageContainer:{
        justifyContent: 'center',
        alignItems: 'flex-end', 
    },
    image:{
        height:200,
        width:200,
        margin:16
    },
    button:{
        alignItems:'center',
        marginTop:20
    }
    
})

