import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IconButton from './UI/IconButton'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading'
import { GlobalStyles } from './constants/styles';
import { useContext, useEffect, useState } from 'react';
import AuthContextProvider,{ AuthContext } from './store/auth-context';
import EntireScreen from './screens/EntireScreen';
import Map from './screens/Map'
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import { init } from './util/database';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.SystemColors.blue300 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      
      <Stack.Screen name="Entire" component={EntireScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx=useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.SystemColors.blue300 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.SystemColors.blue200 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        title:'',
        headerRight:({tintColor})=> <IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout}/>
      }}/>
      <Stack.Screen name="AllPlaces" component={AllPlaces} options={({navigation})=>({
        title:'Your Favorite Places',
        headerRight:({tintColor})=> <IconButton icon="add" size={24} color={tintColor} onPress={()=>navigation.navigate('AddPlace')}/>
        })}/>
      <Stack.Screen name="AddPlace" component={AddPlace} options={{
        title:'Add a new Place',
        }}/>
      <Stack.Screen name="Map" component={Map} options={{
        title:'Map',
        }}/>
      <Stack.Screen name='PlaceDetails' component={PlaceDetails}  options={{
        title:'Loading Place...'
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx=useContext(AuthContext)

  return (
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack/>}
      </NavigationContainer>
  );
}

function Root(){
  const [isTryingLogin,setIsTryingLogin]=useState(true)
  const authCtx=useContext(AuthContext)

  useEffect(() => {
    async  function fetchToken(){
    const storedToken = await AsyncStorage.getItem('token')

    if(storedToken){
      authCtx.authenticate(storedToken)
    }
    setIsTryingLogin(false)
  }
   fetchToken()
  }, [])
  if(isTryingLogin){
    return <AppLoading/>
  }

  return <Navigation />
}

export default function App() {
  const [dbinitialized, setDbinitialized] = useState(false)

  useEffect(() => {
    init().then(()=>{
      setDbinitialized(true)
    }).catch(err=>{
      console.log(err)
    })
  }, [])

  if(!dbinitialized){
    return <AppLoading/>
  }
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root/>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
