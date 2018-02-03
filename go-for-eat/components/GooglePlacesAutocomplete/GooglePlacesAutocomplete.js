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
    text: '',
    dataSource: [],
    listViewDisplayed: false,
  })

  // setAddressText = address => this.setState({ text: address })

  // getAddressText = () => this.state.text

  buildRowsFromResults = (results) => {
    let res = [];

    if (results.length === 0) {
      res = [...this.props.predefinedPlaces];
    }

    res = res.map(place => ({
      ...place,
      isPredefinedPlace: true
    }));

    return [...res, ...results];
  }

  componentWillMount() {
    this._requestNearby = debounce(this._requestNearby, 200);
    this.getCurrentLocation();
  }

  componentDidMount() {
    // This will load the default value's search results after the view has
    // been rendered
    this._isMounted = true;
    // this._onChangeText(this.state.text);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.listViewDisplayed !== 'auto') {
  //     this.setState({
  //       listViewDisplayed: nextProps.listViewDisplayed,
  //     });
  //   }

  //   if(typeof(nextProps.text) !== "undefined" && this.state.text !== nextProps.text) {
  //     this.setState({
  //       listViewDisplayed:true
  //     }, this._handleChangeText(nextProps.text));
  //   }
  // }

  // componentWillUnmount() {
  //   this._abortRequests();
  //   this._isMounted = false;
  // }

  _abortRequests = () => {
    this._requests.map(i => i.abort());
    this._requests = [];
  }

  // /**
  //  * This method is exposed to parent components to focus on textInput manually.
  //  * @public
  //  */
  // triggerFocus = () => {
  //   if (this.refs.textInput) this.refs.textInput.focus();
  // }

  // /**
  //  * This method is exposed to parent components to blur textInput manually.
  //  * @public
  //  */
  // triggerBlur = () => {
  //   if (this.refs.textInput) this.refs.textInput.blur();
  // }

  getCurrentLocation = () => {
    let options = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000
    };

    if (this.props.enableHighAccuracyLocation && Platform.OS === 'android') {
      options = {
        enableHighAccuracy: true,
        timeout: 20000
      }
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          position: {lat: position.coords.latitude, lng: position.coords.longitude},
        });
      },
      (error) => {
        // this._disableRowLoaders();
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
    this.setState({
      text: rowData.description,
    });
  }

  //     // display loader
  //     this._enableRowLoader(rowData);

  //     // fetch details
  //     const request = new XMLHttpRequest();
  //     this._requests.push(request);
  //     request.timeout = 20000;
  //     request.ontimeout = this.props.onTimeout;
  //     request.onreadystatechange = () => {
  //       if (request.readyState !== 4) return;

  //       if (request.status === 200) {
  //         const responseJSON = JSON.parse(request.responseText);

  //         if (responseJSON.status === 'OK') {
  //           if (this._isMounted === true) {
  //             const details = responseJSON.result;
  //             this._disableRowLoaders();
  //             this._onBlur();

  //             this.setState({
  //               text: this._renderDescription( rowData ),
  //             });

  //             delete rowData.isLoading;
  //             this.props.onPress(rowData, details);
  //           }
  //         } else {
  //           this._disableRowLoaders();

  //           if (this.props.autoFillOnNotFound) {
  //             this.setState({
  //               text: this._renderDescription(rowData)
  //             });
  //             delete rowData.isLoading;
  //           }

  //           if (!this.props.onNotFound) {
  //             console.warn('google places autocomplete: ' + responseJSON.status);
  //           } else {
  //             this.props.onNotFound(responseJSON);
  //           }
  //         }
  //       } else {
  //         this._disableRowLoaders();

  //         if (!this.props.onFail) {
  //           console.warn(
  //             'google places autocomplete: request could not be completed or has been aborted'
  //           );
  //         } else {
  //           this.props.onFail();
  //         }
  //       }
  //     };
  //     console.log('lolo');
  //     request.open('GET', 'https://maps.googleapis.com/maps/api/place/details/json?' + Qs.stringify({
  //       key: this.props.query.key,
  //       placeid: rowData.place_id,
  //       language: this.props.query.language,
  //     }));

  //     if (this.props.query.origin !== null) {
  //       request.setRequestHeader('Referer', this.props.query.origin)
  //     }

  //     request.send();
  //   } else if (rowData.isCurrentLocation === true) {
  //     // display loader
  //     this._enableRowLoader(rowData);

  //     this.setState({
  //       text: this._renderDescription( rowData ),
  //     });

  //     this.triggerBlur(); // hide keyboard but not the results
  //     delete rowData.isLoading;
  //     this.getCurrentLocation();

  //   } else {
  //     this.setState({
  //       text: this._renderDescription( rowData ),
  //     });

  //     this._onBlur();
  //     delete rowData.isLoading;
  //     let predefinedPlace = this._getPredefinedPlace(rowData);

  //     // sending predefinedPlace as details for predefined places
  //     this.props.onPress(predefinedPlace, predefinedPlace);
  //   }
  // }

  // _enableRowLoader = (rowData) => {
  //   let rows = this.buildRowsFromResults(this._results);
  //   for (let i = 0; i < rows.length; i++) {
  //     if ((rows[i].place_id === rowData.place_id) || (rows[i].isCurrentLocation === true && rowData.isCurrentLocation === true)) {
  //       rows[i].isLoading = true;
  //       this.setState({
  //         dataSource: rows,
  //       });
  //       break;
  //     }
  //   }
  // }

  // _filterResultsByTypes = (responseJSON, types) => {
  //   if (types.length === 0) return responseJSON.results;

  //   var results = [];
  //   for (let i = 0; i < responseJSON.results.length; i++) {
  //     let found = false;

  //     for (let j = 0; j < types.length; j++) {
  //       if (responseJSON.results[i].types.indexOf(types[j]) !== -1) {
  //         found = true;
  //         break;
  //       }
  //     }

  //     if (found === true) {
  //       results.push(responseJSON.results[i]);
  //     }
  //   }
  //   return results;
  // }

  // _disableRowLoaders = () => {
  //   if (this._isMounted === true) {
  //     for (let i = 0; i < this._results.length; i++) {
  //       if (this._results[i].isLoading === true) {
  //         this._results[i].isLoading = false;
  //       }
  //     }

  //     this.setState({
  //       dataSource: this.buildRowsFromResults(this._results),
  //     });
  //   }
  // }

  _requestNearby = (latitude, longitude, text) => {
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
          // this._disableRowLoaders();
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
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      }
      let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + Qs.stringify({
        location: latitude + ',' + longitude,
        radius: 1000,
        key: 'AIzaSyAcLjRWKGZ5-pzYoV-bDHikVBkhCh2pcD0',
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
    this._requestNearby(this.state.position.lat, this.state.position.lng, text);
    this.setState({
      text: text,
      listViewDisplayed: true,
    });
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

  _renderRow = (rowData = {}, sectionID, rowID) => {
    let distance = geolib.getDistance(
      {latitude: this.state.position.lat, longitude: this.state.position.lng},
      {latitude: rowData.geometry.location.lat, longitude:rowData.geometry.location.lng}
    );
    if (distance > 1000) distance = (String((distance/1000).toFixed(2)))+' Km';
    else distance = String(distance)+' m';

    return (
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={true}
        keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <TouchableHighlight
          style={{ width: WINDOW.width }}
          onPress={() => this._onPress(rowData)}
          underlayColor={"#c8c7cc"}
        >
          <View style={s.row}>
            <View style={s.rowLeft}>
              <Text style={s.PlaceListItemName}>{rowData.name}</Text>
              <Text style={s.PlaceListItemAddress}>{rowData.vicinity}</Text>
            </View>
            <View style={s.rowRight}>
              <Text style={s.PlaceListItemDistance}>{distance}</Text>
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

  _onFocus = () => this.setState({ listViewDisplayed: true })

  _getFlatList = () => {
    const keyGenerator = () => (
      Math.random().toString(36).substr(2, 10)
    );

    if (this.state.text !== '' && this.state.listViewDisplayed === true) {
      return (
        <FlatList
          style={s.listView}
          data={this.state.dataSource}
          keyExtractor={keyGenerator}
          extraData={this.state.dataSource}
          ItemSeparatorComponent={this._renderSeparator}
          renderItem={({ item }) => this._renderRow(item)}
        />
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
        {/* {this.props.children} */}
      </View>
    );
  }
}

export default GooglePlacesAutocomplete;