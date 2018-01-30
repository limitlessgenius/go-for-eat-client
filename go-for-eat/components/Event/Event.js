import React, { Component } from 'react';
import { View, ScrollView,TouchableWithoutFeedback, Image, Text } from 'react-native';
import s from './styles';
import { EventDetail } from '../EventDetail'
import moment from 'moment'
import _ from 'lodash';

class Event extends Component {
  constructor(props){
    super(props);
    this.state = {
      openDetails: false,
    };
  }

  renderInnerEvent = () => {
    return(
      <EventDetail dataEvent={this.props.dataEvent}/>
    )};

  render() {
    return this.props.eventData ?
      (
        <View style={this.state.openDetails ?  { height : 370 } : { height : 120 }}>
          <TouchableWithoutFeedback  onPress={()=>{
            this.setState({
              openDetails: !this.state.openDetails,
            });
          }}>
            <View style={s.event}>
              <View style={s.event_detail}>
                <Text style={s.event_detail_eventName}> {this.props.eventData.creator_name}, {this.props.eventData.place_name} </Text>
                <Text style={s.event_detail_address}> {this.props.eventData.place_address}  </Text>
                <View style={s.event_detail_time}>
                  <Text style={s.event_detail_time_text}> 23:45 </Text>
                </View>
              </View>
              <View style={s.event_distance}>
                <Text style={s.event_distance_number}> 203 </Text>
                <Text style={s.event_distance_text}> m </Text>
              </View>
              <View style={s.event_spots}>
                {_.range(4).map(i => {
                  return this.props.eventData.partecipants[i] ?
                  <Image key={i} style={s.event_spots_full} source={require('../../assets/icons/event_spot.png')}/> :
                  <Image key={i} style={s.event_spots_free} source={require('../../assets/icons/event_spot.png')}/>
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View>
            {this.state.openDetails ?
              this.renderInnerEvent()
              : null}
          </View>
        </View>
      ) :
      null;
    }
}

export default Event;
