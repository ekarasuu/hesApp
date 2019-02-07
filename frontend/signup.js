import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    KeyboardAvoidingView,
    ImageBackground,
    TouchableOpacity,
    Image

  } from 'react-native';
  import { SocialIcon } from 'react-native-elements'

export default class Signup extends React.Component {
       constructor(props){
            super(props);
           this.state = {
            username:"",
            email:"",
            password:"",
            password_confirmation:"",
            
        }
    }




  
    render() {
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
               <View style={styles.content}>
               <Image
                      source={require('../images/kayit1.png')}
                       style={{
                       marginTop:100,alignSelf:'center',
                     
                      
                       }}>
              </Image>
                   <View style={styles.inputContainer}>
                        <TextInput
                           onChangeText={(email)=>this.setState({email})}
                           style={styles.textInput} placeholder="Email"
                           />
                        <TextInput
                           onChangeText={(username)=>this.setState({username})}
                           style={styles.textInput} placeholder="Username"
                           />
                        <TextInput
                           onChangeText={(password)=>this.setState({password})}
                           style={styles.textInput} placeholder="Password"
                           secureTextEntry={true}/>
                        <TextInput
                           onChangeText={(password_confirmation)=>this.setState({password_confirmation})}
                           style={styles.textInput} placeholder="Confirm Password"
                           secureTextEntry={true}/>
                        <TouchableHighlight
                           style={styles.btn}
                           onPress={this.onRegisterPressed.bind(this)}>
                          <Text style={styles.butonText}>CREATE ACCOUNT</Text>
                        </TouchableHighlight>
                   </View>
                   <SocialIcon
                           onPress={() => alert('Henüz Bağlantısı Sağlanmadı')}
                           title='Sign In With Facebook'
                           button
                           type='facebook'
                    />
                    <View style={styles.signupTextCont}>
                                <Text style={styles.signupText}>Already have an account?</Text>
                                <TouchableOpacity onPress={() =>
                                      this.props.navigation.navigate('Login')}>
                                      <Text style={styles.signupButton}> Sign in
                                 </Text></TouchableOpacity>
                    </View>
                </View>
           </KeyboardAvoidingView>   
            
        );
    }


onRegisterPressed = () => {
    if(this.state.password === ""){
        return alert("Şifre boş olamaz")
    }
    if(this.state.password === this.state.password_confirmation){
        fetch('http://172.20.10.12:3000/user/signup',{
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
        },
            body:JSON.stringify({
            username:this.state.username,
            password:this.state.password,
            email:this.state.email,
        })
    })
    .then((response)=> response.json())
    .then((res)=>{
        
    
        if(res.canRegister === true){
            alert("Yönlendiriliyorsunuz....")
            setTimeout(()=>{
                this.props.navigation.navigate('Login')
            },2000)
        }
        else{
            alert("Kayıt işlemi başarısız");
        }
    })
    .done();
    }
    else{
        alert("Şifreler aynı olmalıdır");
    }
    }
   
  }

const styles =StyleSheet.create({
    wrapper:{
        flex:1,
    },
    content:{
         flex:1,
         backgroundColor:'#68C0FF'
    },
    inputContainer: {
        margin: 20,
        marginBottom: 0,
        padding: 20,
        paddingBottom: 10,
        
       
    },
    textInput:{
        fontSize: 16,
        borderRadius:8,
        height: 45, 
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    btn:{
        borderRadius:8,
        height: 45, 
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#4ddbff',
        },
    butonText:{
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold'
    },
    signupText :{
        color:'#fff',
        fontSize:20
    },
    signupTextCont:{
        flexGrow: 1,
        paddingVertical:16,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection:'row'
    },
    signupButton :{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',

    },
});
