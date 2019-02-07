import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    Image,
    ImageBackground,
  } from 'react-native';
import {createStackNavigator} from 'react-navigation';

export default class Login extends React.Component {
    constructor(props){
         super(props);
         this.state = {
             username: '',
             password: '',
         }
    }


   
    
    render() {
        
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                   <ImageBackground source={require('../images/hesapp.png')} style = {styles.container}>
                        <View style={styles.content}> 
                            <View style={styles.inputContainer}>
                                <TextInput
                                     style={styles.textInput} placeholder='Username'
                                     onChangeText={(username) => this.setState({username})}
                                     underlineColorAndroid='transparent'
                                     onSubmitEditing={()=> this.password.focus()}/>
                                <TextInput
                                     style={styles.textInput} placeholder='Password'
                                     onChangeText={(password) => this.setState({password})}
                                     secureTextEntry={true} underlineColorAndroid='transparent'
                                     ref={(input) => this.password=input}
                                     />
                                <TouchableOpacity
                                     style={styles.btn}
                                     onPress={this.login}>
                                    <Text style={styles.butonText}>LOGIN</Text>
                                </TouchableOpacity>
                            <View style={styles.signupTextCont}>
                                <Text style={styles.signupText}>Don't have an account yet?</Text>
                                <TouchableOpacity onPress={() =>
                                      this.props.navigation.navigate('Signup')}>
                                      <Text style={styles.signupButton}> Signup
                                 </Text></TouchableOpacity>
                            </View>
                            </View>
                        </View>
                   </ImageBackground>        
            </KeyboardAvoidingView>
        );
    }
  login = () => {
   
        fetch('http://172.20.10.12:3000/user/login',{
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
        },
            body:JSON.stringify({
            username:this.state.username,
            password:this.state.password,
        })
    })
    .then((response)=> response.json())
    .then((res)=>{
        

        if(res.succes === true){
           this.props.navigation.navigate('Profile',{user:this.state.username});
        }
        else{
            alert("hata");
        }
    })
    .done();
  }
}

const styles =StyleSheet.create({
    wrapper:{
        flex:1,
    },
    container:{
        flex:1,
        justifyContent:'center',
        width: null,
    },
    content:{
        alignItems: 'center',
    },
    inputContainer: {
        margin: 20,
        marginTop:250,
        marginBottom: 0,
        padding: 20,
        paddingBottom: 20,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    textInput:{
        fontSize: 16,
        height: 40, 
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius:25,
    },
    btn:{
        height: 40,
        alignSelf:'stretch',
        backgroundColor:'blue',
        padding:10,
        alignItems:'center',
        borderRadius:25,
        },
    butonText:{
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
        color:'#fff'
    },
    signupText :{
        color:'rgba(255,255,255,0.7)',
        fontSize:16
    },
    signupTextCont:{
        flexGrow: 1,
        paddingVertical:16,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection:'row'
    },
    signupButton :{
        color:'#000051',
        fontSize:20,
        fontWeight:'bold',

    },
});
