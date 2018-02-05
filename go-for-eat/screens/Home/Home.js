import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import s from './styles';
import { Map } from '../../components/Map';
import { DragBar } from '../../components/DragBar';
import { EventList } from '../../components/EventList';
import Drawer from 'react-native-draggable-view';

let SCREEN_HEIGHT = Dimensions.get('window').height;

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    };
  }

  drawerDirection = (direction) => {
    this.setState({
      up: !this.state.up,
    });
  }

  render() {
    return  (
      <Drawer
        initialDrawerSize={.29}
        finalDrawerHeight={0}
        onRelease={this.drawerDirection}
        renderContainerView={() => <Map/>}
        renderDrawerView={() => (<Animatable.View
          duration={500}
          transition={['translateY', 'height']}
          style={{ height:this.props.open ? SCREEN_HEIGHT -485 : SCREEN_HEIGHT -235, transform: [{ translateY: this.props.open ? 215 : 0}]}}>
          <EventList/>
        </Animatable.View>
        )}
        renderInitDrawerView={() => (<Animatable.View
          duration={500}
          transition='translateY'
          style={{
            backgroundColor: '#2ECC71',
            height: 165,
            transform: [{ translateY:this.state.up ? 0 : this.props.open ? -215 : 0}],
          }}>
          <StatusBar
            barStyle="light-content"
          />
<<<<<<< HEAD
          <DragBar dragBarHeight={this.props.open || !this.props.events ? 0 : 40}/>
=======
          <DragBar dragBarHeight={this.props.open ? 0 : 40}/>
>>>>>>> 76b75df86b2a48a5bfe4f67741e5ddb52f6c103c
        </Animatable.View>)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  open: state.pages.Home.suggestedOpen,
  events: state.pages.Home.events,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
