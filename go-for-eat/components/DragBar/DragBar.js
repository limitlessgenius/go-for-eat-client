import React, { Component } from 'react';
import { View, Text } from 'react-native';
import s from './styles';
import { Event } from '../Event';

const event = {
  // id: 'event_id',
  creator_name: 'Leonardo',
  place_name: 'MamasBurger',
  place_address:'Carrer de Sant Martì 13, Barcellona',
  when: '1517518800',
  partecipants:[
    {name:'Leonardo', img:'url'},
    {name:'Hanna', img:'url'}
  ],
  distance:{lat:43.8379125, lng:10.4888985}
};

class DragBar extends Component {

  render() {
    return  (
      <View>
        <View style={s.dragBar}>
          <View style={s.dragBar_bubble}>
            <View style={s.dragBar_line}></View>
            {/* <View style={s.dragBar_line}></View> */}
          </View>
        </View>
        <Event key={event.id} eventData={event}/>
      </View>
    );
  }
}

export default DragBar;
