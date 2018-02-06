import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  View,
  FlatList,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  PixelRatio
} from 'react-native';
import Qs from 'qs';
import geolib from 'geolib';

import debounce from 'lodash.debounce';
import s from './styles';

const WINDOW = Dimensions.get('window');

class GooglePlacesAutocomplete extends Component {
  _isMounted = false;
  _results = [];
  _requests = [];

  constructor (props) {
    super(props);
    this.state = this.getInitialState.call(this);
  }

  getInitialState = () => ({
    text: this.props.text,
    dataSource: [],
    listViewDisplayed: false,
    query: {
      key: 'AIzaSyAcLjRWKGZ5-pzYoV-bDHikVBkhCh2pcD0',
      language: 'en',
    },
    position: {
      lat: '',
      lng: '',
    },
  })

  buildRowsFromResults = (results) => {
    let res = [];

    return [...res, ...results];
  }

  componentWillMount() {
    this._request = debounce(this._request, 200);
    this.getCurrentLocation();
  }

  componentDidMount() {
    this._isMounted = true;
    this._onChangeText(this.state.text);
  }

  componentWillUnmount() {
    this._abortRequests();
    this._isMounted = false;
  }

  _abortRequests = () => {
    this._requests.map(i => i.abort());
    this._requests = [];
  }

  triggerFocus = () => {
    if (this.refs.textInput) this.refs.textInput.focus();
  }

  triggerBlur = () => {
    if (this.refs.textInput) this.refs.textInput.blur();
  }

  getCurrentLocation = () => {
    let options = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000
    };

    if (Platform.OS === 'android') {
      options = {
        enableHighAccuracy: true,
        timeout: 20000
      };
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          position: {lat: position.coords.latitude, lng: position.coords.longitude},
        });
      },
      (error) => {
        this._disableRowLoaders();
        alert(error.message);
      },
      options
    );
  }

  _onPress = (rowData) => {
    if (rowData.isLoading === true) {
      return;
    }
    this._abortRequests();
    // display loader
    this._enableRowLoader(rowData);
    // fetch details
    const request = new XMLHttpRequest();
    this._requests.push(request);
    request.timeout = this.props.timeout;
    request.ontimeout = this.props.onTimeout;
    request.onreadystatechange = () => {
      if (request.readyState !== 4) return;
      if (request.status === 200) {
        const responseJSON = JSON.parse(request.responseText);
        if (responseJSON.status === 'OK') {
          if (this._isMounted === true) {
            const details = responseJSON.result;
            this._disableRowLoaders();
            this._onBlur();

            this.setState({
              text: rowData.name,
            });

            delete rowData.isLoading;
            this.props.onPress(rowData, details);
          }
        } else {
          this._disableRowLoaders();
          console.warn('error', responseJSON);
        }
      } else {
        this._disableRowLoaders();
        console.warn('Google places autocomplete: request could not be completed or has been aborted');
      }
    };
    request.open('GET', 'https://maps.googleapis.com/maps/api/place/details/json?' + Qs.stringify({
      key: this.state.query.key,
      placeid: rowData.place_id,
      language: this.state.query.language,
    }));
    request.send();
  }

  _enableRowLoader = (rowData) => {
    let rows = this.buildRowsFromResults(this._results);
    for (let i = 0; i < rows.length; i++) {
      if ((rows[i].place_id === rowData.place_id) || (rows[i].isCurrentLocation === true && rowData.isCurrentLocation === true)) {
        rows[i].isLoading = true;
        this.setState({
          dataSource: rows,
        });
        break;
      }
    }
  }

  _disableRowLoaders = () => {
    if (this._isMounted === true) {
      for (let i = 0; i < this._results.length; i++) {
        if (this._results[i].isLoading === true) {
          this._results[i].isLoading = false;
        }
      }

      this.setState({
        dataSource: this.buildRowsFromResults(this._results),
      });
    }
  }

  _request = (latitude, longitude, text) => {
    this._abortRequests();
    if (text.length >= 2) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = 20000;
      request.ontimeout = () => console.warn('google places autocomplete: request timeout');
      request.onreadystatechange = () => {
        if (request.readyState !== 4) return;
        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);
          this._disableRowLoaders();
          if (typeof responseJSON.results !== 'undefined') {
            if (this._isMounted === true) {
              var results = responseJSON.results;
              this.setState({
                dataSource: this.buildRowsFromResults(results),
              });
            }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            console.warn('google places autocomplete: ' + responseJSON.error_message);
          }
        } else {
          // console.warn('google places autocomplete: request could not be completed or has been aborted');
        }
      };
      let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + Qs.stringify({
        location: latitude + ',' + longitude,
        radius: 5000,
        key: this.state.query.key,
        language: this.state.query.language,
        keyword: text,
        type: 'restaurant',
      });
      request.open('GET', url);
      request.send();
    } else {
      this._results = [];
      this.setState({
        dataSource: [],
      });
    }
  }

  _onChangeText = (text) => {
    this._request(this.state.position.lat, this.state.position.lng, text);
    this.setState({
      text: text,
    });
    if (text.length >= 2) {
      this.setState({
        listViewDisplayed: true,
      });
    }
  }

  _handleChangeText = (text) => {
    this._onChangeText(text);

    const onChangeText = this.props
      && this.props.textInputProps
      && this.props.textInputProps.onChangeText;

    if (onChangeText) {
      onChangeText(text);
    }
  }

  _getRowLoader() {
    return (
      <ActivityIndicator
        animating={true}
        size="small"
      />
    );
  }

  _renderLoader = (rowData) => {
    if (rowData.isLoading === true) {
      return (
        <View style={s.loader}>
          {this._getRowLoader()}
        </View>
      );
    }

    return null;
  }

  _renderRow = (rowData = {}, sectionID, rowID) => {
    let distance = geolib.getDistance(
      {latitude: this.state.position.lat, longitude: this.state.position.lng},
      {latitude: rowData.geometry.location.lat, longitude:rowData.geometry.location.lng}
    );

    return (
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={true}
        keyboardShouldPersistTaps={'handled'}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <TouchableHighlight
          style={{ width: WINDOW.width }}
          onPress={() => this._onPress(rowData)}
          underlayColor={'#c8c7cc'}
        >
          <View style={s.row}>
            <View style={s.rowLeft}>
              <Text style={s.PlaceListItemName}>{rowData.name}</Text>
              <Text style={s.PlaceListItemAddress}>{rowData.vicinity}</Text>
            </View>
            <View style={s.rowRight}>
              <Text style={s.PlaceListItemDistance}>{(distance > 1000) ? (String((distance/1000).toFixed(2))) : distance}</Text>
              <Text style={s.PlaceListItemDistance}>{(distance > 1000) ? 'Km' : 'm'}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }

  _renderSeparator = (sectionID, rowID) => {
    if (rowID == this.state.dataSource.length - 1) {
      return null
    }

    return (
      <View
        key={ `${sectionID}-${rowID}` }
        style={s.separator} />
    );
  }

  _onBlur = () => {
    this.triggerBlur();

    this.setState({
      listViewDisplayed: false
    });
  }

  // _onFocus = () => this.setState({ listViewDisplayed: true })

  _getFlatList = () => {
    const keyGenerator = () => (
      Math.random().toString(36).substr(2, 10)
    );

    if (this.state.text !== '' && this.state.listViewDisplayed === true) {
      return (
        <View style={s.listViewContainer} >
          <FlatList
            style={s.listView}
            data={this.state.dataSource}
            keyExtractor={keyGenerator}
            extraData={this.state.dataSource}
            ItemSeparatorComponent={this._renderSeparator}
            renderItem={({ item }) => this._renderRow(item)}
            keyboardDismissMode={'on-drag'}
            keyboardShouldPersistTaps={'handled'}
          />
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={s.container} >
        <View style={s.textInputContainer} >
          <TextInput
            ref="textInput"
            returnKeyType={'search'}
            autoFocus={true}
            style={s.textInput}
            value={this.state.text}
            placeholder='Search...'
            placeholderTextColor='grey'
            onFocus={this._onFocus}
            clearButtonMode="while-editing"
            underlineColorAndroid='red'
            onChangeText={this._handleChangeText}
          />
        </View>
        {this._getFlatList()}
      </View>
    );
  }
}

export default GooglePlacesAutocomplete;