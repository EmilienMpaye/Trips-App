import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import {colors} from '../theme'
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.goBack()} className=" text-lg rounded-full h-4 w-10">
      <ChevronLeftIcon size="20" color={colors.button}/>
    </TouchableOpacity>
  )
}