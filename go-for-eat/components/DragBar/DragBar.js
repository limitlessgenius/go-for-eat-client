import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import s from './styles';
import { getNearbyEvents } from '../../actions';
import { Event } from '../Event';
import _ from 'lodash';

class DragBar extends Component {
  constructor (props) {
    super(props);
  }


  render() {
    return  (
      <View>
        <View style={s.dragBar}>
          <View style={s.dragBar_bubble}>
            <View style={s.dragBar_line}></View>
          </View>
        </View>
        {this.props.events[0] ?
          <Event suggested={true}
            key={this.props.events[0].data[0]}
            eventID={this.props.events[0].data[0]}/>
          : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.pages.Home.events,
});

const mapDispatchToProps = (dispatch) => ({
  getNearbyEvents: (queryString) => dispatch(getNearbyEvents(queryString)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DragBar);
