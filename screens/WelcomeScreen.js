import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <ScreenWrapper>
        <View className="h-full flex justify-around">
       <View className="flex-row justify-center mt-1">
<Image source={require('../assets/wel.jpg')} className="h-85 w-90"/>
       </View>
       <View className="mx-5 mb-20">
<Text className={`text-center font-bold text-4xl ${colors.heading}`}>Trips App</Text>

<TouchableOpacity onPress={()=>navigation.navigate("SignIn")} className=" p-3 mt-11 rounded-full mb-5" style={{backgroundColor:colors.button}}>
<Text className="text-center text-yellow-500 text-lg font-bold">Sign In</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate("SignUp")} className=" p-3 rounded-full" style={{backgroundColor:colors.button}}>
<Text className="text-center text-yellow-500 text-lg font-bold">Sign UP</Text>
</TouchableOpacity>

       </View>
        </View>
    
    </ScreenWrapper>
  )
}