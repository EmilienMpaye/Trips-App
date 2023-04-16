import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

import AddExpenseScreen from '../screens/AddExpenseScreen';
import AddTripScreen from '../screens/AddTripScreen';
import HomeScreen from '../screens/HomeScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useSelector(state=>state.user);

    return (
      
      <NavigationContainer >
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
      <Stack.Screen options={{headerShown:false}} name="AddExpense" component={AddExpenseScreen}/>
      <Stack.Screen options={{headerShown:false}} name="AddTrip" component={AddTripScreen}/>
      <Stack.Screen options={{headerShown:false}} name="TripExpenses" component={TripExpensesScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  
  );
  }
   