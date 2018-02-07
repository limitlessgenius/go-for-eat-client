import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import s from './styles.js';

import profileStar from '../../assets/icons/profile_star.png';
import profileStarEmpty from '../../assets/icons/profile_star_empty.png';
import logo from '../../assets/logo/logo_green.png';
import { rateUser, navigateBack } from '../../actions';

class Rating extends Component {

  state ={
    score:0,
    voted:false
  }

  handleVote = () => {
    this.props.rateUser(this.props.user._id, this.state.score);
    this.setState({voted:true});
    this.props.navigateBack();
  }

  renderStar = (key) => {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => this.setState({score:key})}>
        <Image
          style={s.rating_star}
          source={key<=this.state.score?profileStar:profileStarEmpty}/>
      </TouchableOpacity>
    );
  }


  render () {
    const stars = [];
    for (var i = 1; i <= 5; i++) {
      stars.push(this.renderStar(i));
    }
    return (
      <View style={s.rating_container}>
        <Image style={s.rating_picture} source={{uri:this.props.user.profile_picture}}/>
        <Text style={s.rating_text_question}>How would you rate</Text>
        <Text style={s.rating_text_question}>{this.props.user.name}?</Text>
        {this.props.user.ratings_number>0
          ?<View style={s.rating_container_current}>
            <Text style={s.rating_text_current}>
              CURRENT RATING:
            </Text>
            <Text style={s.rating_number_current}>
              {this.props.user.ratings_average}
            </Text>
          </View>
          :null}
        <View style={s.rating_container_star}>
          {stars}
        </View>
        <Button
          raised
          title='VOTE'
          onPress={this.handleVote}
          textStyle={{color:'white', fontWeight:'bold'}}
          buttonStyle={s.rating_button}/>
      </View>
    );
  }
}

mapStateToProps = (state) => ({
  user:state.pages.Rating.user
});

mapDispatchToProps = (dispatch) => ({
  rateUser: (userId, rating) => dispatch(rateUser(userId, rating)),
  navigateBack: () => dispatch(navigateBack())
});


export default connect(mapStateToProps, mapDispatchToProps)(Rating);
