import React, { Component } from 'react';
import { View, Text } from 'react-native';
import s from './styles';

class DragBar extends Component {

  render() {
    return  (
      <View style={s.list_dragBar}>
        <View style={s.list_dragBar_line}></View>
      </View>
    );
  }
}

export default DragBar;
