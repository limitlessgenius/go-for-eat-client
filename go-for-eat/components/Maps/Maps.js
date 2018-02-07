import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getNearbyEvents, setQueryState, setMainEvent, disableReloadEvents } from '../../actions';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import s from './styles';
import moment from 'moment';
import _ from 'lodash';
import MapPinImage from '../../assets/icons/map_pin.png';
import MapCenter from '../../assets/icons/map_center.png';
import * as Animatable from 'react-native-animatable';



class Maps extends Component {
  constructor (props) {
    super(props);
    this.state = {
      moving: false,
    };
  }

  getInitialState() {
    return {
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      }),
    };
  }

  componentDidMount () {
    const query = {
      lat: this.props.user.position.lat,
      lng: this.props.user.position.lng,
      dist: 2000,
      to: new Date(moment().endOf('day')).getTime(),
      from: new Date().getTime(),
    };
    this.props.setQueryState(query);
    this.props.getNearbyEvents(query);
  }

  componentDidUpdate() {
    if (this.props.reloadEvents) {
      this.props.disableReloadEvents();
      this.props.getNearbyEvents(this.props.query, true);
    }
  }

  onRegionChangeComplete = async (region) => {
    if (this.state.moving) {
      this.setState({
        moving: false,
      });
    }
    const newQuery = {
      lat: region.latitude,
      lng: region.longitude,
      dist: (111.19*(region.latitudeDelta))*1000,
      to: new Date(moment().endOf('day')).getTime(),
      from: new Date().getTime(),
    };
    await this.props.setQueryState(newQuery);
    this.props.getNearbyEvents(this.props.query, true);
  };


  renderMarkers = () => {
    return this.props.mapsEvents.map((id, i) => {
      const event = this.props.events[id];
      return (
        <Marker
          coordinate={{
            latitude: event.location.coordinates[1],
            longitude: event.location.coordinates[0]
          }}
          image={MapPinImage}
          identifier= {id}
          onPress={e => this.onMarkerPress(e.nativeEvent.id)}
          key={id}
        />
      );
    });
  }

  onMarkerPress = (id) => {
    this.props.setMainEvent(id);
  };

  onRegionChange = () => {
    if (!this.state.moving) {
      this.setState({
        moving: true,
      });
    }
  }

  nearMe = () => {
    const query = this.props.query;
    const userPos = this.props.user.position;
    if (
      Math.round(query.lat*10000) < (Math.round(userPos.lat*10000) + 10)
      && Math.round(query.lat*10000) > (Math.round(userPos.lat*10000) - 10)
      && Math.round(query.lng*10000) < (Math.round(userPos.lng*10000) + 10)
      && Math.round(query.lng*10000) > (Math.round(userPos.lng*10000) - 10)
    ) {
      return true;
    }
    return false;
  }

  render() {
    return (this.props.events && this.props.query.lat &&  this.props.query.lng) ? (
      <MapView style={s.map}
        mapType={Platform.OS == 'android' ? 'none': 'standard'}
        initialRegion={{
          latitude: this.props.query.lat,
          longitude: this.props.query.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.01
        }}
        showsPointsOfInterest = {false}
        showsUserLocation = {true}
        showsCompass = {false}
        showsMyLocationButton = {false}
        onRegionChangeComplete={this.onRegionChangeComplete}
        onRegionChange={this.onRegionChange}
      >
        <Animatable.Image
          easing='ease-in-out'
          duration={300}
          transition={['scale','opacity']}
          style={this.nearMe() ? s.center__hide : this.state.moving ? s.center__onMove : s.center}
          source={MapCenter}>
        </Animatable.Image>
        {this.renderMarkers()}
      </MapView> ) :
      (<View style={{paddingVertical: 20}}>
        <ActivityIndicator size="large" color="#ffffff"/>
      </View>);
  }
}

const mapStateToProps = (state) => ({
  sections: state.pages.Home.events,
  query: state.pages.Maps.query,
  events: state.entities.events,
  user: state.authentication.user,
  reloadEvents: state.pages.Home.reloadEvents,
  mapsEvents: state.pages.Maps.events,
});

const mapDispatchToProps = (dispatch) => ({
  setQueryState: (newQuery) => dispatch(setQueryState(newQuery)),
  setMainEvent: (id) => dispatch(setMainEvent(id)),
  getNearbyEvents: (queryString, distFetch) => dispatch(getNearbyEvents(queryString, distFetch)),
  disableReloadEvents: () => dispatch(disableReloadEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
