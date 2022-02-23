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
   Image,ImageBackground,TextInput,Button
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 const Login = ({navigation}) => {
   const isDarkMode = useColorScheme() === "light";
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };

   const TriangleCorner = () => {
    return <View style={styles.triangleCorner} />;
  };

  const TriangleCornerBottomRight = () => {
    return <View style={styles.triangl} />;
  };

  const onpress= () =>{
    navigation.navigate("Home")
  }
 
   return (
     <SafeAreaView style={styles.container}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  {/*    <View style={{height:200,width:200,flexDirection:"column",backgroundColor:'#000'}}>
    
       <Image source={require("../assets/upp.png")} style={{height:120,width:120}} />
       <Image source={require("../assets/dow.png")} style={{height:120,width:120,marginBottom:400}} />
     </View> */}
      {/*  <View style={{width:'100%',height:"25%",alignItems:'center'}}>
            <View style={{width:'90%',height:"100%",borderColor:'#04B4AE',borderWidth:1,borderRadius:10}}>
            <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Burger</Text> 
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>120</Text> 
            </View>
            <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Burger</Text> 
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>120</Text> 
            </View>
            <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Burger</Text> 
            <Text style={{fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>120</Text> 
            
            </View>
            <View style={{width:'100%',height:0.5,backgroundColor:'#000',marginBottom:0}}></View>
            <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{padding:3,fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>Burger</Text> 
            <Text style={{padding:3,fontWeight:'bold',fontSize:14,color:'#000',padding:10}}>360</Text> 
            
            </View>
            </View>
         
            </View> */}

                {/* <View style={{width:"100%",height:30,backgroundColor:'#DFF9F3',marginTop:10,borderRadius:5,justifyContent:'space-around',alignContent:'center',flexDirection:'row'}}>
              <View style={{width:'10%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                 <Text style={{color:"#000",fontWeight:'500'}}>{index+1}</Text>
              </View>
              <View style={{width:'20%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                 <Text style={{color:"#000",fontWeight:'500'}}>{item.order_id}</Text>
              </View>
            
              <View style={{width:'30%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                 <Text style={{color:"#000",fontWeight:'500'}}>{item.name}</Text>
              </View>
              <View style={{width:'20%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                 <Text style={{color:"#000",fontWeight:'500'}}>{accept}</Text>
              </View>
              </View> */}
<TriangleCorner />
<View style={{alignContent:"center",justifyContent:'center',alignItems:"center",flex:1}}>
     
   <ImageBackground  source={require("../assets/dow.png")} style={{height: 150,width: 150}}>

<View style={{flex: 1,justifyContent: 'flex-end',alignItems: 'flex-start'}}>
     <Image
      source={ require("../assets/upp.png")}
      style={{width: 150 , height: 150 ,alignItems: 'center',justifyContent: 'center',right:38,bottom:35}} />
</View>

</ImageBackground>
<View style={styles.mainCardView}>
<View >
<Text style={{fontWeight:'bold',fontSize:16,padding:5}}>User Name</Text>
<TextInput
      style={[styles.textBox,{fontWeight:'bold',fontSize:16}]}

    />
</View>
<View >
  <Text style={{fontWeight:'bold',fontSize:16,padding:5}}>Password</Text>
<TextInput
      style={[styles.textBox,{fontWeight:'bold',fontSize:16}]}

    />
</View>
<View   style={[styles.textBox,{fontWeight:'bold',fontSize:16}]}>
<Button 

//style={{padding:10,borderRadius:5,width:300,height:60,borderRadius:5}} 
title="Learn More"
  color="#42C1D4" onPress={()=>{onpress()}}/>
</View>

</View>

</View>
<View style={{alignItems:'flex-end'}} >
<TriangleCornerBottomRight />
</View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
 
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
  }
 });
 
 export default Login;
 