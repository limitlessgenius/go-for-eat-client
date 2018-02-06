import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView,TouchableWithoutFeedback, Image, Text } from 'react-native';
import s from './styles';
import { toggleDetails } from '../../actions';
import { EventDetail } from '../EventDetail';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';

class Event extends Component {
  constructor(props){
    super(props);
    this.state = {
      openDetails: false,
      height: 120,
    };
  }

  renderInnerEvent = (eventData) => {
    return(
      <EventDetail key={eventData._id} eventData={eventData}/>
    );};

  render() {
    const eventData = this.props.events[this.props.eventID];
    if (eventData === undefined) return null;
    return (
      <Animatable.View duration={500} transition='height' style={{height: this.state.height}}>
        <TouchableWithoutFeedback
          onPress={()=>{
            this.setState({
              height: !this.state.openDetails ? 370 : 120,
              openDetails: !this.state.openDetails,
            });
            if (this.props.suggested) {
              this.props.toggleDetails();
            }
          }}>
          <View style={s.event}>
            <View style={s.event_detail}>
              <Text numberOfLines={1} style={s.event_detail_eventName}> {this.props.users[eventData.creator].name}, {eventData.place_name} </Text>
              <Text numberOfLines={1} style={s.event_detail_address}> {eventData.place_address}  </Text>
              <View style={s.event_detail_time}>
                <Text style={s.event_detail_time_text}> {moment(eventData.when).format('HH:mm')} </Text>
              </View>
            </View>
            <View style={s.event_distance}>
              <Text style={s.event_distance_number}> {Math.round((eventData.distance/1000) * 100) / 100}</Text>
              <Text style={s.event_distance_text}> km </Text>
            </View>
            <View style={s.event_spots}>
              {_.range(4).map(i => {
                return eventData.attendees[i] ?
                  <Image key={i} style={s.event_spots_full} source={require('../../assets/icons/event_spot.png')}/> :
                  <Image key={i} style={s.event_spots_free} source={require('../../assets/icons/event_spot.png')}/>;
              })}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View>
          {this.state.openDetails ?
            this.renderInnerEvent(eventData)
            : null}
        </View>
      </Animatable.View>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.entities.events,
  users: state.entities.users,
  user: state.authentication.user,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDetails: () => dispatch(toggleDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
