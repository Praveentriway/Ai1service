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

 import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
 import axios from 'axios';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import RestApiConstant from './RestApiConstant';
 const Completed = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
   const [userID, onChangeUserID] = React.useState()
   const [token, onChangeToken] = React.useState()
   const [loading, setLoading] = React.useState(false);
   const [lineItem,setLineItem] = React.useState([])
   
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  React.useEffect(()=>{
    //  console.log(route.params.data)
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    tokenKey()
    },[])


    const tokenKey = async() =>{

        
             
      await AsyncStorage.getItem('UserID').then((res)=>{
           console.log('res',res)
        
           onChangeUserID(res)
         
         }).catch((err)=>{
           console.log('errr')
          })
    
          await  AsyncStorage.getItem('TokenStrings').then((res)=>{
            console.log(res)
          var tok = res
          onChangeToken(res)
    
            AsyncStorage.getItem('UserID').then((r)=>{
              console.log('res',r)
              onChangeUserID(r)
            
              var d = {
                "tok":res,
                "user":r
              }
              getVendorOrder(res,r)
            }).catch((err)=>{
              console.log('errr')
             })
           
          }).catch((err)=>{
            console.log('err')
           })
       }


   


       const getVendorOrder = (res,r) =>{
        console.log("userID",r)
        console.log("token",res)
         setLoading(true)
          axios.interceptors.request.use(
            config=>{
              config.headers.Authorization = `Bearer ${res}`
              return config
            },
            error=>{
              return Promise.reject(error)
            }
          )
       1

            axios.get(`${RestApiConstant.BASE_URL}/wp-json/ai1service/v1/report/orders/staff/${r}?page_no=1&page_size=100`,{ headers: {"Authorization" : `Bearer ${res}`} })
            .then((res) => {
            //  console.log(res.data)
              setLoading(false)
              setLineItem(res.data)   
            }).catch((er)=>{
             console.log(er)
           })
         }


       const imagePicker =async () =>{
        const result = await launchImageLibrary(options)
       console.log(result)
        /* ImagePicker.showImagePicker(options, res => {

          console.log('Response = ', res);
    
          if (res.didCancel) {
    
            console.log('User cancelled image picker');
    
          } else if (res.error) {
    
            console.log('ImagePicker Error: ', res.error);
    
          } else if (res.customButton) {
    
            console.log('User tapped custom button: ', res.customButton);
    
            alert(res.customButton);
    
          } else {
    
            let source = res;
    
            console.log('User tapped custom button: ', res);
    
          }
    
        }); */
       }
         
         const modalList=(item)=>{
           var accept = ''
           var complete = ''
                if(item.accepted_date != null){
               /*    console.log(item.accepted_date) */
                 let p = item.accepted_date
                 accept = p.substring(0,10)
                 let c = item.completed_date
                 complete = c.substring(0,10) 
            
                }
              
                if(item.complete_date == null){
        /*           console.log("sd",item.complete_date) */
              /*    let c = item.completed_date
                 complete = c.substring(1,16) */
                }else{
                  let c = item.completed_date
                 complete = c.substring(1,16) 
                }
          
             return(
              <View style={{width:"100%",height:40,backgroundColor:'#CEECF5',marginTop:10,borderRadius:5,justifyContent:'space-around',alignContent:'center',flexDirection:'row'}}>
              <View style={{width:'10%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                 <Text style={{color:"#000",fontWeight:'500'}}>{item.id}</Text>
              </View>
              <View style={{width:'20%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                 <Text style={{color:"#000",fontWeight:'500'}}>{item.order_id}</Text>
              </View>
              <View style={{width:'30%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                 <Text style={{color:"#000",fontWeight:'500'}}>{accept}</Text>
              </View>
              <View style={{width:'30%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                 <Text style={{color:"#000",fontWeight:'500'}}>{complete}</Text>
              </View>
              </View>
             )
         }


     return(
         <View style={styles.container}>
   <StatusBar
      animated={true}
      backgroundColor="#2ea3f2"
       barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <View style={{backgroundColor:"#2ea3f2",borderBottomRightRadius:50}}>
       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:0,padding:20,width:'100%'}}>
            
             
         <View style={{flexDirection:'row',justifyContent:'space-between',width:"50%",alignItems:'center'}}>
           <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
         <Image source={require('../assets/left.png')} style={{height:22,width:22,padding:12}}/>
         </TouchableOpacity>
           {/*  <Image source={require('../assets/atoz.png')} style={{height:30,width:30,padding:10}}/> */}
            <Text style={{padding:1,fontWeight:'bold',fontSize:16,color:"#000",left:5}}>ORDER COMPLETED</Text>
            </View>
             
         <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',width:80}}  >
<TouchableOpacity style={{flexDirection:'row',width:60}} >

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



         <View style={{width:"100%",marginTop:20,padding:5,marginBottom:0}}>
         <View style={{width:"100%",height:30,backgroundColor:'#000',borderRadius:5,justifyContent:'space-around',alignContent:'center',flexDirection:'row'}}>
         <View style={{width:'10%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            <Text style={{color:"#fff",fontWeight:'bold'}}>S.No</Text>
         </View>
         <View style={{width:'20%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            <Text style={{color:"#fff",fontWeight:'bold'}}>Order ID</Text>
         </View>
         <View style={{width:'30%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            <Text style={{color:"#fff",fontWeight:'bold'}}>Accepted</Text>
         </View>
         <View style={{width:'30%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            <Text style={{color:"#fff",fontWeight:'bold'}}>Completed</Text>
         </View>
         </View>
        <ScrollView >
          <View style={{marginBottom:120,width:"100%"}}>
         <FlatList
       
        data={lineItem}
        keyExtractor={item => item.item_id+Math.random()} 
        renderItem={({ item,index }) => modalList(item)}
      />
      </View>
      </ScrollView>
         </View>


         <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
      /*   onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }} */
       
      >
           <View style={styles.centeredView}>
          <View style={styles.loads}>
          <Image source={require("../assets/laod.gif")} style={{height:"100%",width:"100%",padding:1,marginBottom:30}}/>
   {/*        <ActivityIndicator style={{justifyContent:"space-around",flexDirection:"row",marginBottom:20,marginTop:20}} animating={true} size="large" color="#2ea3f2" />
     */}   
     {/* <Text style={{color:'#2ea3f2',fontWeight:'bold'}}>Loading....</Text> */}
          </View>
    
        </View>
      </Modal>
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
  }
})

 export default Completed;