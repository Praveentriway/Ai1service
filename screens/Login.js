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
   View,
   Image,ImageBackground,TextInput,Button,   TouchableOpacity,ActivityIndicator,LogBox,Modal
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
 import RestApiConstant from './RestApiConstant';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 const Login = ({navigation}) => {
    const isDarkMode = useColorScheme() ==="light";
    const [Email, onChangeEmail] = React.useState('');
    const [Pass, onChangePass] = React.useState('');
    const [Pace, OnChangePace] = React.useState('Enter User Name');
    const [Pace1, OnChangePace1] = React.useState('Password');
    const [Fail, onChangeFail] = React.useState('')
    const [bar, onChangeBar] = React.useState(false)
    const [vis, setVis] = React.useState(true); 

    const setVisible=()=>{
      if(vis== true){
        setVis(false)
      }else {
        setVis(true)
      }
     
      console.log('dd')
    }
  React.useEffect(()=>{
    LogBox.ignoreLogs(['new NativeEventEmitter']); 

    tokenKey()
  },[])


  const tokenKey = async() =>{

             
             
    await  AsyncStorage.getItem('UserID').then((res)=>{
         console.log('UserID',res)
       
           if(res != null){
             console.log(res)
             navigation.navigate('TabNav')
           }
       
       }).catch((err)=>{
         console.log('err')
        })

        await  AsyncStorage.getItem('TokenStrings').then((res)=>{
          console.log('TokenStrings',res)
        
     
        
        }).catch((err)=>{
          console.log('err')
         })
     }

   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };

   const TriangleCorner = () => {
    return <View style={styles.triangleCorner} />;
  };

  const TriangleCornerBottomRight = () => {
    return <View style={styles.triangl} />;
  };
  var value = {
    "username": Email,
    "password": Pass
}/* `` */
  const onpress =async () =>{
    if(Email != "" && Pass != ""){
    onChangeBar(true)
 
   console.log(Email+Pass)
   console.log("resas")
    await axios.post(RestApiConstant.LOGIN_URL,value)
   .then(async(res) => {
    console.log("res")
    onChangeBar(false)
     console.log(res.data.data.id)
     var role = res.data
     var id = res.data.data.id
     var tok = res.data.data.token
     var userRole = res.data.data.role[0]
    
     await AsyncStorage.setItem('TokenStrings',tok)
     await AsyncStorage.setItem('UserID',id.toString())
     await AsyncStorage.setItem('UserRole',userRole)
     onChangeEmail('')
     onChangePass('')
     navigation.navigate("TabNav")
  
   }).catch( (error)=> {
    console.log("error")
    onChangeBar(false)
    console.log(error)
    onChangeFail("Invalid username or password !")
   })
  }else{
    onChangeFail("Enter Valid Details!")
  }
  }


 
   return (
   
    <View style={styles.container}>
      <StatusBar
      animated={true}
      backgroundColor="#2ea3f2"
       barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView>
      <View style={{marginTop:200,justifyContent:"center",alignItems:"center"}}>
      <Image source={require("../assets/ai1_logo.png")} style={{height:100,width:100,marginBottom:40,borderRadius:5}} />
      <Text style={{color:"#FF0000",marginBottom:10}}>{Fail}</Text>
      <TextInput
      style={{ height:50,width:"85%" ,borderColor:"gray",color:"#2ea3f2" ,borderWidth: 1,marginBottom:20,padding:10 ,borderRadius:5}}
      onChangeText={text => onChangeEmail(text)}
      placeholder={Pace}
      placeholderTextColor="gray"
      value={Email}
    />
     <TouchableOpacity style={{ height:50,width:"85%",alignItems:'center',borderRadius:5 ,borderColor:"gray",color:"#000000" , borderWidth: 1,marginBottom:40,flexDirection:'row',justifyContent:'space-between'  }}>
    <TextInput
      style={{ height:50,width:200 ,left:0,padding:10 ,color:"#2ea3f2"}}
      secureTextEntry={vis}
      onChangeText={text => onChangePass(text)}
      placeholder={Pace1}
      placeholderTextColor="gray"
      value={Pass}
    />

    <TouchableOpacity style={{height:50,width:30,alignContent:'center',justifyContent:'center'}} onPress={()=>{setVisible()}}>
    <Image source={require("../assets/invisible.png")} style={{height:25,width:25,padding:10,right:10}}  />
    </TouchableOpacity>
</TouchableOpacity>



      </View>
   
      {/* <View  style={{justifyContent:"space-around",flexDirection:"row",marginBottom:30}}>
      
    
    
     <Text  style={{color:'#66CDAA'}}>Create New Account</Text>
              <Text style={{color:"#FF7F50"}}>Forgot Password ?</Text>
      </View> */}

    <View  style={{justifyContent:"center",alignItems:"center",alignContent:'center'}}>
      
    <TouchableOpacity style={{backgroundColor:"#2ea3f2",width:"85%",height:50,borderRadius:30,marginTop:0,justifyContent:'center'}} onPress={()=>{onpress()}}>
              <Text style={{color:"#fff",textAlign:'center',fontSize:15}}>LOGIN</Text>
              </TouchableOpacity>
      </View>
{/*       <ActivityIndicator style={{justifyContent:"space-around",flexDirection:"row",marginBottom:20,marginTop:20}} animating={bar} size="large" color="#04B4AE" />
 */}
     {/*  <PureChart data={sampleData} type='pie' /> */}

    {/*  <BarChart

  data={data}
  width={screenWidth}
  height={220}
  yAxisLabel="$"
  chartConfig={chartConfig}
  verticalLabelRotation={30}
/> */}
{/* <View style={{padding:10}}>
         <Image source={require('../assets/han.png')} style={{height:178,width:238,padding:0,right:10,marginBottom:25}}/>
         </View> */}

<Modal
        animationType="fade"
        transparent={true}
        visible={bar}       
      >
           <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <ActivityIndicator style={{justifyContent:"space-around",flexDirection:"row",marginBottom:20,marginTop:10}} animating={true} size="large" color="#04B4AE" />
        <Text style={{color:"#2ea3f2",fontWeight:'bold'}}>Loading....</Text>
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
    
    
  }
 });
 
 export default Login;
 