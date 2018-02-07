import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import profileStar from '../../assets/icons/profile_star.png';
import profileStarEmpty from '../../assets/icons/profile_star_empty.png';
import profileEdit from '../../assets/icons/profile_edit.png';
import profileSave from '../../assets/icons/profile_save.png';
import s from './styles.js';
import { updateUser, navigate, setRatingUser } from '../../actions';
import moment from 'moment';

class UserBio extends Component {


  state = {
    edit: {
      interests: false,
      profession:false,
      description:false
    },
    text: {
      interests:'',
      profession:'',
      description:''
    },
    error: false,
    renderVote:false,
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      text:{
        interests:this.props.user.interests,
        profession:this.props.user.profession,
        description:this.props.user.description
      }
    });

    if (this.props.screen === 'User') {
      let prevAttendees = this.props.myEvents
        .map(elem =>this.props.allEvents[elem])
        .filter(elem => moment(elem.when) < moment())
        .map(elem => elem.attendees);
      prevAttendees = [].concat.apply([], prevAttendees);
      if (prevAttendees.indexOf(this.props.user._id)!==-1 & !this.props.user.myRating) {
        this.setState({renderVote:true});
      }
    }
  }

  handleEdit = (key) => {

    return () => {
      const edit = {...this.state.edit};
      edit[key] = true;
      this.setState({edit: edit});
    };
  }

  handleSave = (key) => {
    return () => {
      if (this.state.text[key].length>140) {
        this.setState({error:true});
        return;
      }
      this.setState({
        error:false,
        edit: {
          ...this.state.edit,
          [key]:false
        }
      });

      const data = {[key]:this.state.text[key]};
      this.props.updateUser(data);
    };
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
      if (i<=Math.ceil(ratings_average)) stars.push(<Image style={s.bio_stars}  key={i} source={profileStar}/>);
      else stars.push(<Image key={i} style={s.bio_stars} source={profileStarEmpty}/>);
    }
    return stars;
  }

  renderRatingSection =() => {
    const { ratings_number } = this.props.user;
    return (
      <View>
        <Text style ={s.bio_bio_title}>Rating:</Text>
        <View style={s.bio_rating_stars}>
          {ratings_number>0
            ? this.renderRating()
            : <Text>No ratings to show.</Text>
          }
        </View>
      </View>
    );
  }

  renderSection = (key, title) => {
    if (this.props.screen==='User' && this.state.text[key]==='') return null;
    return (
      <View style={s.bio_section_outercontainer}>
        <Text style={s.bio_bio_title}>{title}</Text>
        <View style={s.bio_section_container}>
          {(this.state.edit[key])?
            (
              <TextInput
                onChangeText={(text)=> this.setState({text:{...this.state.text, [key]:text}})}
                style={s.bio_section_text_edit}
                multiline = {true}
                numberOfLines = {4}
                value={this.state.text[key]}/>
            )
            :
            (this.state.text[key]==='')?
              <Text style={s.bio_section_text_italic}>Add your {key} here</Text>
              :
              <Text style={s.bio_section_text}>{this.state.text[key]}</Text>
          }
          {(this.props.screen==='Profile')
            ? this.renderButton(key, this.state.edit[key])
            : null
          }
        </View>
      </View>
    );
  }

  renderButton = (key, edit) => {
    return (
      <TouchableOpacity
        ref={key}
        style={s.bio_icon}
        onPress={edit?this.handleSave(key):this.handleEdit(key)}>
        <Image
          style={edit?s.bio_icon_save:s.bio_icon_edit}
          source={edit?profileSave:profileEdit}/>
      </TouchableOpacity>
    );
  }

  handleVote = () => {
    this.props.setRatingUser(this.props.user);
    this.props.navigate('Rating');
  }

  renderVoteButton = (flag) => {
    if (!flag) return null;
    return (
      <Button
        raised
        textStyle={{color:'white', fontWeight:'bold'}}
        buttonStyle={s.bio_button}
        onPress={this.handleVote}
        title='Add Rating'
      />
    );
  }

  render() {
    if (!this.props.user) return null;
    const { name, birthday, profile_picture, interests, profession, description } = this.props.user;
    return (
      <KeyboardAwareScrollView  style={s.bio} behavior='padding'>
        <View style={s.bio_picture}>
          <Image
            source={{uri:profile_picture}}
            style={s.bio_picture_image}
          />
        </View>
        <View style={s.bio_headline}>
          <Text style={s.bio_name}>{name}{birthday?', ' + this.getAgeFromBirthday(birthday):''}</Text>
          {this.renderVoteButton(!this.state.renderVote)}
        </View>
        {this.state.error? <Text style={s.bio_error}>{'Fields must only be 140 characters or less.'}</Text>:null}
        {this.renderRatingSection()}
        {this.renderSection('profession', 'Profession: ')}
        {this.renderSection('description', 'Brief Description: ')}
        {this.renderSection('interests', 'Interests: ')}
        <View style={{ height: 60 }} />
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  screen:state.pages.currentScreen,
  myEvents:state.authentication.user.events,
  allEvents:state.entities.events
});

const mapDispatchToProps = (dispatch) => ({
  updateUser:data => dispatch(updateUser(data)),
  navigate:screen=> dispatch(navigate(screen)),
  setRatingUser:user=>dispatch(setRatingUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBio);
