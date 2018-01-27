import React, { Component } from 'react';
import { View, Text } from 'react-native';
import s from './styles';

class EventList extends Component {

  render() {
    return  (
      <View style={s.container}>
        <View style={s.map}>
          <Text style={s.map_text}> MAPPA </Text>
        </View>
      </View>
    );
  }
}

export default EventList;
