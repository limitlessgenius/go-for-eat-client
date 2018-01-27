import React, { Component } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import s from './styles';

class Event extends Component {

  render() {
    return  (
      <View style={s.event}>
        <View style={s.event_detail}>
          <Text style={s.event_detail_eventName}> Nome, Location Restaurant </Text>
          <Text style={s.event_detail_address}> Carrer Sant Martì 13, Barcelona </Text>
          <View style={s.event_detail_time}>
            <Text style={s.event_detail_time_text}> 23:45 </Text>
          </View>
        </View>
        <View style={s.event_distance}>
          <Text style={s.event_distance_number}> 203 </Text>
          <Text style={s.event_distance_text}> m </Text>
        </View>
        <View style={s.event_spots}>
          <Image style={s.event_spots_full} source={require('../../assets/icons/event_spot.png')}/>
          <Image style={s.event_spots_full} source={require('../../assets/icons/event_spot.png')}/>
          <Image style={s.event_spots_free} source={require('../../assets/icons/event_spot.png')}/>
          <Image style={s.event_spots_free} source={require('../../assets/icons/event_spot.png')}/>
        </View>
      </View>
    );
  }
}

export default Event;
