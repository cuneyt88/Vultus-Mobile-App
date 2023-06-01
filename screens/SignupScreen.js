import {View,StyleSheet,Image} from 'react-native'
import { useContext, useState } from 'react';
import { createUser } from '../util/auth';
import LoadingOverlay from '../UI/LoadingOverlay'
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
import AuthContent from '../components/AuthContent';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx=useContext(AuthContext)

  async function signupHandler({email,password}){
    setIsAuthenticating(true)
    try {
      const token = await createUser(email,password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert('Authentication failed!','Could not create user. Please check your input and try again later!')
      setIsAuthenticating(false)
    }
  }

  if(isAuthenticating){
    return <LoadingOverlay message="Creating user..."/>
  }

  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/direction-map.png')}/>
      </View>
      <AuthContent onAuthenticate={signupHandler}/>
    </View>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center'
  },
  image:{
    height:200,
    width:250,
    margin:0, 
}
});