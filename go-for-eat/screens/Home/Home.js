import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import s from './styles';
import { Maps } from '../../components/Maps';
import { DragBar } from '../../components/DragBar';
import { EventList } from '../../components/EventList';
import Drawer from 'react-native-draggable-view';

let SCREEN_HEIGHT = Dimensions.get('window').height;

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  drawerDirection = (direction) => {
    this.setState({
      up: !this.state.up,
    });
  }

  render() {

    return  (
      <Drawer
        initialDrawerSize={-(3/7250)*SCREEN_HEIGHT+.626}
        finalDrawerHeight={0}
        onRelease={this.drawerDirection}
        drawerBg='#2ECC71'
        renderContainerView={() => <Maps/>}
        renderDrawerView={() => (<Animatable.View
          duration={500}
          transition={['translateY', 'height']}
          style={{ height:this.props.open ? SCREEN_HEIGHT -450 : SCREEN_HEIGHT -235, transform: [{ translateY: this.props.open ? 215 : 0}]}}>
          <EventList
            up={this.state.up}
          />
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
          <DragBar dragBarHeight={this.props.open || !this.props.events ? 0 : 40}/>
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
