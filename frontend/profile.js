import React from 'react';
import {
    Image,
    Text,
    View,
    Button,
    StyleSheet,
    TextInput,
    ScrollView
  } from 'react-native';

  import {  List, ListItem,Avatar,Header } from 'react-native-elements';
  
  export default class Profile extends React.Component {
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
    static navigationOptions = {
        tabBarIcon:({tintColor}) => (
            <Image
                 source={require('../images/person.png')}
                 style={{width:40,height:40}}>
            </Image>
            )
    }

   componentDidMount(){
        const { navigation } = this.props;
        const user = navigation.getParam('user');
        var value='http://172.20.10.12:3000/user/profile/'+user
         fetch(value)
        .then((response)=>response.json())
        .then((responseJson)=>{
        
          this.setState({username:responseJson.username});
          this.setState({firstname:responseJson.firstname});
          this.setState({lastname:responseJson.lastname});
          this.setState({email:responseJson.email});
          this.setState({phone:responseJson.phone});
          this.setState({birth:responseJson.birth});


          
      })
       .catch((error)=>{
           alert(error);
       })
   }

   
    
    render() {
        const list = [
            {
              title:'Ad Soyad',
              icon: 'person',
              attr:this.state.firstname+' '+this.state.lastname
            }, {
              title: 'Mail',
              icon: 'email',
              attr:this.state.email
            },{
              title:'Telefon',
              icon:'phone',
              attr:this.state.phone
            },{
              title:'Doğum Tarihi',
              icon:'cake',
              attr:this.state.birth
            }
        ]
          
        return (
         
            <ScrollView>
              <Header
                centerComponent={{ text: 'PROFİL', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{ icon: 'edit', color: '#fff',
                onPress:() => this.props.navigation.navigate('ProfileEdit',{
                    firstname:this.state.firstname,
                    lastname:this.state.lastname,
                    email:this.state.email,
                    phone:this.state.phone,
                    birth:this.state.birth,
                    username:this.state.username
                 })}}
                  />
             <Avatar
                     width={220}
                     height={215}
                     rounded
                     source={require('../images/foto.jpg')}
                     activeOpacity={0.7}
                     containerStyle={{marginTop:40,alignSelf:'center'}}
                  />
                <Text style={styles.ratingText}>{this.state.username}</Text>
                <List containerStyle={{marginTop: 30}}>
                    {
                        list.map((item, i) => (
                <ListItem 
                          key={i}
                          title={item.title}
                          leftIcon={{name: item.icon}}
                          rightTitle={item.attr}
                  />
                          ))
                    }
                </List>
         </ScrollView>
      
        );
}
  }


  styles = StyleSheet.create({
    ratingText: {
      alignSelf:'center',
      paddingTop:20,
      fontSize:30
    }
  })
