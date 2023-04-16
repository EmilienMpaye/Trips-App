import { View, Text ,Image,TextInput,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import {useSelector , useDispatch} from 'react-redux'
import { setUserLoading } from '../redux/slice/user'
import Loading from '../components/loading'


export default function SignInScreen() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {userLoading} = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const handleSubmit = async ()=>{
        if(email && password){
            //good to go
           // navigation.goBack();
           // navigation.navigate('Home');
           try{
            dispatch(setUserLoading(true));
       await createUserWithEmailAndPassword(auth , email , password);
      dispatch(setUserLoading(false));

         }catch(e){
           dispatch(setUserLoading(false));
         }
      
        }else{

        (
              <Snackbar>
                Hello World!
              </Snackbar>
          
        
        )};
    }
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View >
            <View className="relative ">
            <View className="absolute top-0 left-0">
            <BackButton/>
            </View>
            <Text className={`${colors.heading}text-xl font-bold text-center text-green-600`}>Sign Up</Text>
            </View>
      
      <View className="flex-row justify-center my-3 mt-5">
       <Image className="h-52 w-82" source={require('../assets/signup.png')}/>
        </View>
        <View className="space-y-2 mx-2">
      <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
      <TextInput value={email} onChangeText={value=> setEmail(value)} className="p-3 bg-white rounded-full mb-2"/>
      <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
      <TextInput value={password} secureTextEntry onChangeText={value=> setPassword(value)} className="p-3 bg-white rounded-full mb-2"/>
      <TouchableOpacity>
        <Text className="flex-row justify-end">Forget Password</Text>
      </TouchableOpacity>
       </View>
      </View>
     <View>
     {
        userLoading?(
          <Loading/>
        ):(
          <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:colors.button}} className="my-5 rounded-full p-2 shadow-sm justify-between items-center">
    <Text className="text-lg text-yellow-300 font-bold">Sig Up</Text>
       </TouchableOpacity>
        )
      }

    
     </View>
     </View>
    </ScreenWrapper>
  )
}