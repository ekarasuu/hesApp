import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Picker,
    KeyboardAvoidingView
  } from 'react-native';
import {  List, ListItem,Avatar,Header,Card,Button } from 'react-native-elements';
import '@expo/vector-icons';
import { DialogComponent }from 'react-native-dialog-component';
import { Icon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


 export default class Menu extends React.Component {
 


  constructor(props){
    super(props);
    this.state ={
      sicakList:[],
      sicakListPrice:[], 
      sogukList:[],
      sogukListPrice:[],
      yiyecekList:[],
      yiyecekListPrice:[],
      tatliList:[],
      tatliListPrice:[],
      salataList:[],
      salataListPrice:[]  ,
      displayed:false,
      PickerValue:1,
      dialogTitle:'',
      dialogPrice:'',
      urunPrice:'',
      count:0,
      masano:'',
      
 }
}

siparisVer = () =>  {

  fetch('http://172.20.10.12:3000/restaurant/basket',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
  },
      body:JSON.stringify({
      masa:this.state.masano,
      urun:this.state.dialogTitle,
      adet:this.state.PickerValue,
      fiyat:this.state.dialogPrice
 })
})
.then((response)=> response.json())
.then((res)=>{
 alert('Siparişiniz verilmiştir.')
})
.done();
}


     static navigationOptions = ({ navigation }) =>({
      tabBarIcon: ({ focused, tintColor }) => {
          return <Ionicons name="md-restaurant" size={35} color={tintColor} />
  }});

    ShowHideTextComponentSıcak = () =>{
     
      if(this.state.status == true)
      {
        this.setState({status: false})
      }
      else
      {
        this.setState({status:true})
        this.setState({status1:false})
        this.setState({status2: false})
        this.setState({status3:false})
        this.setState({status4:false})
      }
    }
    
    ShowHideTextComponentSoguk = () =>{
     
      if(this.state.status1 == true)
      {
        this.setState({status1: false})
      }
      else
      {
        this.setState({status:false})
        this.setState({status1:true})
        this.setState({status2: false})
        this.setState({status3:false})
        this.setState({status4:false})
      
      }
    }
    ShowHideTextComponentYiyecek = () =>{
     
      if(this.state.status2 == true)
      {
        this.setState({status2: false})
        
      }
      else
      {
        this.setState({status:false})
        this.setState({status1:false})
        this.setState({status2: true})
        this.setState({status3:false})
        this.setState({status4:false})
        
      }
    }
    ShowHideTextComponentTatli = () =>{
   
      if(this.state.status3 == true)
      {
        this.setState({status3: false})
      }
      else
      {
        this.setState({status:false})
        this.setState({status1:false})
        this.setState({status2: false})
        this.setState({status3:true})
        this.setState({status4:false})
      }
    }  
     ShowHideTextComponentSalata = () =>{
   
      if(this.state.status4 == true)
      {
        this.setState({status4: false})
      }
      else
      {
        this.setState({status:false})
        this.setState({status1:false})
        this.setState({status2: false})
        this.setState({status3:false})
        this.setState({status4:true})
      }
    }
   
    componentDidMount(){
      {this.fonksiyonBaglanti()};
    }
   
    
   
    
     
      render() {
        
    
      
        return (
          <ScrollView style={styles.scroll}> 
             <View style={styles.MainContainer}>
             <DialogComponent
                       dialogStyle={{backgroundColor:'#cce6ff',
                              borderRadius:15}}
                       titleTextStyle={{fontSize:23,color:'#000'}}
                       title={this.state.dialogTitle}
                       ref={(dialogComponent) => { this.dialogComponent = dialogComponent; }}
                           >
                           <View style={styles.addStyle}>
                           <Icon 
                                    name='remove-circle' 
                                    onPress={() => {this.eksiltFunc()}}
                                    size={35}
                                    containerStyle={{position:'absolute',marginLeft:100}}/>
                              
                              
                                     <View style={styles.pickerStyle}>
                                     <Text style={{fontSize:18,fontWeight: 'bold',}} onPress={this.kontrol}>{this.state.PickerValue} ADET</Text>
                                     </View>
                                      {this.renderModal()}
                            
                               <Icon
                                onPress={() => {this.arttirFunc()}}
                                name="add-circle" size={35}
                                containerStyle={{position: 'absolute', marginLeft:240}}
                                />
                                <Text name="fiyat" style={styles.priceStyle}>Toplam Fiyat:
                                <Text style={styles.para}> {this.textDondur()}</Text></Text>
                                </View>

                              <Button
                                     onPress={() => {
                                       this.siparisVer()
                                       }}
                                    icon={{
                                      name: 'add-shopping-cart',
                                      size: 15,
                                      color: 'white'
                                    }}
                                    title='SİPARİŞ VER'
   
                                    buttonStyle={{
                                      backgroundColor: "rgba(92, 99,216, 1)",
                                      width: 200,
                                      height: 45,
                                      borderColor: "transparent",
                                      borderWidth: 0,
                                      borderRadius: 8,
                                      marginTop:30,
                                      alignSelf:'center'

                                            }}
                                       />      
                                
              </DialogComponent>
             <Card
                        title='OSMANLI KAHVECİSİ'
                        titleStyle={{fontSize:23,fontFamily:'Verdana', backgroundColor:'#fff',color:'#ff6600'}}
                        wrapperStyle={{backgroundColor:'#fff',borderRadius:6}}
                        image={require('../images/osmanli2.jpg')}></Card>
               
                  <Button 
                  icon={{name: 'coffee', type: 'font-awesome'}}
                    title="SICAK İÇECEKLER" onPress={this.ShowHideTextComponentSıcak} 
                   buttonStyle={{borderRadius: 8,backgroundColor: "#ff6600",marginTop:20 }}
                   
                   />
                            {
                              this.state.status ? 
                              <List 
                              containerStyle={{marginTop:3,marginBottom:10}}>
                            {
                               this.state.sicakList.map((item, i) => (
                                 <ListItem onPress={() => {
                                  this.setState({dialogTitle:this.state.sicakList[i]})
                                  this.setState({PickerValue:1})
                                  this.setState({dialogPrice:this.state.sicakListPrice[i]})
                                  this.setState({urunPrice:this.state.sicakListPrice[i]})
                                 this.dialogComponent.show();
                               }}
                               key={i}
                               title={this.state.sicakList[i]}
                               rightTitle={this.state.sicakListPrice[i]}
                               />
                             ))
                            }
                      </List> :null
                            } 
                            <Button 
                            icon={{name: 'beer', type: 'font-awesome'}}
                            title="SOĞUK İÇECEKLER" onPress={this.ShowHideTextComponentSoguk}
                            buttonStyle={{marginTop:5,borderRadius:8,backgroundColor: "#ff6600"}} />
                            {
                              this.state.status1 ? 
                              <List 
                              containerStyle={{marginTop:3,marginBottom:10}} >
                            {
                               this.state.sogukList.map((item, i) => (
                           <ListItem 
                           onPress={() => {
                            this.setState({dialogTitle:this.state.sogukList[i]})
                            this.setState({PickerValue:1})
                             this.setState({dialogPrice:this.state.sogukListPrice[i]})
                            this.setState({urunPrice:this.state.sogukListPrice[i]})
                           this.dialogComponent.show();
                         }}
                               key={i}
                               title={this.state.sogukList[i]}
                               rightTitle={this.state.sogukListPrice[i]}
                               />
                             ))
                            }
                             </List> : null
                            }
                            <Button 
                            icon={{name:'pizza', type: 'material-community'}}
                            title="YİYECEKLER" onPress={this.ShowHideTextComponentYiyecek}
                            buttonStyle={{marginTop:5,borderRadius:8,backgroundColor: "#ff6600"}} />
                            {
                              this.state.status2 ? 
                              <List containerStyle={{marginTop:3,marginBottom:10}}>
                            {
                               this.state.yiyecekList.map((item, i) => (
                           <ListItem onPress={() => {
                             this.setState({dialogTitle:this.state.yiyecekList[i]})
                             this.setState({PickerValue:1})
                             this.setState({dialogPrice:this.state.yiyecekListPrice[i]})
                             this.setState({urunPrice:this.state.yiyecekListPrice[i]})
                            this.dialogComponent.show();
                          }}
                               key={i}

                                title={this.state.yiyecekList[i]}
                                rightTitle={this.state.yiyecekListPrice[i]}
                               />
                             ))
                             
                            }

                      </List> : null
                            }
                            <Button 
                            icon={{name: 'cake'}}
                            title="TATLILAR" onPress={this.ShowHideTextComponentTatli}
                            buttonStyle={{marginTop:5,borderRadius:8,backgroundColor: "#ff6600"}} />
                            {
                              this.state.status3 ? 
                              <List containerStyle={{marginTop:3,marginBottom:10}}>
                            {
                               this.state.tatliList.map((item, i) => (
                           <ListItem onPress={() => {
                            this.setState({dialogTitle:this.state.tatliList[i]})
                            this.setState({PickerValue:1})
                             this.setState({dialogPrice:this.state.tatliListPrice[i]})
                            this.setState({urunPrice:this.state.tatliListPrice[i]})
                           this.dialogComponent.show();
                         }}
                               key={i}
                               title={this.state.tatliList[i]}
                              
                               rightTitle={this.state.tatliListPrice[i]}
                               />
                             ))
                            }
                      </List> : null
                            }
         
                            <Button 
                            icon={{name: 'pagelines', type: 'font-awesome' }}
                            title="SALATALAR" onPress={this.ShowHideTextComponentSalata}
                            buttonStyle={{marginTop:5,borderRadius:8,backgroundColor: "#ff6600"}} />
                            {
                              this.state.status4 ? 
                              <List containerStyle={{marginTop:3,marginBottom:10}}>
                            {
                               this.state.salataList.map((item, i) => (
                           <ListItem onPress={() => {
                            this.setState({dialogTitle:this.state.salataList[i]})
                            this.setState({PickerValue:1})
                             this.setState({dialogPrice:this.state.salataListPrice[i]})
                            this.setState({urunPrice:this.state.salataListPrice[i]})
                           this.dialogComponent.show();
                         }}
                               key={i}
                               title={this.state.salataList[i]}
                               
                               rightTitle={this.state.salataListPrice[i]}
                               />
                             ))
                            }
  
                      </List> : null
                            }
               </View>
            </ScrollView>
          
        );
      }
      kontrol = () => {
        if(this.state.displayed){
          return
        }
        this.setState({displayed: true})
      }
      renderModal = () => {
        if(!this.state.displayed){
          return null
        }
        return <Picker
          selectedValue={this.state.PickerValue}
          onValueChange={
            (itemValue,itemIndex) => 
            
            this.setState({
              PickerValue:itemValue,
              displayed:false,
              dialogPrice:itemValue*this.state.urunPrice

            })
            
          }
         
          >
          <Picker.Item label="1" value={1}/>
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3}/>
          <Picker.Item label="4" value={4}/>
          <Picker.Item label="5" value={5} />
          <Picker.Item label="6" value={6}/>
          <Picker.Item label="7" value={7}/>
          <Picker.Item label="8" value={8} />
          <Picker.Item label="9" value={9}/>
        </Picker>
        {this.kontrol}
      }
    
      textDondur(){
        return <Text>
          {this.state.dialogPrice}
        </Text>
      }
   

      arttirFunc  (){
        if(this.state.PickerValue===10){
          return
        }
        this.setState(
          { PickerValue: this.state.PickerValue + 1 }, () => {
            this.setState(
              {dialogPrice:this.state.PickerValue*this.state.urunPrice}
          
        )
         
      
             })
            }
      eksiltFunc  (){
                 if(this.state.PickerValue===1){
                        return
        }
                 this.setState(
          { PickerValue: this.state.PickerValue - 1 }, () => {
            this.setState(
              {dialogPrice:this.state.PickerValue*this.state.urunPrice}
          
        )
                  }

     
                )}
    fonksiyonBaglanti()  {                                          
      var sicakListCopy=[];                                         
      var sicakListPriceCopy=[];                                   
      var sogukListCopy=[];
      var sogukListPriceCopy=[];
      var yiyecekListCopy=[];
      var yiyecekListPriceCopy=[];
      var tatliListCopy=[];
      var tatliListPriceCopy=[];
      var salataListeCopy=[];
      var salataListePriceCopy=[];
      const { navigation } = this.props;
      const qrcode = navigation.getParam('qrcode');
      const datano = navigation.getParam('datano');
      this.setState({masano:datano})
      
      var value='http://172.20.10.12:3000/restaurant/products/'+qrcode
      fetch(value)
      .then((response)=>response.json())
      .then((responseJson)=>{
        for (var i=0; i<responseJson.sonuc.length; i++){
              
            
             if(responseJson.sonuc[i].categories_id===1) {
                sicakListCopy.push(responseJson.sonuc[i].name)
                this.setState({sicakList:sicakListCopy})
              }  
             if(responseJson.sonuc[i].categories_id===1) {
                sicakListPriceCopy.push(responseJson.sonuc[i].price)
                this.setState({sicakListPrice:sicakListPriceCopy})
              }  
              if(responseJson.sonuc[i].categories_id===2) {
                sogukListCopy.push(responseJson.sonuc[i].name)
                this.setState({sogukList:sogukListCopy})
              }  
             if(responseJson.sonuc[i].categories_id===2) {
                sogukListPriceCopy.push(responseJson.sonuc[i].price)
                this.setState({sogukListPrice:sogukListPriceCopy})
              }       
             if(responseJson.sonuc[i].categories_id===3) {
                yiyecekListCopy.push(responseJson.sonuc[i].name)
                this.setState({yiyecekList:yiyecekListCopy})
             }  
             if(responseJson.sonuc[i].categories_id===3) {
                yiyecekListPriceCopy.push(responseJson.sonuc[i].price)
                this.setState({yiyecekListPrice:yiyecekListPriceCopy})
             }       
              if(responseJson.sonuc[i].categories_id===4) {
                tatliListCopy.push(responseJson.sonuc[i].name)
                this.setState({tatliList:tatliListCopy})
             }  
             if(responseJson.sonuc[i].categories_id===4) {
                tatliListPriceCopy.push(responseJson.sonuc[i].price)
                this.setState({tatliListPrice:tatliListPriceCopy})
              }       
             if(responseJson.sonuc[i].categories_id===5) {
                salataListeCopy.push(responseJson.sonuc[i].name)
                this.setState({salataList:salataListeCopy})
              }  
              if(responseJson.sonuc[i].categories_id===5) {
                salataListePriceCopy.push(responseJson.sonuc[i].price)
                this.setState({salataListPrice:salataListePriceCopy})
              }   
            }    
      } )
     .catch((error)=>{
        alert(error);
    })
     }   
    }
     const styles = StyleSheet.create({
      scroll:{
      flex:1,
      backgroundColor:'#e6e6e6'
      },
      MainContainer :{
      flex:1,
      marginTop:20,
      
       },
       pickerStyle:{
        alignSelf:'center',
         marginTop:10,

       },
       priceStyle:{
         marginTop:15,
         fontSize:18,
         fontWeight:'bold',
         alignSelf:'center',
         },
       para:{
         fontSize:25,
         
       },
      
       
        });
