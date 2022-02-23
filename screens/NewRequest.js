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
   View,Image,TouchableOpacity,FlatList,Modal,ActivityIndicator,LogBox
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
 import CheckBox from '@react-native-community/checkbox';
 import RestApiConstant from './RestApiConstant';
 const NewRequest = ({navigation,route}) => {
   const isDarkMode = useColorScheme() === 'dark';
   const [count, onChangeCount] = React.useState('')
   const [userID, onChangeUserID] = React.useState()
   const [token, onChangeToken] = React.useState()
   const [modalVisible, setModalVisible] = React.useState(false);
   const [loading, setLoading] = React.useState(false);
   const [Message, setMessage] = React.useState(false);
   const [lineItem,setLineItem] = React.useState([])
   const [modallineItem,setModalLineItem] = React.useState([])
   const [selected,onSelected] = React.useState([])
   const [toggleCheckBox, setToggleCheckBox] = React.useState(false)
   const [address,onAddress] = React.useState()
   const [assImg,setAssImg] = React.useState()
   const [assMess,setAssMess] = React.useState()
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
   const [products, setProducts] = React.useState([]);

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
        //textTocken(res)
        if(userID != null){
          console.log("userID",userID)
        }

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

      axios.get(`${RestApiConstant.BASE_URL}/wp-json/ai1service/v1/vendor-orders/staff/${r}`,{ headers: {"Authorization" : `Bearer ${res}`} })
      .then((res) => {
        console.log(res.data)
        setLoading(false)
        setLineItem(res.data)   
      }).catch((er)=>{
       console.log(er)
     })
   }





  const selectedItems = async(item) =>{
  
  await  onSelected(item)
  onAddress(item.shipping_address.shipping_address_1+","+item.shipping_address.shipping_city)
  var it = item.line_items
  const newArray = it.map(e => {
    return {
      ...e,
      selected: false
    }
  })
  console.log(newArray)
  setModalLineItem(newArray)
    setModalVisible(!modalVisible)
  

  }

   const handleChange = (item,index) =>{
     /*  */
  
     const newData = modallineItem.map((newItem)=>{
           if(newItem.item_id === item.item_id){
             console.log(true)
             return {
               ...newItem,
               selected:true
             }
           }else{
            console.log(true)
            return{
              ...newItem,
              selected:false
            } 
           }
        
     })
   

     setModalLineItem(newData)

   }

  const onValueChange = (item, index) => {
    console.log("........es",item)
    const newData = modallineItem.map(e => {
      if (e.item_id == item.item_id ) {
      
          return {
          ...e,
          selected: !e.selected
        }
      }else{
      
        return {
          ...e,
          selected: e.selected
        }
      }
     
    });
    console.log('AAAA:', newData)
    setModalLineItem(newData)

  }



   console.log("ModallineItem",modallineItem)
 


   const CardItem =  (item,index) =>{
  
      var i = item

     
     /*    var o = item.line_items.map((v, i) => {
         var vf = v.item_id
          return vf
        }) 
      console.log(o) */
      var oi = item.order_date.date
      var ii =oi.substring(10,16)
     return(
      <TouchableOpacity onPress={()=>{selectedItems(item)}} style={styles.cardview}>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:"100%",alignItems:'center'}}>
        <View style={{width:"30%",height:90,alignItems:'center',backgroundColor:'#fff',borderRadius:50,alignContent:'center',justifyContent:'center'}}>
        <Image source={/* IMAGES['image' + item.image] */require('../assets/girl.png')} style={{height:70,width:70,padding:1}}/>
        </View>
         <View style={{width:"50%",height:'90%',flexDirection:'column',alignContent:'center'}}>
         <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:"#2ea3f2"}}>{i.id}</Text>
     
         <Text style={{padding:3,fontWeight:'bold',fontSize:12,color:"#000"}}>{i.customer_name}</Text>
         <Text style={{padding:3,fontWeight:'400',fontSize:10,color:"#000"}}>Location :</Text>
         <Text style={{padding:3,fontWeight:'bold',fontSize:12,color:"#000"}}>{i.shipping_address.shipping_address_1},{i.shipping_address.shipping_city}</Text>
         </View>
         <View style={{width:"20%",height:'90%',alignContent:'center',flexDirection:'row',padding:5}}>
         <Image source={require('../assets/clock.png')} style={{height:15,width:15,padding:1}}/>
         <Text style={{padding:0,fontWeight:'bold',fontSize:12,color:"#000"}}>{ii}</Text>
         </View>
            </View>
      </TouchableOpacity>
     )
   }

   const modalList =(item,index) =>{
     return(
    /*   <TouchableOpacity  style={{height:20,width:100}}>
      <Text style={{color:'#000'}}>{item.item_id}</Text>
      <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:'#04B4AE',padding:5}}>Order</Text> 
      </TouchableOpacity> */
      <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around',alignContent:'center',marginTop:10}}>
        <View style={{alignItems:'center',width:'50%'}}>
        <Text style={{padding:0,fontWeight:'bold',fontSize:14,color:'#000',padding:5}}>{item.item_name}</Text> 
        </View>
        <View style={{alignItems:'center',width:'50%'}}>
        <Text style={{padding:0,fontWeight:'bold',fontSize:14,color:'#000',padding:5}}>{item.quantity}</Text> 
        </View>
        <View style={{alignItems:'center',width:'20%',alignContent:'center'}}>
        <CheckBox
    disabled={false}
    value={item.selected}
    tintColors={{ true: '#2ea3f2', false: 'black' }}
    onValueChange={() => {onValueChange(item,index);}}
 

  />
  </View>
          </View>
     )
   }


   
   const orderAccepted = () =>{
     modallineItem.map((i)=>{
       if(i.selected == true){
         products.push(
           {
             "item_id":i.item_id
           }
         )
       }
     })

     console.log("Product",products)

     var datas = {
       "line_items":products
     }

     setLoading(true)
     axios.interceptors.request.use(
       config=>{
         config.headers.Authorization = `Bearer ${token}`
         return config
       },
       error=>{
         return Promise.reject(error)
       }
     )




        axios.post(`${RestApiConstant.BASE_URL}/wp-json/ai1service/v2/vendor-orders/${selected.id}/accept/${userID}`,datas,{ headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => {
         console.log(res.data)
         setLoading(false)
         setProducts([])
         setModalVisible(!modalVisible)
       
         var ct = 1
         showMessage(ct)
       }).catch((er)=>{
        setLoading(false)
        setProducts([])
        setModalVisible(!modalVisible)
        var ct = 0
        showMessage(ct)
        console.log("errre",er)
      })


   }

   const showMessage =(res)=>{
        if(res == 1){
          setAssImg(require('../assets/assign.png'))
          setAssMess("Order assigned for you successfully")
       setMessage(!Message)
        }else{
          setAssImg(require('../assets/notassign.png'))
          setAssMess("Order already assigned")
          setMessage(!Message)
        }
   }

   const setMessageFun = () =>{
    setMessage(!Message)
   /*  getVendorOrder(token,userID) */
   navigation.navigate('ActiveOrder')
   }



   const dat = (item,index) =>{
     console.log(item)
    return(
      <View style={styles.cardview}>
<Text style={{padding:3,fontWeight:'bold',fontSize:16,color:"#04B4AE"}}>ORD3057284</Text>
      </View>
    )
   }

   


   return (
     <SafeAreaView style={styles.container}>
      
         <StatusBar
      animated={true}
      backgroundColor="#2ea3f2"
       barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <View style={{backgroundColor:"#2ea3f2",borderBottomRightRadius:50}}>
       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:0,padding:20,width:'100%'}}>
            
        
         <View style={{flexDirection:'row',justifyContent:'space-between',width:120,alignItems:'center'}}>
           <TouchableOpacity onPress={()=>{
             navigation.navigate('Home')
           }}>
         <Image source={require('../assets/left.png')} style={{height:23,width:23,padding:12}}/>
         </TouchableOpacity>
           {/*  <Image source={require('../assets/atoz.png')} style={{height:30,width:30,padding:10}}/> */}
            <Text style={{padding:10,fontWeight:'bold',fontSize:16,color:"#000"}}>NEW ORDER</Text>
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
       
         <View style={{alignItems:'center',alignContent:'center',flex:1,width:'100%'}}>
         <ScrollView style={{marginTop:10,flex:1,width:'100%',padding:10}}>
         
           <FlatList
         
        data={lineItem}
        keyExtractor={item => item.id} 
        renderItem={({ item,index }) => CardItem(item)}
      />
     {/*   <FlatList
      data={datas}
      renderItem={({ item, index }) => (
        <View>
          {item.id.map((v, i) => (
            <View>
            <TouchableOpacity onPress={()=>{ setModalVisible(!modalVisible)}} style={styles.cardview}>
            <Text>{v.id}</Text>
            </TouchableOpacity>
           
            
            </View>
          ))}
        </View>
      )}
    /> */}
           </ScrollView>

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
            <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:'#FFFFFF'}}>{selected.id}</Text>
            </View>    
      
     
<ScrollView>
<Text style={{padding:3,fontWeight:'bold',fontSize:16,color:'#2ea3f2'}}>Order</Text> 
<View style={{alignItems:'center',alignContent:'center',width:'100%'}}>
<View style={{width:'90%',borderColor:'#2ea3f2',borderWidth:1,borderRadius:10,padding:10}}>
<View style={{width:'100%',flexDirection:'row',justifyContent:'space-around',alignItems:'center',padding:0}}>
          <Text style={{padding:0,fontWeight:'bold',fontSize:14,color:'#000',padding:0}}>Item</Text> 
          <Text style={{padding:0,fontWeight:'bold',fontSize:14,color:'#000',padding:0,right:15}}>Quantity</Text> 
         
          </View>
         <View style={{marginTop:10,width:'100%',padding:0}}>
           
           <FlatList
         
        data={modallineItem}
        keyExtractor={item => item.item_id} 
        renderItem={({ item,index }) => modalList(item)}
      />
           </View>

         </View> 
           </View>

            <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:'#2ea3f2',padding:10}}>Location</Text> 
            <View style={{width:'100%',alignItems:'center'}}>
            <View style={{width:'90%',borderColor:'#2ea3f2',borderWidth:1,borderRadius:10}}>
            <View style={{width:'90%',flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Location:</Text> 
            <Text style={{fontWeight:'500',fontSize:14,color:'#000',padding:10}}>{address}</Text> 
            </View>
           
            </View>
         
            </View>

            <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:'#2ea3f2',padding:5}}>Customer</Text> 
            <View style={{width:'100%',height:"15%",alignItems:'center'}}>
            <View style={{width:'90%',borderColor:'#2ea3f2',borderWidth:1,borderRadius:10}}>
            <View style={{width:'90%',flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Name:</Text> 
            <Text style={{fontWeight:'500',fontSize:14,color:'#000',padding:10}}>{selected.customer_name}</Text> 
            </View>
            <View style={{width:'90%',flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Phone:</Text> 
            <Text style={{fontWeight:'500',fontSize:14,color:'#000',padding:10}}>{selected.contact_no}</Text> 
            </View>
           
           
            </View>
         
            </View>
            <Text style={{padding:3,fontWeight:'bold',fontSize:16,color:'#2ea3f2',padding:10}}>Payment</Text> 
            <View style={{width:'100%',alignItems:'center'}}>
            <View style={{width:'90%',borderColor:'#2ea3f2',borderWidth:1,borderRadius:10}}>
            <View style={{width:'90%',flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Payment:</Text> 
            <Text style={{fontWeight:'500',fontSize:14,color:'#000',padding:10}}>Cash</Text> 
            </View>
           
            </View>
         
            </View>

     


         

          <View>

   
    <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20,padding:10,height:"15%",marginBottom:30}}>
    <TouchableOpacity
              style={{borderRadius:15,borderColor:'#000',borderWidth:1,width:100,height:35,alignItems:'center',justifyContent:'center'}}
              onPress={() =>
                 {setProducts([]),
                  setModalVisible(!modalVisible)}
            }>
              <Text style={{color:'#000'}}>CANCEL</Text>
            </TouchableOpacity>
    <TouchableOpacity
              style={{borderRadius:15,backgroundColor:'#2ea3f2',width:100,height:35,
              alignItems:'center',justifyContent:'center'}}
              onPress={() =>
                 {orderAccepted()
                }
            }>
              <Text style={{color:'#FFFFFF',fontWeight:'bold'}}>ACCEPT</Text>
            </TouchableOpacity>
           </View>
          </View>
          </ScrollView>


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
   centeredView: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     marginTop: 22,
     
     
   },
   modalView: {
     margin: 0,
     width:'90%',
     height:"82%",
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
   }
   ,
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
   ,
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
 
 export default NewRequest;
 