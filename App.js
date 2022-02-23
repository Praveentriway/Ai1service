import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {  createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './screens/Home';
import NewRequest from './screens/NewRequest';
import Login from './screens/Login';
import Completed from './screens/Completed';
import ActiveOrder from './screens/ActiveOrder';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();



export default function App({navigation}) {

      React.useEffect(()=>{
         SplashScreen.hide()
      },[])

  return (
   <NavigationContainer>

 
   <Stack.Navigator
    screenOptions={{
    headerShown: false
     }} 

    initialRouteName={Login}>
        <Stack.Screen
      name = "Login"
      component = {Login}
      />
         <Stack.Screen
      name = "Home"
      component = {Home}
      />
     

<Stack.Screen
      name = "Completed"
      component = {Completed}
      />
    
      <Stack.Screen
      name = "ActiveOrder"
      component = {ActiveOrder}
      />
    


 <Stack.Screen
      name = "NewRequest"
      component = {NewRequest}
      />


     </Stack.Navigator> 

   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
