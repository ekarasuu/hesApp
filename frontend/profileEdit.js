import React from 'react';
import {
    ScrollView,
    View
  } from 'react-native';
  
import { FormLabel, FormInput, FormValidationMessage,Avatar,Header,Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

 export default class ProfileEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            birth:"",
            username:""
                     }
                    }


componentDidMount(){
        const { navigation } = this.props;
        this.setState ({username:navigation.getParam('username')});
        this.setState ({firstname:navigation.getParam('firstname')});
        this.setState ({lastname:navigation.getParam('lastname')});
        this.setState ({email:navigation.getParam('email')});
        this.setState ({phone:navigation.getParam('phone')});
        this.setState ({birth:navigation.getParam('birth')});

       }
      render(){
        const { goBack } = this.props.navigation;
          return(
            <KeyboardAwareScrollView>
                   <Header  
                          leftComponent={{ icon: 'keyboard-arrow-left', color: '#fff',
                          onPress:() => this.props.navigation.navigate('Profile',{user:this.state.username}
                        ) }}
                          centerComponent={{ text: 'PROFİL', style: { color: '#fff',fontSize:20 } }}
                         
                          outerContainerStyles={{ backgroundColor: 'red' }}
               
                  />
                  <Avatar
                     width={180}
                     height={180}
                     rounded
                     source={require('../images/user.png')}
                     activeOpacity={0.7}
                     containerStyle={{marginTop:45,alignSelf:'center'}}
                  />
                
                <View>
                  <FormLabel>
                      Ad
                      <FormInput ref={input => this.input= input} 
                       onChangeText={(firstname) => this.setState({firstname})}>{this.state.firstname}</FormInput>
                  </FormLabel>
                  <FormLabel>
                      Soyad
                      <FormInput ref={input => this.input= input} 
                      onChangeText={(lastname) => this.setState({lastname})}>{this.state.lastname}</FormInput>
                  </FormLabel>
                  <FormLabel>
                      Mail Adresi
                      <FormInput ref={input => this.input= input} 
                      onChangeText={(email) => this.setState({email})}>{this.state.email}</FormInput>
                  </FormLabel>
                  <FormLabel>
                      Telefon Numarası
                      <FormInput ref={input => this.input= input} 
                      onChangeText={(phone) => this.setState({phone})}>{this.state.phone}</FormInput>
                  </FormLabel>
                  <FormLabel>
                      Doğum Tarihi
                      <FormInput ref={input => this.input= input} 
                      onChangeText={(birth) => this.setState({birth})}>{this.state.birth}</FormInput>
                  </FormLabel>
                  <Button
                        small
                        title='KAYDET' 
                        onPress={this.edit}
                        backgroundColor='red'
                        borderRadius={8} />
                         </View>
        
       
                         </KeyboardAwareScrollView>
                
          );
      }
   
   edit = () => {

        fetch('http://172.20.10.12:3000/user/edit',{
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
        },
            body:JSON.stringify({
            username:this.state.username,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            email:this.state.email,
            phone:this.state.phone,
            birth:this.state.birth
        })
    })
    .then((response) => response.json())
    .then((res) => {
        if(res.canUpdate === true){
            this.props.navigation.navigate('Profile',{
                user:this.state.username,
            });
         }
         else{
             alert("Kayıtlı Email");
         }
    }) 
      }
    }
