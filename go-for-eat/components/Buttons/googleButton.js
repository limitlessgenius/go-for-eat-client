import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles';

class GoogleButton extends Component {

  render() {
    return (
      <View>
        <Button
          icon={{
            name:'google',
            type:'font-awesome'
          }}
          title='Login with Google'
          buttonStyle={styles.login_button__google}
          onPress={this.props.loginGoogle}
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

export default connect(mapStateToProps, mapDispatchToProps)(GoogleButton);
