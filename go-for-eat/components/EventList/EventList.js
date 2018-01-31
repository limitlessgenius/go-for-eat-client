import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import serverHost from '../../config/serverHost.js';
import { getNearbyEvents } from '../../actions';
import { Event } from '../Event';
import moment from 'moment';
import _ from 'lodash';
import s from './styles';

class EventList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lat: 41.3949187,
      lng: 2.1957668,
      dist: 100000,
      to: Math.floor(new Date(moment().endOf('day')).getTime()/1000),
      from: Math.floor(new Date().getTime()/1000),
      eventsArray: [],
    }
  }

  componentDidMount(){
    this.props.getNearbyEvents(this.state)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.events !== this.props.events) {
      let eventsArray = _.values(nextProps.events);
      eventsArray.sort((a,b) =>{
        return a.distance - b.distance;
      });
      this.setState({
        eventsArray: eventsArray,
      })
    }
  }
// hello leo!
  loadMore = () => {
    console.log('loading more');
    // this.props.getNearbyEvents('')
  }

  render() {
    return  (
      <FlatList
        style={s.list}
        data={this.state.eventsArray}
        renderItem={({ item }) =>
        <Event key={item.event_id}
          eventData={item}
          users={this.props.users}
        />}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={item => item.event_id}
        onEndReached={this.loadMore}
        onEndThreshold={0}
        // ListFooterComponente={this.renderFooter}
      />
    );
  }

  renderFooter = () => {
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator animating size="large"/>
      </View>
    )
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
