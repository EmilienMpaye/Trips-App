import { View, Text ,Image,TextInput,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from "@react-navigation/native";
import { categories } from '../constants'
import { addDoc } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'
import { async } from '@firebase/util'
import Loading from '../components/loading'

export default function AddTripScreen(props) {
  let {id}=props.route.params;
    const [title,setTitle]=useState('');
    const [amount,setAmounty]=useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const handleAddExpense =async ()=>{
        if(title && amount && category){
            //good to go
            //navigation.goBack();
            setLoading(true);
            let doc = await addDoc(expensesRef,{
              title,
              amount,
              category,
              tripId :id
            })
            setLoading(false);
            if(doc && doc.id) navigation.goBack();
        }else{
            //show error
        }
    }
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View >
            <View className="relative mt-6">
            <View className="absolute top-0 left-0">
            <BackButton/>
            </View>
            <Text className={`${colors.heading}text-xl font-bold text-center text-green-600`}>Add Expense</Text>
            </View>
      
      <View className="flex-row justify-center my-3 mt-5">
       <Image className="h-40 w-47" source={require('../assets/expense.jpg')}/>
        </View>
        <View className="space-y-2 mx-2">
      <Text className={`${colors.heading} text-lg font-bold`}>For What?</Text>
      <TextInput value={title} onChangeText={value=> setTitle(value)} className="p-3 bg-white rounded-full mb-2"/>
      <Text className={`${colors.heading} text-lg font-bold`}>How Much?</Text>
      <TextInput value={amount} onChangeText={value=> setAmounty(value)} className="p-3 bg-white rounded-full mb-2"/>
       </View>
       <View className="mx-2 space-x-2"> 
        <Text className="text-lg font-bold">category</Text>
        <View className="flex-row flex-wrap items-center">
        {
          categories.map(cat=>{
            let bgColor = 'bg-white';
            if(cat.value==category) bgColor = 'bg-green-300'
            return(
              <TouchableOpacity onPress={()=>setCategory(cat.value)} key={cat.value} 
              className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`}>
                <Text>{cat.title}</Text>
              </TouchableOpacity>
            )
          })
        }
        </View>
       </View>
      </View>
     <View>
     {
        loading?(
          <Loading/>
        ):(
          <TouchableOpacity onPress={handleAddExpense} style={{backgroundColor:colors.button}} className="my-5 rounded-full p-2 shadow-sm justify-between items-center">
    <Text className="text-lg text-yellow-300 font-bold">Add Expense</Text>
       </TouchableOpacity>
        )
      }
     </View>
     </View>
    </ScreenWrapper>
  )
}