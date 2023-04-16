import { View, Text,Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/randomImage'
import EmptyList from '../components/emptyList'
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';
import { signOut } from 'firebase/auth'
import { auth, tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import { doc, getDocs, query, where } from 'firebase/firestore'


const items =[
  {
  id:1,
  place:'murukari',
  country: 'Rwanda',
},
{
  id: 2,
  place :'londan',
  country:'England',
},
{
  id:3,
  place:'to efer',
  country:'france',
},
{
  id:4,
  place:'Gorilla',
  country:'Rwanda',
},
{
  id:5,
  place:'New york',
  country:'America',
},
{
  id: 6,
  place :'londan',
  country:'England',
},
{
  id:7,
  place:'to efer',
  country:'france',
},
{
  id:8,
  place:'Gorilla',
  country:'Rwanda',
},
{
  id:9,
  place:'New york',
  country:'America'
}
]


export default function HomeScreen() {
const navigation = useNavigation();
const {user} = useSelector(state=>state.user);
const [trips, setTrips] = useState([]);
const isFocused = useIsFocused();

const fetchTrips = async ()=>{
const q = query(tripsRef, where("userId","==",user.uid));
const querySnapshot=await getDocs(q);
let data = [];
querySnapshot.forEach(doc=>{
  //console.log('document: ',doc.data());
  data.push({...doc.data(), id: doc.id})
});

setTrips(data);
}

useEffect(()=>{
  if(isFocused)
   fetchTrips();
},[isFocused])
const handleLogout= async ()=>{
await signOut(auth);
}

  return ( 
<ScreenWrapper className="flex-1" >
<View className="flex-row justify-between items-center p-3 mt-1">
  <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Trips App</Text>
  <TouchableOpacity onPress={handleLogout} className="  p-3 bg-white border-gray-200 rounded-full">
  </TouchableOpacity>
  </View>
  <View className='flex-row justify-center  bg-blue-200 rounded-xl '>
 <Image source={require('../assets/banner.jpg')} className="w-50 h-50"/>
    </View>
    <View className="px-4 space-y-4">
      <View className="flex-row justify-between items-center">
        <Text className={`${colors.heading} font-bold text-xl`} >Recent Trips</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('AddTrip')} className=" p-3 bg-white border-gray-500 rounded-full">
  <Text className={`${colors.heading} `} >Add Trip</Text>
  </TouchableOpacity>
      </View>
      <View style={{height:430}}>
        <FlatList
        data={trips}
        numColumns={2}
        ListEmptyComponent={<EmptyList message={"you have not recorded any Trips yet"} />}
        keyExtractor={item=>item.id}
        showVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent:'space-between'
        }}
        className="mx-2"
        renderItem={({item})=>{
          return(
            <TouchableOpacity onPress={()=>navigation.navigate('TripExpenses' , {...item})} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
              <View>
                <Image source={randomImage()} className='w-36 h-36 mb-2'/>
               <Text className={`${colors.heading} font-bold`}> {item.place}</Text>
                <Text className={`${colors.heading} text-xs`}> {item.country}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
        />
      </View>
      </View> 
</ScreenWrapper>
 
  )
}