import { View, Text,Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/randomImage'
import EmptyList from '../components/emptyList'
import { useNavigation } from "@react-navigation/native";
import BackButton from '../components/backButton'
import ExpenseCard from '../components/expenseCard'
import { useIsFocused } from '@react-navigation/native';
import { getDocs, query, where } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'


const items =[
  {
  id:1,
  title:'ate sandwitch',
  amount: 4,
  category:'food'
},
{
    id:2,
    title:'bought a jacket',
    amount: 50,
    category:'shopping',
},
{
    id:3,
    title:'watched a movie',
    amount: 100,
    category:'entertainment'
}

]

export default function TripExpensesScreen(props) {
   // console.log('props: ',props);
   const {id,place,country} = props.route.params;
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([]);

  const isFocused = useIsFocused();

  const fetchExpenes = async ()=>{
  const q = query(expensesRef, where("tripId","==",id));
  const querySnapshot=await getDocs(q);
  let data = [];
  querySnapshot.forEach(doc=>{
    //console.log('document: ',doc.data());
    data.push({...doc.data(), id: doc.id})
  });
  
  setExpenses(data);
  }
  
  useEffect(()=>{
    if(isFocused)
    fetchExpenes();
  },[isFocused])

  return ( 
<ScreenWrapper className="flex-1" >
    <View className="px-4">
    <View className="relative mt-6">
            <View className="absolute top-0 left-0">
            <BackButton/>
            </View>
            <View>
            <Text className={`${colors.heading}text-xl font-bold text-center text-green-600`}>{place}</Text>
            <Text className={`${colors.heading}text-xs  text-center text-green-600`}>{country}</Text>
            </View>
        
            </View>
  <View className='flex-row justify-center  rounded-xl mb-4 '>
 <Image source={require('../assets/trip2.png')} className="w-70 h-70"/>
    </View>
    <View className="space-y-4">
      <View className="flex-row justify-between items-center">
        <Text className={`${colors.heading} font-bold text-xl`} >Expenses</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('AddExpense',{id, place,country})} className="  p-3 bg-white border-gray-500 rounded-full">
  <Text className={`${colors.heading} `} >Add Expense</Text>
  </TouchableOpacity>
      </View>
      <View style={{height:400}}>
        <FlatList
        data={expenses}
       // numColumns={2}
        ListEmptyComponent={<EmptyList message={"you haven't recorded any Expenses yet"} />}
        keyExtractor={item=>item.id}
        showVerticalScrollIndicator={false}
        className="mx-2"
        renderItem={({item})=>{
          return(
           <ExpenseCard item={item}/>
          );
        }}
        />
      </View>
      </View> 

    </View>

</ScreenWrapper>
 
  )
}