import axios from 'axios'
import {FIREBASE_API,FIREBASE_URL} from '@env'

async function authenticate(mode,email,password){
    const url=`${FIREBASE_URL}/accounts:${mode}?key=${FIREBASE_API}`

    const response = await axios.post(url,{
        email:email,
        password:password,
        returnSecureToken:true
    })

    const token=response.data.idToken

    return token;
}

export  function createUser(email,password){
    return authenticate('signUp',email,password)
}

export  function login(email,password){
    return authenticate('signInWithPassword',email,password)

}