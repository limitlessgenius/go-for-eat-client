import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { DragBar } from '../../components/DragBar';

import { Event } from '../Event';
import _ from 'lodash';
import s from './styles';

class EventList extends Component {

  render() {
    return  (
      <ScrollView style={s.list}>
        {  _.range(5).map((el) => {
          return  <Event key={el} />;
        })}
        <Event/>
      </ScrollView>
    );
  }
}

export default EventList;
