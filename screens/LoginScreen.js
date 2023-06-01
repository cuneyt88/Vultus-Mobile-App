import LoadingOverlay from '../UI/LoadingOverlay'
import { useContext, useState } from 'react';
import AuthContent from '../components/AuthContent';
import { login } from '../util/auth';
import { Alert,Image,StyleSheet,View } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx=useContext(AuthContext)

  async function loginHandler({email,password}){
    setIsAuthenticating(true)
    try {
      const token=await login(email,password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert('Authentication failed!','Could not log you in. Please check your credentials or try again later!')
      setIsAuthenticating(false)
    }
  }

  if(isAuthenticating){
    return <LoadingOverlay message="Logging you in..."/>
  }

  return (
  <View>
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/man-phone.gif')}/>
    </View>
    <AuthContent isLogin onAuthenticate={loginHandler}/>
  </View>
  );
}

export default LoginScreen;

const styles=StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center'
  },
  image:{
      height:250,
      width:250,
      margin:16, 
  },
  
})