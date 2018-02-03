import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class FacebookButton extends Component {

  static propTypes = {
    navigation: PropTypes.object
  };

  render() {
    return (
      <View>
        <Button
          icon={{
            name:'facebook',
            type:'font-awesome'
          }}
          title='Login with Facebook'
          buttonStyle={styles.login_button__fb}
          onPress={this.props.loginFacebook}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  });

const mapDispatchToProps = (dispatch) => ({
  serverAuth: (data) => dispatch(loginUser(data)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(FacebookButton);
