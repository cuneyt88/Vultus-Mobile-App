import { useCallback, useState } from 'react'
import {View,Text,ScrollView,TextInput,StyleSheet,ToastAndroid} from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Button from '../../UI/Button'
import {Place} from '../../models/place'

const PlaceForm = ({onCreatePlace}) => {
    const [enteredTitle, setEnteredTitle] = useState('')
    const [pickedLocation, setPickedLocation] = useState()
    const [selectedImage, setSelectedImage] = useState()

    function changeTitleHandler(enteredText){
        setEnteredTitle(enteredText)
    }

    const pickLocationHandler=useCallback((location)=>{
        setPickedLocation(location)
    },[])

    function takeImageHandler(imageUri){
        setSelectedImage(imageUri)
    }

    function savePlaceHandler(){
        if(enteredTitle==='' || selectedImage===null || pickedLocation ===null){
            ToastAndroid.show('Missing data entry', ToastAndroid.SHORT);
            return;
        }else{
            const placeData=new Place(enteredTitle,selectedImage,pickedLocation)
            onCreatePlace(placeData)
        }
    }

  return (
    <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput placeholder="Give a tittle..." style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
        </View>
        <ImagePicker onTakeImage={takeImageHandler}/>
        <LocationPicker onPickLocation={pickLocationHandler}/>
        <View style={styles.middle}>
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </View>
    </ScrollView>
  )
}

export default PlaceForm

const styles=StyleSheet.create({
    form:{
        flex:1,
        padding:24
    },
    label:{
        fontWeight:'bold',
        marginBottom:4,
        color:GlobalStyles.SystemColors.blue400
    },
    input:{
        marginVertical:8,
        paddingHorizontal:4,
        paddingVertical:8,
        fontSize:16,
        borderBottomColor:GlobalStyles.TextColors.textGreen,
        borderBottomWidth:2,
        backgroundColor:GlobalStyles.SystemColors.green300,
        borderRadius:10,
        color:'white',
        textDecorationLine:'none'
    },
    middle:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:15
    }
})