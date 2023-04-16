import { View, Text ,Image,TextInput,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from 'react-native-paper';
import { addDoc } from 'firebase/firestore'
import { tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import Loading from '../components/loading'
import { async } from '@firebase/util'

export default function AddTripScreen() {
    const [place,setPlace]=useState('');
    const [country,setCountry]=useState('');
   const [loading,setLoading] = useState(false);
   const {user} = useSelector(state=>state.user);
    const navigation = useNavigation();
    const handleAddTrip = async ()=>{
        if(place && country){
            //good to go
            //navigation.navigate('Home');
            setLoading(true);
            let doc =await addDoc(tripsRef, {
              place,
              country,
              userId:user.uid
            });
            setLoading(false);
            if(doc && doc.id){
              navigation.goBack();
            }


        }else{
            //show error
           (<Snackbar>
                Hello World!
              </Snackbar>
          
       )};
    }
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View >
            <View className="relative mt-6">
            <View className="absolute top-0 left-0">
            <BackButton/>
            </View>
            <Text className={`${colors.heading}text-xl font-bold text-center text-green-600`}>Add Trip</Text>
            </View>
      
      <View className="flex-row justify-center my-3 mt-5">
       <Image className="h-72 w-72" source={require('../assets/trip.jpg')}/>
        </View>
        <View className="space-y-2 mx-2">
      <Text className={`${colors.heading} text-lg font-bold`}>Where on Earth?</Text>
      <TextInput value={place} onChangeText={value=> setPlace(value)} className="p-3 bg-white rounded-full mb-2"/>
      <Text className={`${colors.heading} text-lg font-bold`}>Which Country</Text>
      <TextInput value={country} onChangeText={value=> setCountry(value)} className="p-3 bg-white rounded-full mb-2"/>
       </View>
      </View>
     <View>
      {
        loading?(
          <Loading />

        ):(
          <TouchableOpacity onPress={handleAddTrip} style={{backgroundColor:colors.button}} className="my-5 rounded-full p-2 shadow-sm justify-between items-center">
          <Text className="text-lg text-yellow-300 font-bold">Add Trip</Text>
            </TouchableOpacity>
        )
      }
   
     </View>
     </View>
    </ScreenWrapper>
  )
}