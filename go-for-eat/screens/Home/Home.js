import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import s from './styles';
import { Map } from '../../components/Map';
import { DragBar } from '../../components/DragBar';
import { EventList } from '../../components/EventList';
import Drawer from 'react-native-draggable-view';

class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return  (
      <Drawer
        initialDrawerSize={0.29}
        finalDrawerHeight={0}
        renderContainerView={() => <Map/>}
        renderDrawerView={() => <EventList/>}
        renderInitDrawerView={() => (<View style={{
          backgroundColor: 'white',
          height: 165,
          borderBottomWidth: 2,
          borderBottomColor: '#2ECC71',
          shadowColor: '#444',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        }}>
          <DragBar/>
        </View>)}
      />
    );
  }
}

export default Home;
