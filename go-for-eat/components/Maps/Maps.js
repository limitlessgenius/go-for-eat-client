import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getNearbyEvents, setQueryState } from '../../actions';
import MapView from 'react-native-maps';
import s from './styles';
import moment from 'moment';
import _ from 'lodash';


class Maps extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const query = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          dist: 100000,
          to: Math.floor(new Date(moment().endOf('day')).getTime()/1000),
          from: Math.floor(new Date().getTime()/1000),
        };
        this.props.setQueryState(query);
        this.props.getNearbyEvents(query);
      }
    );
  }

  onRegionChange = async (region) => {
    const newQuery = {
      dist: (111.19*(region.latitudeDelta))*1000,
      to: Math.floor(new Date(moment().endOf('day')).getTime()/1000),
      from: Math.floor(new Date().getTime()/1000),
    };
    await this.props.setQueryState(newQuery);
    this.props.getNearbyEvents(this.props.query, true);
  };

  onMarkerPress = () => {
    console.log('hi');
  };

  render() {
    return this.props.query.lat ? (
      <MapView style={s.map}
        initialRegion={{
          latitude: this.props.query.lat,
          longitude: this.props.query.lng,
          latitudeDelta: 0.109,
          longitudeDelta: 0.106
        }}
        showsPointsOfInterest = {false}
        showsUserLocation = {true}
        showsCompass = {true}
        showsMyLocationButton = {true}
        onRegionChangeComplete={this.onRegionChange}
        onMarkerPress={this.onMarkerPress}
      ></MapView> ) :
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="large" color="#ffffff"/>
      </View>;
  }
}


const mapStateToProps = (state) => ({
  events: state.pages.Home.events,
  query: state.pages.Maps.query
});

const mapDispatchToProps = (dispatch) => ({
  setQueryState: (newQuery) => dispatch(setQueryState(newQuery)),
  getNearbyEvents: (queryString, distFetch) => dispatch(getNearbyEvents(queryString, distFetch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
