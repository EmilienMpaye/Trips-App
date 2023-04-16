import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Platform } from 'react-native/Libraries/Utilities/Platform'

export default function ScreenWrapper({children}) {
    let statusBarHeight=StatusBar.currentHeight;
  return (
    <View style={{paddingTop: statusBarHeight}}>
      {
        children
      }
    </View>
  );
}