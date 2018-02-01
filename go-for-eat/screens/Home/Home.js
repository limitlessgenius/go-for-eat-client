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
    console.log('HOME');
    this.state = {
      dSize: .29,
      dHeight: 165,
    };
  }

  openDetails = () => {
    // this.setState({
    //   dSize: .59,
    //   dHeight: 400,
    // })
  }

  render() {
    return  (
      <Drawer
        initialDrawerSize={this.state.dSize}
        finalDrawerHeight={0}
        renderContainerView={() => <Map/>}
        renderDrawerView={() => <EventList/>}
        renderInitDrawerView={() => (<View style={{
          backgroundColor: 'white',
          height: this.state.dHeight,
          borderBottomWidth: 2,
          borderBottomColor: '#2ECC71',
          shadowColor: '#444',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        }}>
          <DragBar openDetails={this.openDetails}/>
        </View>)}
      />
    );
  }
}

export default Home;
