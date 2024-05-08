import {View,Button,Alert,Image,Text,StyleSheet} from 'react-native'
import { launchCameraAsync,useCameraPermissions,PermissionStatus } from 'expo-image-picker'
import { useState } from 'react'
import { GlobalStyles } from '../../constants/styles'
import OutlinedButton from '../../UI/OutlinedButton'

const ImagePicker = ({onTakeImage}) => {

    const [pickedImage, setPickedImage] = useState()
    const [cameraPermissionInformation,requestPermission] = useCameraPermissions()

    async function verifyPermissions(){
        // Bu kısımda camera izni alındığı belli değilse camera izni almaya çalışıyoruz(UNDETERMINED)

        if(cameraPermissionInformation.status===PermissionStatus.UNDETERMINED){
           const permissionResponse= await requestPermission()
           
           return permissionResponse.granted
        }

        // Eğer izin verilmezse yapılacak kısım yer almaktadır.

        if(cameraPermissionInformation.status===PermissionStatus.DENIED){
            Alert.alert("Insufficient Permissions!","You need to grant camera permissions to use this app.")

            return false
        }
        
        return true
    }

    // Burada camerayı açıyoruz ve açtıktan sonra foto boyutu vs. gibi ayarlar yapıyoruz

    async function takeImageHandler(){

        const hasPermission = await verifyPermissions()

        if(!hasPermission){
            return;
        }

      const image = await launchCameraAsync({
        allowsEditing:true,
        aspect:[16,9],
        quality:0.5
      })
      
    //   Burada çekilen image dosyasının yolunu tutmaktayız

      setPickedImage(image.uri)
      onTakeImage(image.uri)
    }

    // Eğer seçilen bir resim yoksa aşağıdaki yazı çıkar if ile aşağıda durum kontrol edilmiştir
    
    let imagePreview=<Text>No image taken yet.</Text>

    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri:pickedImage}}/>
    }

  return (
    <View>
        <View style={styles.imagePreview}>
            {imagePreview}
        </View>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>
            Take Image
        </OutlinedButton>
    </View>
  )
}

export default ImagePicker

const styles=StyleSheet.create({
    imagePreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:GlobalStyles.SystemColors.green200,
        borderRadius:15
    },
    image:{
        width:'100%',
        height:'100%'
    }
})
