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
   View,Image,TouchableOpacity,Modal,ActivityIndicator,
   BackHandler,TouchableWithoutFeedback ,LogBox,Animated,ImageBackground
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 import axios from 'axios';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import RestApiConstant from './RestApiConstant';
 const Home = ({navigation}) => {
   const isDarkMode = useColorScheme() === 'dark';
   const [count, onChangeCount] = React.useState('')
   const [New,onNew] = React.useState(0)
   const [Active,onActive] = React.useState(0)
   const [Complete,onComplete] = React.useState(0)
   const [Message,onMessage] = React.useState(0)
   const [logout,onLogout] = React.useState(false)
   const [modalVisible, setModalVisible] = React.useState(false);
   const [bar, onChangeBar] = React.useState(false)
   const [touchOut, onTouchOut] = React.useState(false)
   const isFocused = useIsFocused();
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
   const [userID, onChangeUserID] = React.useState()
   const [token, onChangeToken] = React.useState()
   const startValue = new Animated.Value(0);
   const endValue = 20;
   const duration = 500;

   React.useEffect(()=>{


    LogBox.ignoreLogs(['new NativeEventEmitter']); 
    tokenKey()
  
  },[isFocused])


  React.useEffect(() => {
    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [startValue, endValue, duration]);

  const tokenKey = async() =>{

             
             
    await  AsyncStorage.getItem('UserID').then((res)=>{
         console.log(res)
       
    
       
       }).catch((err)=>{
         console.log('err')
        })

        await  AsyncStorage.getItem('TokenStrings').then((res)=>{
          console.log(res)
        var tok = res
        onChangeToken(res)
        AsyncStorage.getItem('UserID').then((r)=>{
          console.log(r)
          textTocken(res)
          onChangeUserID(r)
          getDashboardCount(res,r)
     
          
        }).catch((err)=>{
          console.log('err')
         })
    
        
       //   getDashboardCount(res)
        }).catch((err)=>{
          console.log('err')
         })
     }

   const textTocken = (res) =>{
    const header = `Authorization: Bearer ${res}`;
    const AuthStr = 'Bearer '.concat(res); 

      var ordersid = 26
      axios.interceptors.request.use(
        config=>{
          config.headers.Authorization = `Bearer ${res}`
          return config
        },
        error=>{
          return Promise.reject(error)
        }
      )
    axios.post(`${RestApiConstant.BASE_URL}/wp-json/jwt-auth/v1/token/validate`)
    .then((res) => {
     console.log("asdad",res.data.success)
     }).catch((er)=>{
      console.log(er)
    })
  }

   const getDashboardCount = (res,r) =>{
    setModalVisible(true)
    axios.interceptors.request.use(
      config=>{
        config.headers.Authorization = `Bearer ${res}`
        return config
      },
      error=>{
        return Promise.reject(error)
      }
    )
  //  ${RestApiConstant.LOCAL_URL}/ai1service
      axios.get(`${RestApiConstant.BASE_URL}/wp-json/ai1service/v1/dashboard/staff/${r}/count`,{ headers: {"Authorization" : `Bearer ${res}`} })
      .then((res) => {
        console.log(res.data)
        setModalVisible(false)
        onNew(res.data.new_orders)
        onComplete(res.data.completed_orders)
        onActive(res.data.work_in_progress)
        onMessage(res.data.messages)
       
       
      }).catch((er)=>{
        setModalVisible(false)
       console.log(er)
     })
   }

   const logoutFun = () =>{
     AsyncStorage.clear()
     onLogout(!logout)
     BackHandler.exitApp()
   }

 
  
   return (
     <SafeAreaView style={styles.container}>
         <StatusBar
      animated={true}
      backgroundColor="#2ea3f2"
       barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <View style={{backgroundColor:"#2ea3f2",borderBottomRightRadius:50}}>
       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:0,padding:25,width:'100%'}}>
            
             
         <View style={{flexDirection:'row',justifyContent:'space-between',width:120,alignItems:'center'}}>
         <Image source={require('../assets/ai1_logo.png')} style={{height:25,width:25,padding:12,borderRadius:2}}/>
           {/* "#04B4AE"  <Image source={require('../assets/atoz.png')} style={{height:30,width:30,padding:10}}/> */}
            <Text style={{padding:10,fontWeight:'bold',fontSize:16,color:"#000"}}>DASHBOARD</Text>
            </View>
             
         <View style={{flexDirection:'row',justifyContent:'space-between',width:80}}  >
<TouchableOpacity onPress={()=>{getDashboardCount(token,userID)}} style={{flexDirection:'row',width:60}}>

<Image source={require('../assets/refresh.png')} style={{height:27,width:27,padding:10}}/>
{/* <View style={{backgroundColor:Colors,color:"#fff",width:15,height:15,borderRadius:30,alignItems:'center',right:12}}>
    <Text style={{color:"#fff",fontSize:11}}>{count}</Text>
    </View> */}
</TouchableOpacity>
    

<TouchableOpacity style={{flexDirection:'row',width:60}} onPress={()=>
  {onLogout(!logout)
     
  }}>
        <Image source={require('../assets/logout.png')} style={{height:18,width:18,padding:10}}/>
        </TouchableOpacity>
        
         </View>
         </View>
         <View style={{padding:10,alignItems:'center'}}>
            <View >
          {/*   <ImageBackground source={require('../assets/bc1.jpg')} style={{height:100,width:'90%'}}>

            </ImageBackground> */}
            <Animated.View  style={[{transform: [{translateX: startValue }]},{right:20,height:100,width:"90%",backgroundColor:"#fff",borderRadius:10,marginBottom:20,justifyContent:"space-around",flexDirection:"row",marginBottom:20,alignContent:'center',alignItems:'center'}]}>
           
      
           <View  style={{justifyContent:"space-around",flexDirection:"column",marginBottom:0,alignContent:'center',alignItems:'center'}}>

        
          <Text style={{color:"#0B0B3B",fontWeight:'bold',fontSize:24}}>{New}</Text>
          <Text  style={{color:'#000',fontWeight:'500',fontSize:14}}>New Request</Text>
          </View>

          <View style={{height:40,width:2,backgroundColor:"#2ea3f2"}}></View>
            
          <View  style={{justifyContent:"space-around",flexDirection:"column",marginBottom:0,alignContent:'center',alignItems:'center'}}>

        
        <Text style={{color:"#B40404",fontWeight:'bold',fontSize:24}}>{Active}</Text>
        <Text  style={{color:'#000',fontWeight:'500',fontSize:14}}>Active Order</Text>
         </View>
         <View style={{height:40,width:2,backgroundColor:"#2ea3f2"}}></View>
      <View  style={{justifyContent:"space-around",flexDirection:"column",marginBottom:0,alignContent:'center',alignItems:'center'}}>

        
          <Text style={{color:"#088A08",fontWeight:'bold',fontSize:24}}>{Complete}</Text>
          <Text  style={{color:'#000',fontWeight:'500',fontSize:14}}>Completed</Text>
          </View>
       
 </Animated.View>
 
            </View>
         </View>
         
      <View  style={{justifyContent:"space-around",flexDirection:"row",marginBottom:10}}>
      
            <Text  style={{color:'#FFFFFF',fontWeight:'bold',fontSize:16}}>{/* 10/02/2022 */}</Text>
            
             <View  style={{justifyContent:"space-around",flexDirection:"column",marginBottom:0}}>
      
            <Text  style={{color:'#FFFFFF',fontWeight:'bold',fontSize:16}}>{/* Monday */}</Text>
             <Text style={{color:"#FFFFFF",fontSize:10}}>{/* 11:30AM */}</Text>
       </View>
       </View>
         </View>
         
         <View style={{flex:0,marginBottom:0,width:'100%',flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:50}}>
          <TouchableOpacity onPress={()=>{navigation.navigate('NewRequest',{data:"New"})}} style={styles.cardview}>
          <View  style={{justifyContent:"space-around",flexDirection:"column",marginBottom:0,alignContent:'center',alignItems:'center'}}>
          <View style={{backgroundColor:"#fff",color:"#fff",width:30,height:30,borderRadius:30,borderColor:"#04B4AE",borderWidth:2,alignItems:'center',right:40,bottom:1}}>
           <Text style={{color:"#000",fontSize:18,fontWeight:'bold'}}>{New}</Text>
          </View>
          {/* <Image source={require('../assets/order.png')} style={{height:50,width:50,padding:12}}/> */}
          <Animated.Image source={require('../assets/order.png')} style={[{transform: [{translateX: startValue }]},{height:50,width:50,padding:0,right:20}]}/>

          <Text  style={{color:'#000',fontWeight:'bold',fontSize:14}}>New Order</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('ActiveOrder')}} style={styles.cardview}>
          <View style={{backgroundColor:"#fff",color:"#fff",width:30,height:30,borderRadius:30,borderColor:"#B40404",borderWidth:2,alignItems:'center',right:40,bottom:1}}>
          <Text style={{color:"#000",fontSize:18,fontWeight:'bold'}}>{Active}</Text>
          </View>
          <View  style={{justifyContent:"space-around",flexDirection:"column",marginBottom:0,alignContent:'center',alignItems:'center'}}>
         {/*  <Image source={require('../assets/active.png')} style={{height:50,width:50,padding:12}}/> */}
         <Animated.Image source={require('../assets/active.png')} style={[{transform: [{translateX: startValue }]},{height:50,width:50,padding:0,right:20}]}/>

          <Text  style={{color:'#000',fontWeight:'bold',fontSize:14}}>Active Order</Text>
          </View>
          </TouchableOpacity>
         </View>

         <View style={{flex:0,marginBottom:0,width:'100%',flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:50}}>
         <TouchableOpacity onPress={()=>{navigation.navigate('Completed')}} style={styles.cardview}>
         <View style={{backgroundColor:"#fff",color:"#fff",width:30,height:30,borderRadius:30,borderColor:"#088A08",borderWidth:2,alignItems:'center',right:40,bottom:1}}>
          <Text style={{color:"#000",fontSize:18,fontWeight:'bold'}}>{Complete}</Text>
          </View>
          <View  style={{justifyContent:"space-around",flexDirection:"column",marginBottom:0,alignContent:'center',alignItems:'center'}}>
          {/* <Image source={require('../assets/comp.png')} style={{height:50,width:50,padding:12}}/> */}
          <Animated.Image source={require('../assets/comp.png')} style={[{transform: [{translateX: startValue }]},{height:50,width:50,padding:0,right:20}]}/>

          <Text  style={{color:'#000',fontWeight:'bold',fontSize:14}}>Completed</Text>
          </View>
          </TouchableOpacity>
          <View style={styles.cardview}>
          <View style={{backgroundColor:"#fff",color:"#fff",width:30,height:30,borderRadius:30,borderColor:"#0B0B61",borderWidth:2,alignItems:'center',right:40,bottom:1}}>
          <Text style={{color:"#000",fontSize:18,fontWeight:'bold'}}>{Message}</Text>
          </View>
          <View  style={{justifyContent:"space-around",flexDirection:"column",marginBottom:0,alignContent:'center',alignItems:'center'}}>
        {/*   <Image source={require('../assets/message.png')} style={{height:50,width:50,padding:12}}/> */}
        <Animated.Image source={require('../assets/message.png')} style={[{transform: [{translateX: startValue }]},{height:50,width:50,padding:0,right:20}]}/>

          <Text  style={{color:'#000',fontWeight:'bold',fontSize:14}}>Message</Text>
          </View>
          </View>
         </View>
      
         <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      /*   onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }} */
       
      >
           <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <ActivityIndicator style={{justifyContent:"space-around",flexDirection:"row",marginBottom:20,marginTop:20}} animating={true} size="large" color="#04B4AE" />
        <Text style={{color:"#2ea3f2",fontWeight:'bold'}}>Loading....</Text>
          </View>
    
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={logout}
      /*   onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }} */
       
      >
           <View style={styles.centeredView}>
          <View style={styles.Msg}>
          <Image source={require('../assets/lgt.png')} style={{height:70,width:70,padding:1,marginBottom:30}}/>
        <Text style={{color:'#000',fontWeight:'bold',fontSize:14,marginBottom:10}}>Are you sure you want to logout?</Text>
       
        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
    <TouchableOpacity
              style={{width:'50%',height:30,alignItems:'center',justifyContent:'center'}}
              onPress={() =>
                 {
                  onLogout(!logout)}
            }>
              <Text style={{fontSize:14}}>Cancel</Text>
            </TouchableOpacity>
    <TouchableOpacity
              style={{width:"50%",height:30,
              alignItems:'center',justifyContent:'center'}}
              onPress={() =>
                 {/*  uploadSignFile(token,userID) */
                  logoutFun()
                }
            }>
              <Text style={{color:'#000',fontWeight:'bold'}}>Exit</Text>
            </TouchableOpacity>
           </View>
          </View>
    
        </View>
      </Modal>
 
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
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
   },
   modalView: {
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
   centeredView: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     marginTop: 22,
     
     
   },
   Msg: {
     margin: 0,
     width:'80%',
     height:"30%",
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
   }
 });
 
 export default Home;
 