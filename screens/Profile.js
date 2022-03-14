/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';

 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,Image,TouchableOpacity,Modal,ActivityIndicator,FlatList,LogBox
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 import Ionicons from 'react-native-vector-icons/Ionicons'
 import Feather from 'react-native-vector-icons/Feather'
 import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
 import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
 import Home from './Home';
 
 import axios from 'axios';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import RestApiConstant from './RestApiConstant';
 const Completed = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return(
        <View style={styles.container}>
         <StatusBar
      animated={true}
      backgroundColor="#2ea3f2"
       barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <View style={{backgroundColor:"#2ea3f2"}}>
       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:0,padding:20,width:'100%'}}>
            
        
         <View style={{flexDirection:'row',justifyContent:'space-between',width:120,alignItems:'center'}}>
           <TouchableOpacity onPress={()=>{
             navigation.navigate('Home')
           }}>
         <Image source={require('../assets/left.png')} style={{height:23,width:23,padding:12}}/>
         </TouchableOpacity>
           {/*  <Image source={require('../assets/atoz.png')} style={{height:30,width:30,padding:10}}/> */}
            <Text style={{padding:10,fontWeight:'bold',fontSize:16,color:"#000"}}>PROFILE</Text>
            </View>
             
         <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',width:80}}  >
<TouchableOpacity style={{flexDirection:'row',width:60}} onPress={()=>
  {gotoMessage()
    asyncStorageSet() 
  }}>

{/* <Image source={require('../assets/bel.png')} style={{height:25,width:25,padding:10}}/>
<View style={{backgroundColor:Colors,color:"#fff",width:15,height:15,borderRadius:30,alignItems:'center',right:12}}>
    <Text style={{color:"#fff",fontSize:11}}>{count}</Text>
    </View> */}
</TouchableOpacity>
    

<TouchableOpacity style={{flexDirection:'row',width:60}} onPress={()=>
  {logoutAlert()
     
  }}>
     {/*    <Image source={require('../assets/refresh.png')} style={{height:25,width:25,padding:10}}/> */}
        </TouchableOpacity>
        
         </TouchableOpacity>
         </View>
        
      
         </View>


         <View style={{height:'20%',width:'100%',backgroundColor:'#2ea3f2',alignContent:'center',justifyContent:'center',alignItems:'center'}}>

         <View style={[styles.cardview,{height:'100%',width:'80%',backgroundColor:'#FFFFFF',borderRadius:10,marginBottom:-80}]}>
            <Image source={require('../assets/girl.png')} style={{height:70,width:70,marginBottom:10}}/>
              <Text style={{fontWeight:'bold',color:'#000'}}>Praveen Kumar</Text>
              <Text style={{color:'#2ea3f2'}}>@praveen@gmail.com</Text>
        </View>
         </View>
            <View style={{width:'100%',marginTop:100,alignItems:'center'}}>
               <View style={{width:'70%',flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'space-around'}}>
        
               <View style={{width:50,height:50,right:0,backgroundColor:'#2ea3f2',borderRadius:50,alignItems:'center',justifyContent:'center'}}>
             
               <Ionicons name="home-outline" color={"#FFFFFF"} size={22}/>
               </View>
               <View style={{width:'50%',right:10}}>
               <Text style={{fontWeight:'bold',fontSize:20,color:'#000'}}>Dashboard</Text>
               </View>
             
               </View>

                <View style={{width:'70%',flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'space-around',marginTop:30}}>
        
               <View style={{width:50,height:50,right:0,backgroundColor:'#2ea3f2',borderRadius:50,alignItems:'center',justifyContent:'center'}}>
             
               <Feather name="settings" color={"#FFFFFF"} size={22}/>
               </View>
               <View style={{width:'50%',right:10}}>
               <Text style={{fontWeight:'bold',fontSize:20,color:'#000'}}>Settings</Text>
               </View>
             
               </View>
               <View style={{width:'70%',flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'space-around',marginTop:30}}>
        
               <View style={{width:50,height:50,right:0,backgroundColor:'#2ea3f2',borderRadius:50,alignItems:'center',justifyContent:'center'}}>
             
               <Feather name="smartphone" color={"#FFFFFF"} size={22}/>
               </View>
               <View style={{width:'50%',right:10}}>
               <Text style={{fontWeight:'bold',fontSize:20,color:'#000'}}>About Us</Text>
               </View>
             
               </View>

                <View style={{width:'70%',flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'space-around',marginTop:30}}>
        
               <View style={{width:50,height:50,right:0,backgroundColor:'#2ea3f2',borderRadius:50,alignItems:'center',justifyContent:'center'}}>
             
               <Feather name="log-out" color={"#FFFFFF"} size={22}/>
               </View>
               <View style={{width:'50%',right:10}}>
               <Text style={{fontWeight:'bold',fontSize:20,color:'#000'}}>Logout</Text>
               </View>
             
               </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#FFFFFF',

 },
 centeredView: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   marginTop: 22,
   
   
 },
 loads: {
   margin: 0,
   width:'60%',
   height:"20%",
   backgroundColor:'#F0F8FF',
   borderRadius: 10,
   padding: 0,
  /*  alignItems: "center", */
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 2
   },
   shadowOpacity: 0.25,
   shadowRadius: 4,
   elevation: 5,padding:0,alignItems:'center',justifyContent:'center'
 },
 cardview:{
  height: 120,
  width:120,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.white,
  shadowColor: "#2ea3f2",
  borderColor:"#2ea3f2",
  borderWidth:0.5,
  shadowOpacity: 2,
  shadowRadius: 8,
  elevation: 8,
  paddingLeft: 16,
  paddingRight: 14,
  marginTop: 6,
  marginBottom: 6,
  marginLeft: 16,
  marginRight: 16,
  borderRadius:5
 }
})

export default Completed;