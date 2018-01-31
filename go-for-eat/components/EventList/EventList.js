import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import serverHost from '../../config/serverHost.js';
import { getNearbyEvents } from '../../actions';
import { Event } from '../Event';
import _ from 'lodash';
import s from './styles';

class EventList extends Component {
  constructor (props) {
    super(props)
    this.props.getNearbyEvents('')
    this.state = {
      eventsArray: [],
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.events !== this.props.events) {
      let eventsArray = _.values(this.props.events);
      eventsArray.sort((a,b) =>{
        return a.distance - b.distance;
      });
      this.setState({
        eventsArray: eventsArray,
      })
    }
  }

  _keyExtractor = (item, index) => item.event_id;

  render() {
    return  (
      <FlatList
        style={s.list}
        data={[...this.state.eventsArray]}
        renderItem={({ item }) => <Event key={item.event_id} eventData={item} users={this.props.users}/>
        }
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this._keyExtractor}
      />
    );
  }
  renderSeparator = () => {
    return (
      <View
        style={{height: 1,width: "100%",backgroundColor: "#2ECC71",}}
      />
  )};
}

const mapStateToProps = (state) => ({
  users: state.entities.users,
  events: state.entities.events
});

const mapDispatchToProps = (dispatch) => ({
  getNearbyEvents: (queryString) => dispatch(getNearbyEvents(queryString)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
