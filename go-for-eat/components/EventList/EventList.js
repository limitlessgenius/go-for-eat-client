import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, ActivityIndicator } from 'react-native';

import { Event } from '../Event';
import _ from 'lodash';
import s from './styles';

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
  }

class EventList extends Component {
  _keyExtractor = (item, index) => item.id;
  renderSeparator = () => {
      return (
          <View
              style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#2ECC71",
              }}
          />
      );
  };
  render() {
    return  (
      <FlatList
        style={s.list}
        data={[{id: 1, ...event}, {id: 2, ...event},{id: 3, ...event},{id: 4, ...event},{id: 5, ...event},{id: 6, ...event}]}
        renderItem={({ item }) =>
          <Event key={item.id} eventData={item}/>
        }
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

export default EventList;
