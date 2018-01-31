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
    this.props.getNearbyEvents('');
    this.state = {
      eventsArray: [],
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.events !== this.props.events) {
      let eventsArray = _.values(this.props.events);
      eventsArray.sort((a,b) =>{
        return a.distance - b.distance;
      });
      this.setState({
        eventsArray: eventsArray,
      });
    }
  }

  render() {
    return  (
      <View>
        <View style={s.dragBar}>
          <View style={s.dragBar_bubble}>
            <View style={s.dragBar_line}></View>
          </View>
        </View>
        {this.state.eventsArray[0] ?
          <Event key={this.state.eventsArray[0].event_id} eventData={this.state.eventsArray[0]} users={this.props.users}/>
          : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.entities.users,
  events: state.entities.events
});

const mapDispatchToProps = (dispatch) => ({
  getNearbyEvents: (queryString) => dispatch(getNearbyEvents(queryString)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DragBar);
