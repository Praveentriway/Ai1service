
import React, { useState ,useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,Switch,TextInput,Button, TouchableOpacity,ActivityIndicator,LogBox,Modal,TouchableHighlight
  } from 'react-native';
import { useValidation } from 'react-native-form-validator';
import axios from 'axios';
import RestApiConstant from './RestApiConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera } from 'react-native-image-picker';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
 
  } from 'react-native/Libraries/NewAppScreen';

const EditStaff = ({navigation,route})  => { 
  const isDarkMode = useColorScheme() ==="light";
  const [isEnabled, setIsEnabled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone , setPhone] = useState('');
  const [firstname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [remarks,setRemarks] = useState('')
  const [Password, setNewPassword] = useState('');
  const [err,setError] = useState(0)
  const [token, onChangeToken] = React.useState()
  const [userRole,setUserRole] = React.useState()
  const [loading, setLoading] = React.useState(false);
  const [Message, setMessage] = React.useState(false);
  const [assImg,setAssImg] = React.useState()
  const [assMess,setAssMess] = React.useState()
  const [sendID,setSendID] = React.useState(0)
  const [entry,setEntry] = React.useState(0)
  const [hidePass,setHidePass] = React.useState(false)
  const [lock,unlock] = React.useState(0)
  const [lockColor,unlockColor] = React.useState(0)
  const [lockMess,unlockMess] = React.useState('')
  const staffData = {
    "username": name,
    "password": Password,
    "first_name": firstname,
    "last_name": lname,
    "email": email,
    "description": remarks,
    "roles": [
        "author"
    ],
    "ai1_contact_no": phone,
    "meta": []
}

const staffEditedData = {

  "password": Password,
  "first_name": firstname,
  "last_name": lname,
  "email": email,
  "description": remarks,
  "ai1_contact_no": phone,

}
  

  const { validate, isFieldInError, getErrorsInField, getErrorMessages ,isFormValid} =
  useValidation({
    state: { name, email, phone, Password, firstname},
  });


   useEffect(()=>{
   var hide = route.params.data
    tokenKey()
    setSendID(route.params.data)
    if(hide != 0){
      if(hidePass == false){
        setHidePass(false)
       // console.log(hidePass)
      }  
    }else{
      setHidePass(true)
    } 
   })

   const tokenKey = async() =>{


    await  AsyncStorage.getItem('UserRole').then((res)=>{
     // console.log('Role',res)  
      /* wcfm_vendor */
      setUserRole(res)
  
    }).catch((err)=>{
      console.log('err')
     })


    await  AsyncStorage.getItem('TokenStrings').then((res)=>{
   
    var tok = res
    onChangeToken(res)
    if(entry == 0){
    if(sendID != 0){
     
        getEditStaffData(res)
        setEntry(1)
      }
  
   }
     
    }).catch((err)=>{
      console.log('err')
     })
  
 }


 const getEditStaffData = (res) =>{
 console.log('sendID',sendID)
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


 axios.get(`${RestApiConstant.BASE_URL}/wp-json/ai1service/v1/staffs/${route.params.data}/meta`,{ headers: {"Authorization" : `Bearer ${res}`} })
 .then((res) => {
     console.log(res.data)
     var data = res.data     
        setFname(data.first_name)
        setLname(data.last_name)
        setEmail(data.email)
        setPhone(data.contact_no)
        unlock(data.user_locked)
        var lockCol = data.user_locked
        if(lockCol == 'yes'){
          unlockColor('#FF0000')
          unlockMess("UnLock Staff")
        }else{
          unlockColor('#2ea3f2')
          unlockMess("Lock Staff")
        }
        setLoading(false)
      }).catch((er)=>{
       console.log(er)
       setLoading(false)
     })
   }


 
   const _onPressButton =async () => {
    
    validate({
     name: { /* minlength: 3, maxlength: 7, */ required: true },
     email: { required: true},
     phone: { numbers:true, required: true},
     firstname:{required: true},
     Password:{minlength: 8,required: true}
   });
  // console.log('mj',isFormValid())
   if(isFormValid() == true){
  
       submitData()
     
   }
    
 };


   const submitData = () =>{
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
      
         axios.post(`${RestApiConstant.BASE_URL}/wp-json/wp/v2/users`,staffData,{ headers: {"Authorization" : `Bearer ${token}`} })
         .then((res) => {
          console.log(res.data)
       
          setLoading(false)
 
        
          var ct = 1
          showMessage(ct)
        }).catch((er)=>{
         setLoading(false)

         var ct = 0
         showMessage(ct)
         console.log("errre",er)
       })
   }


   
   const lockStaff = () =>{
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

      var lockData = ''
       if(lock == 'yes'){
         lockData = 'no'
       }else{
         lockData = 'yes'
       }

         axios.post(`${RestApiConstant.BASE_URL}/wp-json/ai1service/v1/access/${sendID}?lock=${lockData}`,{ headers: {"Authorization" : `Bearer ${token}`} })
         .then((res) => {
          console.log(res.data)
       
          setLoading(false)
 
          setAssImg(require('../assets/assign.png'))

          if(lock == 'yes'){
            setAssMess("Staff UnLocked successfully")
            unlockColor('#2ea3f2')
            unlockMess('Lock Staff')
          //  unlock('no')
          }else{
            setAssMess("Staff Locked successfully")
            unlockColor('#FF0000')
            unlockMess('UnLock Staff') 
          //  unlock('yes')       
          }
         
          setMessage(!Message)
       /*    var ct = 1
          showMessage(ct) */
        }).catch((er)=>{
         setLoading(false)
         setAssImg(require('../assets/notassign.png'))
         setAssMess("somthing went wrong")
         setMessage(!Message)
        /*  var ct = 0
         showMessage(ct) */
         console.log("errre",er)
       })
   }


   const submitEditedData = () =>{
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
         axios.put(`${RestApiConstant.BASE_URL}/wp-json/ai1service/v1/staffs/${sendID}`,staffEditedData,{ headers: {"Authorization" : `Bearer ${token}`} })
         .then((res) => {
          console.log(res.data)
       
          setLoading(false)
 
        
          var ct = 1
          showMessage(ct)
        }).catch((er)=>{
         setLoading(false)

         var ct = 0
         showMessage(ct)
         console.log("errre",er)
       })
   }


              const showMessage =(res)=>{
                    if(res == 1){
                      setAssImg(require('../assets/assign.png'))
                    /*   setAssMess("New staff added successfully") */

                      if(sendID != 0){
                        setAssMess("Updated successfully")
                     }else{
                      setAssMess("New staff added successfully")
                     }
                   setMessage(!Message)
                    }else{
                      setAssImg(require('../assets/notassign.png'))
                      setAssMess("somthing went wrong")
                      setMessage(!Message)
                    }
               }

               const setMessageFun = () =>{
                setMessage(!Message)
                navigation.navigate('StaffList')
               }

               const blockStaff = () =>{
                    setMessage(!Message)
                    getEditStaffData(token)
               // navigation.navigate('StaffList')
               }

  return (
    <View style={styles.container}>
        <StatusBar
         animated={true}
         backgroundColor="#2ea3f2"
         barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <View style={{backgroundColor:"#2ea3f2",borderBottomRightRadius:50}}>
       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:0,padding:20,width:'100%'}}>
            
        
         <View style={{flexDirection:'row',justifyContent:'space-between',width:120,alignItems:'center'}}>
           <TouchableOpacity onPress={()=>{
             navigation.navigate('StaffList')
           }}>
         <Image source={require('../assets/left.png')} style={{height:23,width:23,padding:12}}/>
         </TouchableOpacity>
           {/*  <Image source={require('../assets/atoz.png')} style={{height:30,width:30,padding:10}}/> */}
            <Text style={{padding:10,fontWeight:'bold',fontSize:16,color:"#000"}}>ADD STAFF</Text>
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

     <ScrollView>
      <View style={{marginTop:10,justifyContent:"center",alignItems:"center"}}>
        <View style={{width:'100%',padding:5}}>
        <TouchableOpacity
              style={{borderRadius:5,backgroundColor:lockColor,width:90,height:30,marginBottom:10,
              alignItems:'center',justifyContent:'center',alignContent:'center'}}
              onPress={()=>{lockStaff()}}
            >
              <Text style={{color:'#FFFFFF',fontWeight:'bold',fontSize:12}}>{lockMess}</Text>
            </TouchableOpacity> 
        </View>
   
        {sendID != 0 ?null:
          <View style={{width:'90%',marginTop:10}}>
              <Text style={{fontWeight:'bold',color:'#000'}}>Username<Text style={{color:'#FF0000',fontWeight:'bold'}}>*</Text></Text>

              <TextInput 
       style={{ height:40,left:10,width:"95%" ,fontSize:12,borderColor:"gray",color:"#2ea3f2",fontWeight:'500' ,borderWidth: 1,marginBottom:0,padding:10 ,borderRadius:5}}
       placeholderTextColor="gray"
       placeholder={'Enter User Name'}
      onChangeText={setName} value={name} />
       {isFieldInError('name') && getErrorsInField('name').map(errorMessage => <Text style={{color:"#FF0000"}}>{errorMessage}</Text>) }
          </View>
  
      }
      <View style={{width:'90%',marginTop:20}}>
              <Text style={{fontWeight:'bold',color:'#000'}}>Email<Text style={{color:'#FF0000',fontWeight:'bold'}}>*</Text></Text>
          </View>
      <TextInput 
       style={{ height:40,width:"85%" ,fontSize:12,borderColor:"gray",color:"#2ea3f2",fontWeight:'500' ,borderWidth: 1,marginBottom:0,padding:10 ,borderRadius:5}}
       placeholderTextColor="gray"
       placeholder={'Enter Your Email'}
      onChangeText={setEmail} value={email} />
      {isFieldInError('email') && getErrorsInField('email').map(errorMessage => <Text style={{color:"#FF0000"}}>{errorMessage}</Text>) }

      <View style={{width:'90%',marginTop:20}}>
              <Text style={{fontWeight:'bold',color:'#000'}}>Password<Text style={{color:'#FF0000',fontWeight:'bold'}}>*</Text></Text>
          </View>
          {hidePass == false ? 
          <TouchableOpacity 
          style={{ height:40,width:"85%" ,fontSize:12,borderColor:"gray",backgroundColor:'#CEECF6',color:"#2ea3f2" ,borderWidth: 1,marginBottom:0,padding:10 ,borderRadius:5}}
          onPress={()=>{setHidePass(true)}}>
                 <Text style={{color:"#000",textAlign:'center',fontSize:15}}>Edit Password</Text>
                 </TouchableOpacity> : 
           <TextInput 
            style={{ height:40,width:"85%" ,fontSize:12,borderColor:"gray",color:"#2ea3f2",fontWeight:'500' ,borderWidth: 1,marginBottom:0,padding:10 ,borderRadius:5}}
            placeholderTextColor="gray"
            placeholder={'Enter User Password'}
            onChangeText={setNewPassword} value={Password} />
           } 
             
            {hidePass == false ? null : isFieldInError('Password') && getErrorsInField('Password').map(errorMessage => <Text style={{color:"#FF0000"}}>{errorMessage}</Text>) } 
      <View style={{width:'90%',marginTop:20}}>
              <Text style={{fontWeight:'bold',color:'#000'}}>First Name<Text style={{color:'#FF0000',fontWeight:'bold'}}>*</Text></Text>
          </View>
      <TextInput 
       style={{ height:40,width:"85%" ,fontSize:12,borderColor:"gray",color:"#2ea3f2",fontWeight:'500' ,borderWidth: 1,marginBottom:0,padding:10 ,borderRadius:5}}
       placeholderTextColor="gray"
       placeholder={'Enter First Name'}
      onChangeText={setFname} value={firstname} />
       {isFieldInError('firstname') && getErrorsInField('firstname').map(errorMessage => <Text style={{color:"#FF0000"}}>{errorMessage}</Text>) }
      <View style={{width:'90%',marginTop:20}}>
              <Text style={{fontWeight:'bold',color:'#000'}}>Last Name</Text>
          </View>
      <TextInput 
       style={{ height:40,width:"85%" ,fontSize:12,borderColor:"gray",color:"#2ea3f2",fontWeight:'500' ,borderWidth: 1,marginBottom:0,padding:10 ,borderRadius:5}}
       placeholderTextColor="gray"
       placeholder={'Enter Last Name'}
      onChangeText={setLname} value={lname} />

      <View style={{width:'90%',marginTop:20}}>
              <Text style={{fontWeight:'bold',color:'#000'}}>Phone<Text style={{color:'#FF0000',fontWeight:'bold'}}>*</Text></Text>
          </View>
      <TextInput 
       style={{ height:40,width:"85%" ,fontSize:12,borderColor:"gray",color:"#2ea3f2" ,fontWeight:'500',borderWidth: 1,marginBottom:0,padding:10 ,borderRadius:5}}
       placeholderTextColor="gray"
       placeholder={'Enter Phone Number'}
      onChangeText={setPhone} value={phone} />
       {isFieldInError('phone') && getErrorsInField('phone').map(errorMessage => <Text style={{color:"#FF0000"}}>{errorMessage}</Text>) }
      <View style={{width:'90%',marginTop:20}}>
              <Text style={{fontWeight:'bold',color:'#000'}}>Remarks</Text>
          </View>
      <TextInput 
       style={{ height:40,width:"85%" ,fontSize:12,borderColor:"gray",color:"#2ea3f2" ,fontWeight:'500',borderWidth: 1,marginBottom:0,padding:10 ,borderRadius:5}}
       placeholderTextColor="gray"
       placeholder={'Add your remarks'}
      onChangeText={setRemarks} value={remarks} />
        
     {/*  <Text style={{marginTop:5,color:"#FF0000"}}>{getErrorMessages()}</Text>  */}
      <TouchableOpacity style={{backgroundColor:"#2ea3f2",marginTop:20,width:"60%",height:40,borderRadius:30,justifyContent:'center'}}
       onPress={()=>{
         if(sendID != 0){
          submitEditedData()
         }else{         
           _onPressButton()
         }
         }}>
              <Text style={{color:"#fff",textAlign:'center',fontSize:15}}>SUBMIT</Text>
              </TouchableOpacity>
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
        <TouchableOpacity onPress={()=>{
          if(lock == 'yes' || lock == 'no' || lock ==''){
            blockStaff()
          }else{
            setMessageFun()
          }        
          }} 
          style={{width:'100%',alignItems:'flex-end',justifyContent:'space-around',padding:10,right:10}}>
        <Text style={{color:'#2ea3f2',fontWeight:'bold',fontSize:16,}}>Close</Text>
        </TouchableOpacity>
          </View>
    
        </View>
      </Modal>
     </ScrollView>
    </View>
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
     triangleCorner: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderRightWidth: 150,
      borderTopWidth: 150,
      borderRightColor: "transparent",
      borderTopColor: "#42C1D4",
      
    },
    triangleCornerBottomRight: {
      transform: [{ rotate: "180deg" }],
    },
    mainCardView: {
      height: "60%",
      width:"90%",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.white,
      borderRadius: 15,
      shadowColor: Colors.shadow,
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 8,
      flexDirection: "column",
     
      paddingLeft: 16,
      paddingRight: 14,
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 16,
      marginRight: 16,
    },triangl: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 80,
      borderRightWidth: 0,
      borderBottomWidth: 80,
     alignItems:"flex-end",
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#000'
    },
    textBox:{
      height: 60,
      width:300,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.white,
      shadowColor: Colors.shadow,
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 8,
      paddingLeft: 16,
      paddingRight: 14,
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 16,
      marginRight: 16,
    },
    modalView: {
      margin: 0,
      width:'60%',
      height:"18%",
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
   });

export default EditStaff;