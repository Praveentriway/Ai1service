import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { NavigationContainer,getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {  createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './screens/Home';
import NewRequest from './screens/NewRequest';
import Login from './screens/Login';
import Completed from './screens/Completed';
import ActiveOrder from './screens/ActiveOrder';
import Profile from './screens/Profile'
import StaffList from './screens/StaffList'
import EditStaff from './screens/EditStaff'
import SplashScreen from 'react-native-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App({navigation}) {



      React.useEffect(()=>{
         SplashScreen.hide()
      },[])

      const getRouteName = ( route) =>{
        const routeName = getFocusedRouteNameFromRoute(route)
        console.log(routeName)
       if(routeName?.includes('Login')){
         return 'none'
       }
      
      return 'flex'
      }

      function getTabBarVisible(route) {
        const routeName = route.state
          ?  route.state.routes[route.state.index].name
          : route.params?.screen || 'homeScreen';

          console.log("qe",routeName)
          console.log("qe",route.params?.screen )
          console.log("qe",routeName)
          console.log("qe",routeName)
        if (routeName === 'Login') {
          return 'none';
        }
      
        return 'flex';
      }

      const HomeScreen =({navigation,route})=> {
     //   getTabBarVisible(route)
     console.log('route',getFocusedRouteNameFromRoute(route))
        return (
          <Stack.Navigator
          screenOptions={{
          headerShown: false
           }} 
           
          initialRouteName={Home}>
     {/*   <Stack.Screen
      name = "Login"
      component = {Login}
      options={{headerShown: false}}
      />
       */}
      <Stack.Screen
      name = "Home"
      component = {Home}
      />
     
     <Stack.Screen
      name = "StaffList"
      component = {StaffList}
      />

    <Stack.Screen
      name = "EditStaff"
      component = {EditStaff}
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
        )
   }

   const NewRequestScreen =()=> {
    return (
      <Stack.Navigator
      screenOptions={{
      headerShown: false
       }} 
       
      initialRouteName={NewRequest}>
  
  
 
  <Stack.Screen
      name = "NewRequest"
      component = {NewRequest}
      />
   <Stack.Screen
      name = "ActiveOrder"
      component = {ActiveOrder}
      />
       
       </Stack.Navigator>
    )
}


const TabNav = () =>{
  return(
    <Tab.Navigator
  
        initialRouteName="HomeScreen"
        
  

        screenOptions={{
          headerShown:false,
          tabBarInactiveTintColor:'#000',
          tabBarActiveTintColor:'#FFFFFF',
          tabBarStyle:{backgroundColor:'#2ea3f2',height:50},
          tabBarShowLabel:true
        }}

  
        >

<Tab.Screen
       name="ProfileScreen"
       component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
     
            tabBarIcon: ({ color, size }) => (
           
              <Feather name="user" color={color} size={size}/>
            ),
          }}
        />

         

         <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({route})=>(
            {
             
        
         /*       */
            tabBarLabel: 'Home',
         
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size}/>
     
            ),
          })}
        
        />    
      <Tab.Screen
        name="NewRequestScreen"
        component={NewRequestScreen}
      
          options={{
            tabBarLabel: 'New Request',
   
            tabBarIcon: ({ color, size }) => (
        <FontAwesome5 name="clipboard-check" color={color} size={size}/>
     
            ),
          }}
        />
      </Tab.Navigator>
     
  )
}


const ProfileScreen =()=> {
  return (
    <Stack.Navigator
    screenOptions={{
    headerShown: false
     }} 
     
    initialRouteName={NewRequest}>

{/* /* tabBarStyle:{display:getTabBarVisible(route),backgroundColor:'#2ea3f2',height:50}, */ }


    
<Stack.Screen
      name = "Profile"
      component = {Profile}
      />
    
     </Stack.Navigator>
  )
}


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
      {/*   */}
     <Stack.Screen
      name = "TabNav"
      component = {TabNav}
      />


  

     </Stack.Navigator> 

     
     {/* <Tab.Navigator
  
        initialRouteName="Login"
        
  

        screenOptions={{
          headerShown:false,
          tabBarInactiveTintColor:'#000',
          tabBarActiveTintColor:'#FFFFFF',
          tabBarStyle:{backgroundColor:'#2ea3f2',height:50},
          tabBarShowLabel:true
        }}

  
        >

<Tab.Screen options={{tabBarStyle:{display:'none'}}} name="Login" component={Login} />
           <Tab.Screen
          name="profileScreen"
          component={profileScreen}
          options={{
            tabBarLabel: 'Profle',
   
            tabBarIcon: ({ color, size }) => (
        <Feather name="message-square" color={color} size={size}/>
     
            ),
          }}
        />

         <Tab.Screen
          name="homeScreen"
          component={homeScreen}
          options={({route})=>(
            {
             
        
   
            tabBarLabel: 'Home',
         
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size}/>
     
            ),
          })}
        
        />    
        <Tab.Screen
          name="newRequestScreen"
          component={newRequestScreen}
          options={{
            tabBarLabel: 'Profile',
     
            tabBarIcon: ({ color, size }) => (
           
              <Feather name="user" color={color} size={size}/>
            ),
          }}
        />
      </Tab.Navigator>
      */}
    




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
