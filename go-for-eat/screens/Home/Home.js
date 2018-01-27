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
        initialDrawerSize={0.1}
        renderContainerView={() => <Map/>}
        renderDrawerView={() => (
          <EventList/>)}
        renderInitDrawerView={() => (<View style={{
          backgroundColor: 'white',
          height: 100,
        }}>
          <StatusBar hidden={true} />
          <DragBar/>
        </View>)}
      />
    );
  }
}

export default Home;
