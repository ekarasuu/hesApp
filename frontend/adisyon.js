import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity
  } from 'react-native';

  import {  Card,Icon,Button,Image} from 'react-native-elements';
  import { NavigationActions } from 'react-navigation';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  
  export default class Adisyon extends React.Component {
    constructor(props){
        super(props)
     this.state = {
       adet:1,
       urun:"",
       fiyat:"",
       adetList:[],
       urunList:[],
       fiyatList:[],
       masano:''
       

          }
    }
    componentDidMount(){
       this.yenile()
 
     }

    yenile() {
      var urunListCopy=[]; 
      var adetListCopy=[];   
      var fiyatListCopy=[];   

      const { navigation } = this.props;
      const datano = navigation.getParam('datano');
      this.setState({masano:datano})


      var value='http://172.20.10.12:3000/restaurant/order/'+datano
      fetch(value)
      .then((response)=>response.json())
      .then((responseJson)=>{
        if(responseJson.sonuc){
         
        
        for (var i=0; i<responseJson.sonuc.length; i++){
          urunListCopy.push(responseJson.sonuc[i].urun_adi)
          this.setState({urunList:urunListCopy})
          adetListCopy.push(responseJson.sonuc[i].adet)
          this.setState({adetList:adetListCopy})
          fiyatListCopy.push(responseJson.sonuc[i].fiyat)
          this.setState({fiyatList:fiyatListCopy})
        }
      }
      else{
          urunListCopy=["Sepetinizde ürün bulunmamaktadır."];
          adetListCopy=[];
          fiyatListCopy=[];
          this.setState({
            urunList:urunListCopy,
            adetList:adetListCopy,
            fiyatList:fiyatListCopy
          })
      }
    })
      
      .catch((error)=>{
        alert(error);
    })
     }   

    payment = () => {
   
      fetch('http://172.20.10.12:3000/restaurant/payment',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
      },
          body:JSON.stringify({
          masa:this.state.masano
          
      })
  })
  .then((response)=> response.json())
  .then((res)=>{
      

      if(res.payment === true){
         alert('Hesabınız ödenmiştir')
         {this.yenile()}
      }
      else{
          alert("hata");
      }
  })
  .done();
}

    

    
     static navigationOptions = ({ navigation }) =>({
      tabBarIcon: ({ focused, tintColor }) => {
          return <Ionicons name="ios-basket" size={35} color={tintColor} />
  }});

    

    render() {
            return (
          <ScrollView>
            <ScrollView >
            <Card title="ADİSYON" dividerStyle={{backgroundColor:'#ff6600'}}
                                titleStyle={{ flex:1,color:'#000',fontSize: 19,fontFamily: 'Arial',
                                                            fontWeight: 'bold',}} 
                                                            containerStyle={{ flex:1,
                                                              backgroundColor:'#d5d5d5',
                                                              borderRadius: 4,
                                                              borderWidth: 1,
                                                              borderColor: '#ff6600',
                                                              margin:10,
                                                              marginTop:60}
                                                              } >
                                {  
                           this.state.urunList.map((u, i) => {
                      return (
                        <View key={i} style={styles.list}>             
                           <Text style={styles.name}> </Text>
                           <Text> {this.state.adetList[i]}     </Text>
                           <Text>{this.state.urunList[i]}</Text>
                           <Text style={{textAlign: 'right'}}>₺{this.state.fiyatList[i]} </Text>
        </View>
      );
    })
  }
  <Button
   onPress={()=>{this.yenile()}}
    buttonStyle={{borderRadius: 8,
      backgroundColor: "#ff6600",
      marginTop:20,
      marginLeft:20,
      marginRight:20,
      flex:1,
      flexDirection:'column'
    }}
      title='YENİLE' />
 </Card>

   <Button
   onPress={()=>{this.payment()}}
    buttonStyle={{borderRadius: 8,flex:5,
      backgroundColor: "#ff6600",
      marginTop:20,
      marginLeft:40,
      marginRight:40,
      alignSelf:'center'
    }}
      title='ÖDEME YAP' />
            </ScrollView>
       </ScrollView>

      );
}

}


const styles =StyleSheet.create({
  list:{
      
  },
  name:{
    fontSize:20
  },
  adet:{
    marginLeft:100,
    color:'red',
    alignSelf:'stretch',

  },
  fiyat:{
    textAlign:'right',
    color:'blue'
  }
})
