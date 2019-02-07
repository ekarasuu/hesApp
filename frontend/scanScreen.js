import React from 'react';
import { StyleSheet, Text, View,Image,AsyncStorage } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { NavigationActions } from 'react-navigation';


export default class BarcodeScannerExample extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        qrcode: '',
        datano:0
    }
}
 
 
  static navigationOptions = {
     tabBarIcon:({tintColor}) => (
        <Image
             source={require('../images/camera.png')}
             style={{width:40,height:40}}>
        </Image>
         )
     }


  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});

    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
         
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type ,data }) => {
    fetch('http://172.20.10.12:3000/restaurant/access',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
  },
      body:JSON.stringify({
      data:data,
  })
})

.then((response)=> response.json())
.then((res)=>{
  this.setState({qrcode:res.message.name})
  

  if(res.access === true){
    
    const setParamsAction = NavigationActions.setParams({
      
      
      params : {qrcode:this.state.qrcode,
      datano:data},
      key:'Menu',
      
   
      
    });
    const setParamsAction1 = NavigationActions.setParams({
      
      
      params : {qrcode:this.state.qrcode,
      datano:data},
      key:'Adisyon',
      
    
      
    });
  
    
    this.props.navigation.dispatch(setParamsAction);
    this.props.navigation.dispatch(setParamsAction1);
    this.props.navigation.navigate('MenuNav');
  }
  
  else{
      alert(res.message);
  }
})
.done();
}
}
