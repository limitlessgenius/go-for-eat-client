import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import profileStar from '../../assets/icons/profile_star.png';
import profileStarEmpty from '../../assets/icons/profile_star_empty.png';
import eventEdit from '../../assets/icons/profile_edit.png';
import s from './styles.js';

class Profile extends Component {

  state = {
    editInterest: false,
  }

  handleEditInterest = () => {

  }


  getAgeFromBirthday = (birthday) => {
    const dateDiff = Date.now() - new Date(birthday);
    const newDate = new Date(dateDiff);
    return Math.abs(newDate.getUTCFullYear()-1970);
  }

  renderRating = () => {
    const { ratings_average } = this.props.user;
    const stars = [];
    for (var i = 1; i <= 5; i++) {
      if (i<=Math.ceil(2)) stars.push(<Image key={i} source={profileStar}/>);
      else stars.push(<Image key={i} source={profileStarEmpty}/>);
    }
    return stars;
  }


  renderRatingSection =() => {
    const { ratings_number } = this.props.user;
    return (
      <View>
        <Text style ={s.profile_bio_title}>Your Rating:</Text>
        <View style={s.profile_rating_stars}>
        {ratings_number>-1?
          this.renderRating()
          :
          <Text>No ratings to show.</Text>
        }
        </View>
    </View>
    )
  }

  renderSection = (key, title, description) => {
    return (
      <View style={s.profile_interests_outercontainer}>
        <Text style={s.profile_bio_title}>{title}</Text>
        <View style={s.profile_interests_container}>
          <Text style={s.profile_interest}>{description}</Text>
          <TouchableOpacity key={key} style={s.profile_icon} onPress={this.handleEditInterest}>
            <Image source={eventEdit}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    console.log("heres user", this.props.user);
    if (!this.props.user) return null;
    const { name, birthday, profile_picture, interests, profession, description} = this.props.user;
    return (
      <View style={s.profile}>
        <View style={s.profile_picture}>
          <Image
            source={{uri:profile_picture}}
            style={s.profile_picture_image}
          />
        </View>
        <Text style={s.profile_name}>{name}{this.birthday===''?'':', ' + this.getAgeFromBirthday(birthday)}</Text>
        {this.renderRatingSection()}
        {this.renderSection('profession', 'Your Profession: ', 'Student at Codeworks')}
        {this.renderSection('description', 'Brief Description: ', 'Description of yourself blah blah blah')}
        {this.renderSection('interests', 'Your Interests: ', 'Here are my interests')}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user:state.authentication.user
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
