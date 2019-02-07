import React, { Component } from 'react';
import { ScrollView , Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class LogOut extends React.Component {
    static navigationOptions = {
        tabBarIcon:({tintColor}) => (
            <Image
                 source={require('../images/logout.png')}
                 style={{width:40,height:40}}>
            </Image>
            )
    }
    render() {
        return (
          <ScrollView>
            <List containerStyle={{marginTop: 60}}>
              <ListItem
                title={"Notifications"}
                onPress={() => alert('v.001') }
              />
              <ListItem
                title="Profile"
              />
              <ListItem
                title="Password change"
              />
            </List>
            <List containerStyle={{marginTop: 30}}>
              <ListItem
               onPress={() => this.props.navigation.navigate('Login') }
                title="Sign Out"
                rightIcon={{ name: 'cancel' }}
              />
            </List>
          </ScrollView>
        );
      }
    }
