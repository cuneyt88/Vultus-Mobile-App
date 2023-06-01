import {Pressable,StyleSheet,Text} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { GlobalStyles } from '../constants/styles'

const OutlinedButton = ({onPress,icon,children}) => {
  return (
    <Pressable style={({pressed})=>[styles.button, pressed&&styles.pressed]} onPress={onPress}>
        {/* Burada problar ile iconun kullanacağı yerde girilen bilgiler ile şekil alması için kullanım yapıyoruz */}
        
        <Ionicons style={styles.icon} name={icon} size={18} color={GlobalStyles.SystemColors.blue300}/>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default OutlinedButton

const styles=StyleSheet.create({
    button:{
        paddingHorizontal:12,
        paddingVertical:6,
        margin:4,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:GlobalStyles.SystemColors.green400,
    },
    pressed:{
        opacity:0.7
    },
    icon:{
        marginRight:6
    },
    text:{
        color:GlobalStyles.TextColors.textGreen
    }
})