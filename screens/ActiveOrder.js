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
 
 import axios from 'axios';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import SignaturePad from 'react-native-signature-pad-v2';
 import RNFS from 'react-native-fs';
 import RestApiConstant from './RestApiConstant';
 const ActiveOrder = ({navigation}) => {


   const isDarkMode = useColorScheme() === 'dark';
   const [userID, onChangeUserID] = React.useState()
   const [Pass, onChangePass] = React.useState('');
   const [token, onChangeToken] = React.useState()
   const [loading, setLoading] = React.useState(false);
   const [lineItem,setLineItem] = React.useState([])
   const [modalVisible, setModalVisible] = React.useState(false);
   const [signPad, setSignPad] = React.useState(false);
   const [selected,onSelected] = React.useState([])
   const [signUri,onSignUri] = React.useState()
   
   const [Message, setMessage] = React.useState(false);
   const [assImg,setAssImg] = React.useState()
   const [assMess,setAssMess] = React.useState()
   const [pay,setPay] = React.useState()



  React.useEffect(()=>{
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    //  console.log(route.params.data)
    tokenKey()
    },[])

  const _signaturePadError = (error) => {
    console.error(error);
  };

const _signaturePadChange = ({base64DataUrl}) => {
  /*   console.log("Got new signature: " + base64DataUrl.replace("data:image/png;base64,",""));
    console.log("Got new signature: " + base64DataUrl);
    const imageData =base64DataUrl.replace("data:image/png;base64,","");
    const imagePath = `${RNFS.ExternalDirectoryPath}/${Math.random().toString(36).substring(7)}image.jpg`;
          onSel(imagePath)
    RNFS.writeFile(imagePath, imageData, 'base64')
    .then(() => {console.log('Image converted to jpg and saved at ' + 'file://'+imagePath),

      onSignUri('file://'+imagePath)

}
    ); */
  
    onChangePass(base64DataUrl)
  };




    const tokenKey = async() =>{

        
             
  /*     await AsyncStorage.getItem('UserID').then((res)=>{
           console.log('res',res)
        
           onChangeUserID(res)
         
         }).catch((err)=>{
           console.log('errr')
          }) */
    
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
       

            axios.get(`${RestApiConstant.BASE_URL}/wp-json/ai1service/v1/wip/staff/${r}`,{ headers: { "Authorization" : `Bearer ${res}`} })
            .then((res) => {
              console.log(res.data)
              setLoading(false)
              setLineItem(res.data)   
            }).catch((er)=>{
             console.log(er)
           })
         }

    



         const selectedItems=(item)=>{
                onSelected(item)
                console.log(item)
                setModalVisible(!modalVisible)
         }

         
         const completeOrder = () =>{
              setLoading(!loading)
                      axios.interceptors.request.use(
                config=>{
                  config.headers.Authorization = `Bearer ${token}`               
                  return config
                },
                error=>{
                  return Promise.reject(error)
                }
              ) 


                axios.post(`${RestApiConstant.BASE_URL}/wp-json/ai1service/v1/vendor-orders/${selected.order_id}/complete/${userID}?payment_mode=cash&payment_details=&payment_key=&item_id=${selected.item_id}&media_id=0&media_type=&mime_type=&media_url=`,
                { headers: {'Content-Type':'image/jpeg','Content-Disposition':'i6f589image.jpg',"Authorization" : `Bearer ${token}`} })
                .then((res) => {
                    setLoading(!loading)
                  console.log("AAAAAA",res)
                  setSignPad(!signPad)
                  var ct = 1
                  showMessage(ct)          
                }).catch((er)=>{
                    setLoading(!loading)
                    setSignPad(!signPad)
                    var ct = 1
                  showMessage(ct)  
                 console.log(er)
               })
                }

                const showMessage =(res)=>{
                    if(res == 1){
                      setAssImg(require('../assets/assign.png'))
                      setAssMess("Order completed successfully")
                   setMessage(!Message)
                    }else{
                      setAssImg(require('../assets/notassign.png'))
                      setAssMess("somthing went wrong")
                      setMessage(!Message)
                    }
               }

               const setMessageFun = () =>{
                setMessage(!Message)
                getVendorOrder(token,userID)
               }

         const modalList=(item,index)=>{
           var accept = ''
           var acceptedtime = ''
           var complete = ''
           setPay(item)
                if(item.accepted_date != null){
                  console.log(item.accepted_date)
                 let p = item.accepted_date
                 accept = p.substring(0,10)
                 acceptedtime = p.substring(11,19)
            
                }
              
                if(item.complete_date == null){
                  console.log("sd",item.complete_date)
              /*    let c = item.completed_date

                 complete = c.substring(1,16) */
                }else{
                  let c = item.completed_date
                 complete = c.substring(1,16) 
                }

          
             return(
          

              <View style={styles.cardview} >
      <View style={{flexDirection:'row',justifyContent:'space-around',width:"100%",alignItems:'center'}}>
        <View style={{width:"30%",height:90,alignItems:'center',backgroundColor:'#fff',borderRadius:50,alignContent:'center',justifyContent:'center'}}>
        <Image source={/* IMAGES['image' + item.image] */require('../assets/girl.png')} style={{height:70,width:70,padding:1}}/>
        </View>
         <View style={{width:"40%",height:'90%',flexDirection:'column',alignContent:'center'}}>
         <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:"#2ea3f2"}}>{item.order_id}</Text>
     
         <Text style={{padding:3,fontWeight:'bold',fontSize:12,color:"#000"}}>{item.name}</Text>
         <Text style={{padding:3,fontWeight:'400',fontSize:10,color:"#000"}}>Accepted Date :</Text>
         <Text style={{padding:3,fontWeight:'bold',fontSize:12,color:"#000"}}>{accept}</Text>
         </View>
         <View style={{width:"30%",height:'100%',alignContent:'center',flexDirection:'column',padding:5}}>
         <View style={{width:"100%",height:'50%',alignContent:'center',flexDirection:'row',padding:5}}>
            
            <Image source={require('../assets/clock.png')} style={{height:15,width:15,padding:1}}/>
            <Text style={{padding:0,fontWeight:'bold',fontSize:12,color:"#000"}}>{acceptedtime}</Text>
   
            </View>
            <TouchableOpacity onPress={()=>{selectedItems(item)}} style={{backgroundColor:'#000',borderRadius:15,alignItems:'center',justifyContent:'center',padding:5}}>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:11}}>Mark As Complete</Text>
            </TouchableOpacity>
         </View>
      
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
            <Text style={{padding:1,fontWeight:'bold',fontSize:16,color:"#000",left:5}}>ACTIVE ORDER</Text>
            </View>
             
         <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',width:80}}  >
<TouchableOpacity style={{flexDirection:'row',width:60}}>

{/* <Image source={require('../assets/bel.png')} style={{height:25,width:25,padding:10}}/>
<View style={{backgroundColor:Colors,color:"#fff",width:15,height:15,borderRadius:30,alignItems:'center',right:12}}>
    <Text style={{color:"#fff",fontSize:11}}>{count}</Text>
    </View> */}
</TouchableOpacity>
    

<TouchableOpacity style={{flexDirection:'row',width:60}}>
     {/*    <Image source={require('../assets/refresh.png')} style={{height:25,width:25,padding:10}}/> */}
        </TouchableOpacity>
        
         </TouchableOpacity>
         </View>
        
      
         </View>



         <View style={{width:"100%",marginTop:20,padding:5,marginBottom:0}}>
          
          <View style={{marginBottom:60}}>
         <FlatList
       
        data={lineItem}
        keyExtractor={item => item.item_id} 
        renderItem={({ item,index }) => modalList(item,index)}
      />
      </View>
   
         </View>


                  
         <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
       
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <View style={{backgroundColor:'#2ea3f2',marginBottom:20,borderRadius:10,borderBottomRightRadius:0,alignItems:'center'
          ,borderBottomLeftRadius:0,padding:15}}>
            <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:'#FFFFFF'}}>{selected.order_id}</Text>
            </View>    
      
     


<View style={{alignItems:'center',alignContent:'center',width:'100%'}}>

           </View>



        
            <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:'#2ea3f2',padding:10}}>Order Details</Text> 
            <View style={{width:'100%',alignItems:'center'}}>
            <View style={{width:'90%',borderColor:'#2ea3f2',borderWidth:1,borderRadius:10}}>
            <View style={{width:'100%',flexDirection:'row'}}>
            <View style={{width:"50%",alignItems:'flex-start'}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Order Name:</Text> 
                </View>
                <View style={{width:"50%",alignItems:'flex-start'}}>
          <Text style={{fontWeight:'500',fontSize:14,color:'#000',padding:10}}>{selected.name}</Text> 
          </View>
           
            </View>
            <View style={{width:'100%',flexDirection:'row'}}>
            <View style={{width:"50%",alignItems:'flex-start'}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Order Accepted:</Text> 
                </View>
                <View style={{width:"50%",alignItems:'flex-start'}}>
          <Text style={{fontWeight:'500',fontSize:14,color:'#000',padding:10}}>{selected.accepted_date}</Text> 
          </View>
           
            </View>
           
           
            </View>
         
            </View>
            <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:'#2ea3f2',padding:10}}>Payment</Text> 
           
            <View style={{width:'100%',alignItems:'center'}}>
            <View style={{width:'90%',borderColor:'#2ea3f2',borderWidth:1,borderRadius:10}}>
                
            <View style={{width:'100%',flexDirection:'row'}}>
            <View style={{width:"50%",alignItems:'flex-start'}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Payment:</Text> 
                </View>
                <View style={{width:"50%",alignItems:'flex-start'}}>
          <Text style={{fontWeight:'500',fontSize:14,color:'#000',padding:10}}>Cash</Text> 
          </View>
           
            </View>
           
            </View>
         
            </View>

            <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:'#2ea3f2',padding:10}}>Total Price</Text> 
           
            <View style={{width:'100%',alignItems:'center'}}>
            <View style={{width:'90%',borderColor:'#2ea3f2',borderWidth:1,borderRadius:10}}>
                
            <View style={{width:'100%',flexDirection:'row'}}>
            <View style={{width:"50%",alignItems:'flex-start'}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Price:</Text> 
                </View>
                <View style={{width:"50%",alignItems:'flex-start'}}>
          <Text style={{fontWeight:'500',fontSize:14,color:'#000',padding:10}}>{selected.total}</Text> 
          </View>
           
            </View>
           
            </View>
         
            </View>
          <View>

   
    <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:30,padding:10,height:"15%",marginBottom:30}}>
    <TouchableOpacity
              style={{borderRadius:15,borderColor:'#000',borderWidth:1,width:100,height:35,alignItems:'center',justifyContent:'center'}}
              onPress={() =>
                 {
                  setModalVisible(!modalVisible)}
            }>
              <Text style={{color:'#000'}}>CANCEL</Text>
            </TouchableOpacity>
    <TouchableOpacity
              style={{borderRadius:15,backgroundColor:'#2ea3f2',width:100,height:35,
              alignItems:'center',justifyContent:'center'}}
              onPress={() =>
                 {setModalVisible(!modalVisible),
                    setSignPad(!signPad)
                }
            }>
              <Text style={{color:'#FFFFFF',fontWeight:'bold'}}>COLLECT</Text>
            </TouchableOpacity>
           </View>
          </View>
         
         </View>
        </View>
      </Modal>


                  
      <Modal
        animationType="fade"
        transparent={true}
        visible={signPad}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setSignPad(!signPad);
        }}
       
      >
        <View style={styles.centeredView}>
          <View style={styles.signView}>
            
            <View style={{backgroundColor:'#2ea3f2',marginBottom:20,borderRadius:10,borderBottomRightRadius:0,alignItems:'center'
          ,borderBottomLeftRadius:0,padding:15}}>
            <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:'#FFFFFF'}}>PAID</Text>
            </View>    
      
     

            <View style={{height:180, color:"#000000" ,borderWidth:1,borderColor:'#000'}}>
       
                    <SignaturePad style={{height:180, color:"#000000" ,padding:5 }} dotSize={2} onError={_signaturePadError}
                        onChange={_signaturePadChange}
                        style={{flex: 1, backgroundColor: 'white'}}/>
            </View>
          
          <View>

   
    <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:30,padding:10,height:"15%",marginBottom:30}}>
    <TouchableOpacity
              style={{borderRadius:15,borderColor:'#000',borderWidth:1,width:100,height:35,alignItems:'center',justifyContent:'center'}}
              onPress={() =>
                 {
                  setSignPad(!signPad)}
            }>
              <Text style={{color:'#000'}}>CANCEL</Text>
            </TouchableOpacity>
    <TouchableOpacity
              style={{borderRadius:15,backgroundColor:'#2ea3f2',width:100,height:35,
              alignItems:'center',justifyContent:'center'}}
              onPress={() =>
                 {/*  uploadSignFile(token,userID) */
                    completeOrder()
                }
            }>
              <Text style={{color:'#FFFFFF',fontWeight:'bold'}}>Complete</Text>
            </TouchableOpacity>
           </View>
          </View>
         
         </View>
        </View>
      </Modal>



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
          <ActivityIndicator style={{justifyContent:"space-around",flexDirection:"row",marginBottom:20,marginTop:20}} animating={true} size="large" color="#2ea3f2" />
        <Text style={{color:'#2ea3f2',fontWeight:'bold'}}>Loading....</Text>
          </View>
    
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={Message}
      /*   onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }} */
       
      >
           <View style={styles.centeredView}>
          <View style={styles.Msg}>
          <Image source={assImg} style={{height:70,width:70,padding:1,marginBottom:30}}/>
        <Text style={{color:'#000',fontWeight:'bold',fontSize:14,marginBottom:10}}>{assMess}</Text>
        <TouchableOpacity onPress={()=>{setMessageFun()}} style={{width:'100%',alignItems:'flex-end',justifyContent:'space-around',padding:10,right:10}}>
        <Text style={{color:'#2ea3f2',fontWeight:'bold',fontSize:16,}}>Close</Text>
        </TouchableOpacity>
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
  },
  cardview:{
   height: 100,
   width:'100%',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: Colors.white,
   shadowColor: "#2ea3f2",
   borderColor:"#2ea3f2",
   borderWidth:0.5,
   shadowOpacity: 2,
   shadowRadius: 18,
   elevation: 8,
   /* paddingLeft: 16,
   paddingRight: 14, */
   marginTop: 6,
   marginBottom: 6,
/*     marginLeft: 16,
   marginRight: 16, */
   borderRadius:5
  },
  modalView: {
    margin: 0,
    width:'90%',
    height:"60%",
    backgroundColor:'#F0F8FF',
    borderRadius: 20,
    padding: 0,
   /*  alignItems: "center", */
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,padding:0
  },
  signView: {
    margin: 0,
    width:'90%',
    height:"50%",
    backgroundColor:'#F0F8FF',
    borderRadius: 20,
    padding: 0,
   /*  alignItems: "center", */
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,padding:0
  } ,
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
})

 export default ActiveOrder;