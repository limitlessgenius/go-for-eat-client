import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import s from './styles';
import { Map } from '../../components/Map';
import { DragBar } from '../../components/DragBar';
import { EventList } from '../../components/EventList';
// import Drawer from 'react-native-draggable-view';
// import Drawer from '../../drawer';




class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return  (
      <View style={s.container}>
        <Map/>
        {/* <Drawer
          initialDrawerSize={0.09}
          renderContainerView={() => <Map/>}
          renderDrawerView={() => (
            <EventList/>)}
          renderInitDrawerView={() => (<View style={{
            backgroundColor: 'white',
            height: 66,
          }}>
            <StatusBar hidden={true} />
            <DragBar/>
          </View>)}
        /> */}
      </View>

    );
  }
}

export default Home;
