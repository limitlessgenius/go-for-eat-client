import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getNearbyEvents, disableReloadEvents } from '../../actions';

import s from './styles';
import moment from 'moment';
import _ from 'lodash';


class Maps extends Component {
  constructor (props) {
    super(props);
    this.state = {
      lat: 41.3949187, //get from google
      lng: 2.1957668, //get from google
      dist: 100000, //get from google
      to: new Date(moment().endOf('day')).getTime(),
      from: new Date().getTime(),
    };
  }

  componentDidMount(){
    this.props.getNearbyEvents(this.state);
  }

  componentDidUpdate() {
    if (this.props.reloadEvents) {
      console.log('reload');
      this.props.disableReloadEvents();
      this.props.getNearbyEvents(this.state, true);
    }
  }

  render() {
    return  (
      <View style={s.map}>
        <Text style={s.map_text}> MAPA </Text>
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  events: state.pages.Home.events,
  routes: state.nav.routes,
  reloadEvents: state.pages.Home.reloadEvents,
});

const mapDispatchToProps = (dispatch) => ({
  getNearbyEvents: (queryString) => dispatch(getNearbyEvents(queryString)),
  disableReloadEvents: () => dispatch(disableReloadEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
